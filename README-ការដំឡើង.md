# Time Sheet — របៀបដំឡើងជា App

កញ្ចប់នេះមាន App Time Sheet ដែលអាចដំឡើងលើទូរស័ព្ទ (Android / iPhone) និងកុំព្យូទ័របាន។ App ប្រើបានទាំងគ្មានអ៊ីនធឺណិត ហើយអាចភ្ជាប់ទៅ Google Sheet ដើម្បីឱ្យទិន្នន័យមន្ត្រីទាំងអស់រួមគ្នានៅកន្លែងតែមួយ។

## ឯកសារក្នុងកញ្ចប់

| ឯកសារ | តួនាទី |
|---|---|
| `index.html` | App ខ្លួនឯង |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | ធ្វើឱ្យ App ដំឡើងបាន និងប្រើបានពេលគ្មានអ៊ីនធឺណិត |
| `Code.gs` | កូដសម្រាប់ Google Sheet (ឃ្លាំងទិន្នន័យរួម) |

---

## ជំហានទី ១ — ដាក់ App លើអ៊ីនធឺណិត (admin ធ្វើតែម្ដង)

App ត្រូវតែនៅលើគេហទំព័រ `https://` ទើបដំឡើងបាន។ ជម្រើសងាយបំផុត (ឥតគិតថ្លៃ)៖

**ក. Netlify Drop (ងាយបំផុត ប្រើកុំព្យូទ័រ)**
1. ពន្លា (unzip) កញ្ចប់នេះ ទៅជាថតឯកសារមួយ
2. បើក https://app.netlify.com/drop
3. អូសថតឯកសារទាំងមូលទម្លាក់ចូលក្នុងទំព័រនោះ
4. បង្កើតគណនី Netlify (ឥតគិតថ្លៃ) ដើម្បីរក្សាទំព័រទុកជាអចិន្ត្រៃយ៍
5. ចម្លងតំណដែលទទួលបាន ឧ. `https://xxxx.netlify.app`

**ខ. GitHub Pages**
1. បង្កើត repository ថ្មីលើ GitHub ហើយ upload ឯកសារទាំងអស់
2. Settings → Pages → Branch: `main` / root → Save
3. តំណនឹងមានរាង `https://ឈ្មោះអ្នក.github.io/ឈ្មោះ-repo/`

## ជំហានទី ២ — បង្កើតឃ្លាំងទិន្នន័យរួម Google Sheet (admin ធ្វើតែម្ដង)

1. បង្កើត Google Sheet ថ្មី ឧ. "Time Sheet Data"
2. ចុច **Extensions → Apps Script**
3. លុបកូដចាស់ ហើយបិទភ្ជាប់កូដទាំងអស់ពីឯកសារ `Code.gs`
4. (ណែនាំ) ដាក់លេខកូដសម្ងាត់ ក្នុងបន្ទាត់ `const SECRET_KEY = 'ដាក់លេខកូដនៅទីនេះ';`
5. ចុច **Deploy → New deployment** → ជ្រើស **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. ចុច **Deploy** → **Authorize access** → អនុញ្ញាតដោយគណនី Google របស់អ្នក
7. ចម្លង **Web app URL** (បញ្ចប់ដោយ `/exec`)

> ពេលកែកូដ `Code.gs` លើកក្រោយ ត្រូវចុច Deploy → Manage deployments → Edit → Version: New version ដើម្បីឱ្យការកែប្រែមានប្រសិទ្ធភាព។

## ជំហានទី ៣ — ដំឡើង App លើទូរស័ព្ទមន្ត្រីម្នាក់ៗ

1. បើកតំណ App (ពីជំហានទី ១) ក្នុង **Chrome** (Android) ឬ **Safari** (iPhone)
2. ដំឡើង៖
   - **Android/Chrome**: ម៉ឺនុយ ⋮ → **Install app** (ឬ Add to Home screen → Install)
   - **iPhone/Safari**: ប៊ូតុង Share ⬆ → **Add to Home Screen**
3. បើក App Time Sheet ពីអេក្រង់ដើម
4. រំកិលចុះក្រោមបង្អស់ ដល់ផ្ទាំង **"ទិន្នន័យរួម (Google Sheet)"**
5. បិទភ្ជាប់ **Web app URL** និង **លេខកូដសម្ងាត់** រួចចុច **ភ្ជាប់**
6. ពេលឃើញពណ៌បៃតង "បានភ្ជាប់ Google Sheet" មានន័យថារួចរាល់

## ចំណាំ

- App ធ្វើបច្ចុប្បន្នភាពទិន្នន័យពី Google Sheet រៀងរាល់ ៣០ វិនាទី និងពេលបើក App ម្ដងៗ។
- ពេលគ្មានអ៊ីនធឺណិត App នៅតែប្រើបាន។ ការកែប្រែនឹងផ្ញើទៅ Google Sheet ពេលមានអ៊ីនធឺណិតវិញ។
- កុំកែសន្លឹក `data` ក្នុង Google Sheet ដោយដៃ។ សូមប្រើ App ឬ ទាញយក Excel ពី App ជំនួសវិញ។
- ទិន្នន័យដែលមាននៅក្នុង Time Sheet លើ claude.ai មិនផ្ទេរមក App នេះដោយស្វ័យប្រវត្តិទេ។
