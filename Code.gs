/**
 * Time Sheet — ឃ្លាំងទិន្នន័យរួមក្នុង Google Sheet
 *
 * របៀបដំឡើង (admin ធ្វើតែម្ដង):
 * 1. បង្កើត Google Sheet ថ្មីមួយ (ឧ. "Time Sheet Data")
 * 2. ចុច Extensions → Apps Script
 * 3. លុបកូដចាស់ចេញ រួចបិទភ្ជាប់កូដទាំងអស់នេះជំនួស
 * 4. (ជម្រើស) ដាក់លេខកូដសម្ងាត់ក្នុង SECRET_KEY ខាងក្រោម ដើម្បីការពារកុំឱ្យអ្នកក្រៅសរសេរបាន
 * 5. ចុច Deploy → New deployment → Select type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    ចុច Deploy → Authorize access → អនុញ្ញាត
 * 6. ចម្លងតំណ "Web app URL" (បញ្ចប់ដោយ /exec) ហើយផ្ដល់ឱ្យមន្ត្រីដាក់ក្នុង App
 */

const SECRET_KEY = '';          // ឧ. 'phoenix2026' — ទុកទទេ បើមិនចង់ប្រើលេខកូដ
const SHEET_NAME = 'data';      // សន្លឹកដែលរក្សាទុកទិន្នន័យ (កុំកែដោយដៃ)
const KINDS = ['staff','leaves','cal','types','ot','picks','settings'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange(1, 1, 1, 4).setValues([['kind', 'id', 'json', 'updated']]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  sh.getRange('A:C').setNumberFormat('@'); // keep ids like 2026-10-01 as text, not dates
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function checkKey_(key) {
  return !SECRET_KEY || key === SECRET_KEY;
}

/** អានទិន្នន័យទាំងអស់ */
function doGet(e) {
  if (!checkKey_(e && e.parameter && e.parameter.key)) return json_({ ok: false, error: 'លេខកូដសម្ងាត់មិនត្រឹមត្រូវ' });
  const out = { ok: true };
  KINDS.forEach(k => out[k] = {});
  const values = sheet_().getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    const [kind, id, text] = values[i];
    if (!kind || !id || KINDS.indexOf(kind) < 0) continue;
    try { out[kind][id] = JSON.parse(text); } catch (err) {}
  }
  return json_(out);
}

/** សរសេរ ឬលុបទិន្នន័យមួយ */
function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad request' }); }
  if (!checkKey_(body.key)) return json_({ ok: false, error: 'លេខកូដសម្ងាត់មិនត្រឹមត្រូវ' });
  if (KINDS.indexOf(body.kind) < 0 || !body.id) return json_({ ok: false, error: 'bad kind/id' });

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sh = sheet_();
    const values = sh.getDataRange().getValues();
    let row = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === body.kind && String(values[i][1]) === String(body.id)) { row = i + 1; break; }
    }
    if (body.op === 'delete') {
      if (row > 0) sh.deleteRow(row);
    } else {
      const rowValues = [[body.kind, String(body.id), JSON.stringify(body.data || {}), new Date()]];
      if (row > 0) sh.getRange(row, 1, 1, 4).setValues(rowValues);
      else sh.getRange(sh.getLastRow() + 1, 1, 1, 4).setValues(rowValues);
    }
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}
