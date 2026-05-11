import type { QuizQuestion } from '../types/quiz';

// Local image paths (served from public/images/)
const N = '/images/normal/';
const I = '/images/infections/';
const B = '/images/benign/';
const S = '/images/squamous/';
const G = '/images/glandular/';

export const quizQuestions: QuizQuestion[] = [

  // ─── BEGINNER ────────────────────────────────────────────────────────────────

  {
    id: 'q-beg-01',
    categoryId: 'normal',
    difficulty: 'beginner',
    imageUrl: N + 'superficial-cells.jpg',
    question: 'This image shows large polygonal squamous cells with a small, dark, condensed nucleus and abundant cytoplasm. What is the correct identification?',
    options: ['Intermediate Squamous Cell', 'Superficial Squamous Cell', 'Parabasal Cell', 'Endocervical Cell'],
    correctAnswer: 'Superficial Squamous Cell',
    explanation: 'Superficial squamous cells are the most mature cells of the squamous epithelium. Their defining feature is the small, dark, pyknotic nucleus (condensed chromatin) within abundant, flat, polygonal cytoplasm — resulting in a very low N/C ratio.',
    keyFeatures: ['Small, pyknotic (condensed) nucleus', 'Abundant, flat polygonal cytoplasm', 'Very low N/C ratio', 'Well-defined cell borders'],
    clinicalRelevance: 'Predominance of superficial cells indicates adequate estrogenic stimulation.',
    hints: [
      'Focus on the nucleus — is it small and dark or large and open?',
      'A pyknotic (condensed, ink-drop) nucleus in a large polygonal cell is the hallmark feature.',
    ],
  },

  {
    id: 'q-beg-02',
    categoryId: 'infections',
    difficulty: 'beginner',
    imageUrl: I + 'clue-cells-bv.jpg',
    question: 'A smear shows squamous cells with borders obscured by bacteria, giving them a "shaggy" appearance, with a filmy background and absence of lactobacilli. What is the diagnosis?',
    options: ['Trichomonas vaginalis', 'Candida albicans', 'Bacterial Vaginosis', 'Herpes Simplex Virus'],
    correctAnswer: 'Bacterial Vaginosis',
    explanation: 'Bacterial Vaginosis (BV) is characterized by "clue cells" — squamous cells with borders obscured by adherent Gardnerella vaginalis — and a filmy, granular background with absent lactobacilli. The nuclei of the host cells remain normal.',
    keyFeatures: ['Clue cells (squamous cells coated by coccobacilli)', 'Filmy, granular background', 'Absence of Lactobacillus', 'Normal host cell nuclei'],
    clinicalRelevance: 'BV is the most common cause of abnormal vaginal discharge; associated with preterm labor and increased STI risk.',
    hints: [
      'Look at the borders of the squamous cells — are they clearly defined or obscured?',
      'The background is key — is it clean with rods, or filmy and granular?',
    ],
  },

  {
    id: 'q-beg-03',
    categoryId: 'normal',
    difficulty: 'beginner',
    imageUrl: N + 'endocervical-cells.jpg',
    question: 'Tall, columnar cells with basal nuclei arranged in a honeycomb pattern with mucin-containing cytoplasm are identified. Their presence in a Pap smear indicates what?',
    options: ['Endocervical adenocarcinoma', 'Adequate sampling of the transformation zone', 'Squamous metaplasia', 'Endometrial origin'],
    correctAnswer: 'Adequate sampling of the transformation zone',
    explanation: 'Endocervical cells line the endocervical canal. Their presence in a cervical Pap smear confirms that the sample was obtained from the squamo-columnar junction (SCJ/transformation zone) — the area where most cervical carcinomas arise, and a marker of sample adequacy.',
    keyFeatures: ['Tall columnar cells with basal nuclei', 'Honeycomb arrangement (en face view)', 'Mucin-containing cytoplasm', 'Indicator of sample adequacy'],
    clinicalRelevance: 'A Pap smear lacking endocervical cells may be inadequate and may need to be repeated.',
    hints: [
      'What type of cells line the endocervical canal?',
      'Consider what the presence of these cells tells you about WHERE the sample was taken from.',
    ],
  },

  {
    id: 'q-beg-04',
    categoryId: 'squamous',
    difficulty: 'beginner',
    imageUrl: S + 'koilocyte-hpv.jpg',
    question: 'Squamous cells with perinuclear halos, enlarged irregular nuclei (>3× normal), and binucleation are seen. This is most consistent with:',
    options: ['ASC-US', 'LSIL', 'HSIL', 'Reactive changes'],
    correctAnswer: 'LSIL',
    explanation: 'The koilocyte — a squamous cell with a well-defined perinuclear cavity (halo) and an enlarged, irregular, hyperchromatic nucleus — is pathognomonic for LSIL (CIN 1). The nucleus is >3× the normal intermediate cell nucleus. Binucleation is common due to HPV-induced cell cycle dysregulation.',
    keyFeatures: ['Koilocytes (perinuclear halo with sharp irregular border)', 'Nuclear enlargement >3× normal', 'Hyperchromasia and nuclear membrane irregularity', 'Binucleation common'],
    clinicalRelevance: 'LSIL corresponds to CIN 1 and has a ~60% spontaneous regression rate. Management is colposcopy.',
    hints: [
      'What is the hallmark cytological feature of HPV infection?',
      'Look for a cell with a clear zone around the nucleus — what causes this?',
    ],
  },

  {
    id: 'q-beg-05',
    categoryId: 'benign',
    difficulty: 'beginner',
    imageUrl: B + 'reactive-changes.jpg',
    question: 'Enlarged squamous cells with prominent nucleoli, smooth nuclear membranes, open chromatin, and perinuclear halos are seen in a background of acute inflammation. What is the most likely interpretation?',
    options: ['HSIL', 'LSIL', 'Reactive changes due to inflammation', 'ASC-US'],
    correctAnswer: 'Reactive changes due to inflammation',
    explanation: 'Reactive changes show nuclear enlargement with prominent nucleoli. The KEY differentiating features from dysplasia are: SMOOTH nuclear membranes, OPEN (not coarse) chromatin, and prominent but NON-ATYPICAL nucleoli. The inflammatory background supports a reactive cause.',
    keyFeatures: ['Smooth nuclear membranes', 'Open, vesicular chromatin (NOT coarse)', 'Prominent nucleoli', 'Inflammatory background'],
    clinicalRelevance: 'Reactive changes are benign and do not require follow-up beyond treating the underlying cause (e.g., infection).',
    hints: [
      'Focus on the nuclear membrane — is it smooth or irregular?',
      'Is the chromatin fine and open, or coarse and irregularly distributed?',
    ],
  },

  {
    id: 'q-beg-06',
    categoryId: 'normal',
    difficulty: 'beginner',
    imageUrl: N + 'normal-flora.jpg',
    question: 'In a Pap smear from a 62-year-old post-menopausal woman NOT on HRT, the smear is dominated by small, round cells with scant cytoplasm and round nuclei with fine chromatin. The background is granular. The MOST appropriate next step is:',
    options: [
      'Report as HSIL and proceed to colposcopy',
      'Report as atrophic smear and repeat after 2 weeks of topical estrogen',
      'Report as Squamous Cell Carcinoma',
      'Perform immediate cone biopsy',
    ],
    correctAnswer: 'Report as atrophic smear and repeat after 2 weeks of topical estrogen',
    explanation: 'Atrophic smears in post-menopausal women show predominantly small parabasal-type cells with a granular background (pseudo-diathesis). These features can mimic HSIL or even SCC. The correct approach is to repeat the smear after 2–3 weeks of topical estrogen — this matures the epithelium and allows accurate interpretation.',
    keyFeatures: ['Post-menopausal patient (no HRT)', 'Small parabasal-type cells', 'Granular pseudo-diathesis background', 'Fine chromatin (not coarse)'],
    clinicalRelevance: 'Treating an atrophic smear as HSIL leads to unnecessary procedures. Topical estrogen normalizes the smear and is safe and effective.',
    hints: [
      'Consider the patient\'s hormonal status — what effect does low estrogen have on cervical cells?',
      'The BACKGROUND looks dirty, but are the cells truly atypical, or just immature?',
    ],
  },

  {
    id: 'q-beg-07',
    categoryId: 'infections',
    difficulty: 'beginner',
    imageUrl: N + 'normal-flora.jpg',
    question: 'A cervical smear shows abundant rod-shaped bacteria in the background, a clean smear, and large polygonal squamous cells with distinct borders. What is the most likely interpretation?',
    options: [
      'Bacterial Vaginosis',
      'Normal Pap smear with Lactobacillus flora',
      'Actinomyces infection',
      'Trichomonas vaginalis infection',
    ],
    correctAnswer: 'Normal Pap smear with Lactobacillus flora',
    explanation: 'Lactobacillus acidophilus (Döderlein bacilli) are the dominant normal vaginal flora — they appear as small, uniform rod-shaped bacteria in a clean background. Their presence is a sign of a HEALTHY cervical ecosystem. In contrast, BV shows coccobacilli that coat squamous cells ("clue cells") with a filmy background.',
    keyFeatures: ['Rod-shaped Lactobacillus (small, uniform)', 'Clean background', 'Normal squamous cells with distinct borders', 'No clue cells'],
    clinicalRelevance: 'Recognizing normal flora prevents over-reporting. Lactobacillus in a clean background with normal cells = normal smear.',
    hints: [
      'What shape are the bacteria? Rods vs. coccobacilli — this distinction matters.',
      'Are the squamous cell borders clearly defined, or do the bacteria obscure them?',
    ],
  },

  {
    id: 'q-beg-08',
    categoryId: 'normal',
    difficulty: 'beginner',
    imageUrl: N + 'endocervical-cells2.jpg',
    question: 'Small polygonal cells with dense cytoplasm, cytoplasmic projections ("spider legs"), central round nuclei, and an intermediate N/C ratio are identified at the squamo-columnar junction. What are these cells?',
    options: ['Parabasal Cells', 'Squamous Metaplastic Cells', 'Endocervical Cells', 'Reserve Cells'],
    correctAnswer: 'Squamous Metaplastic Cells',
    explanation: 'Squamous metaplastic cells arise from reserve cells at the transformation zone as columnar epithelium undergoes physiological replacement. Their characteristic "spider-leg" cytoplasmic projections distinguish them from parabasal cells (oval, no projections) and endocervical cells (columnar, no projections). Their N/C ratio is intermediate between squamous and glandular cells.',
    keyFeatures: ['Dense cytoplasm with "spider-leg" projections', 'Central round nucleus with fine chromatin', 'Intermediate N/C ratio', 'Found at the transformation zone'],
    clinicalRelevance: 'Metaplastic cells are a normal finding and confirm sampling from the SCJ — the area where HPV-induced carcinogenesis begins.',
    hints: [
      'Focus on the cytoplasmic shape — does it have smooth borders or extensions/projections?',
      'These cells are transitional between glandular and squamous — what process produces transitional cells at the SCJ?',
    ],
  },

  {
    id: 'q-beg-09',
    categoryId: 'infections',
    difficulty: 'beginner',
    imageUrl: I + 'clue-cell-bv.jpg',
    question: 'Squamous cells are threaded along branching filaments with constrictions (like pearls on a string). Small oval spores bud from the filaments. What is the classic name for this cytological pattern?',
    options: [
      '"Cotton ball" colony',
      '"Shish-kebab" sign (Candida pseudohyphae)',
      '"Clue cell" pattern',
      '"Ground-glass" appearance',
    ],
    correctAnswer: '"Shish-kebab" sign (Candida pseudohyphae)',
    explanation: 'The "shish-kebab" sign — squamous cells skewered along Candida pseudohyphae — is pathognomonic for Candida infection. The filaments are pseudohyphae (branching yeast chains with constrictions at budding points), distinct from true hyphae (parallel walls, no constrictions) and from Actinomyces "cotton ball" colonies.',
    keyFeatures: ['Squamous cells threaded on pseudohyphae ("shish-kebab")', 'Pseudohyphae with branching and constrictions', 'Budding blastoconidia (oval spores)', 'Pathognomonic for Candida'],
    clinicalRelevance: 'Vaginal candidiasis presents with intense pruritus and white, curdy discharge. Common in pregnancy, antibiotic use, and diabetes.',
    hints: [
      'The pattern name is a food analogy — what food is skewered on a stick?',
      'Which organism grows as pseudohyphae and is associated with this skewering pattern?',
    ],
  },

  {
    id: 'q-beg-10',
    categoryId: 'benign',
    difficulty: 'beginner',
    imageUrl: B + 'reactive-changes.jpg',
    question: 'A 25-year-old woman\'s Pap smear shows nuclear enlargement (2–3× normal), prominent cherry-red nucleoli, open chromatin, and SMOOTH nuclear membranes in squamous cells, with many neutrophils in the background. What is the correct interpretation?',
    options: ['ASC-US', 'LSIL', 'HSIL', 'Reactive/reparative changes due to inflammation'],
    correctAnswer: 'Reactive/reparative changes due to inflammation',
    explanation: 'The KEY features classifying this as REACTIVE rather than dysplastic are: (1) SMOOTH nuclear membranes, (2) OPEN (not coarse) chromatin, and (3) prominent nucleoli reflecting active cellular metabolism, not malignant transformation. The inflammatory background is supportive. ASC-US/LSIL/HSIL all show some degree of nuclear membrane irregularity and chromatin coarsening.',
    keyFeatures: ['Smooth nuclear membranes (critical)', 'Open, vesicular chromatin (NOT coarse)', 'Prominent nucleoli', 'Neutrophilic inflammatory background'],
    clinicalRelevance: 'Reactive changes are the most frequent cause of nuclear enlargement in cervical cytology. Reporting them as ASC-US leads to unnecessary HPV reflex testing.',
    hints: [
      'The nucleus is enlarged — but are the borders smooth or irregular?',
      'Compare chromatin quality: is it coarse and lumpy (dysplasia) or fine and open (reactive)?',
    ],
  },

  {
    id: 'q-beg-11',
    categoryId: 'glandular',
    difficulty: 'beginner',
    imageUrl: N + 'endocervical-cells2.jpg',
    question: 'A 30-year-old woman\'s Pap smear on day 9 of her cycle shows tight three-dimensional clusters of cells with scant cytoplasm, small hyperchromatic uniform nuclei, and occasional incorporated neutrophils. These are smaller than the surrounding endocervical cells. What is the most appropriate interpretation?',
    options: ['Atypical Glandular Cells (AGC)', 'Adenocarcinoma in situ (AIS)', 'Normal endometrial cells — benign finding', 'Endometrial adenocarcinoma'],
    correctAnswer: 'Normal endometrial cells — benign finding',
    explanation: 'Normal endometrial cells are shed during the first 12 days of the menstrual cycle and appear as tight "lemon drop" clusters smaller than endocervical cells. The incorporated neutrophils form the diagnostic "exodus" pattern. In women ≤45 years in the first half of the cycle, this is entirely normal. The nuclei are SMALL and UNIFORM — lacking the stratification, feathering, and apoptotic bodies of glandular neoplasia.',
    keyFeatures: ['Tight "lemon drop" 3D clusters', 'Cells smaller than endocervical cells', '"Exodus" pattern (incorporated neutrophils)', 'Normal in women ≤45 years, cycle days 1–12'],
    clinicalRelevance: 'In women ≥45 years or postmenopausal, endometrial cells require reporting and further investigation to exclude endometrial pathology.',
    hints: [
      'How does the size of these cells compare to surrounding endocervical cells?',
      'The patient is 30, day 9 of cycle — what cells are normally shed during this phase?',
    ],
  },

  // ─── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'q-int-01',
    categoryId: 'squamous',
    difficulty: 'intermediate',
    imageUrl: S + 'cin1-thinprep.jpg',
    question: 'Small cells with high N/C ratios (>50%), coarse irregular chromatin, and irregular nuclear membranes are seen without nucleoli. The background is clean. The most appropriate diagnosis is:',
    options: ['LSIL', 'Squamous Cell Carcinoma', 'HSIL', 'ASC-H'],
    correctAnswer: 'HSIL',
    explanation: 'HSIL (CIN 2/3) cells are SMALLER than LSIL cells, with a very high N/C ratio (>50%), coarse chromatin, and irregular nuclear membranes. Nucleoli are typically ABSENT. The CLEAN background distinguishes HSIL from invasive carcinoma (which has tumor diathesis).',
    keyFeatures: ['Small cells with high N/C ratio (>50%)', 'Coarse, irregular chromatin', 'Nuclear membrane irregularity', 'No nucleoli', 'Clean background (no diathesis)'],
    clinicalRelevance: 'HSIL requires immediate colposcopy. If CIN 2/3 confirmed, treatment by LEEP or cone biopsy is indicated.',
    hints: [
      'HSIL cells are SMALLER than LSIL cells — compare the cell size.',
      'What is the N/C ratio? In HSIL, the nucleus takes up >50% of the cell.',
    ],
  },

  {
    id: 'q-int-02',
    categoryId: 'infections',
    difficulty: 'intermediate',
    imageUrl: I + 'trichomonas-pap.jpg',
    question: 'Pear-shaped organisms approximately 10–30 µm in size with pale cytoplasm, red cytoplasmic granules, and an associated neutrophilic inflammatory response are identified. What is the organism?',
    options: ['Gardnerella vaginalis', 'Trichomonas vaginalis', 'Candida albicans', 'Herpes Simplex Virus'],
    correctAnswer: 'Trichomonas vaginalis',
    explanation: 'Trichomonas vaginalis appears as pyriform (pear-shaped) organisms 10–30 µm in size. The characteristic red eosinophilic cytoplasmic granules (hydrogenosomes) are specific. An acute inflammatory exudate is invariably present. Flagella are rarely seen in fixed Pap smears.',
    keyFeatures: ['Pyriform (pear-shaped) organisms', 'Size 10–30 µm', 'Eosinophilic (red) cytoplasmic granules', 'Acute inflammation in background'],
    clinicalRelevance: 'Trichomoniasis is a sexually transmitted infection requiring treatment of both partners with metronidazole.',
    hints: [
      'What shape are the organisms? Look for a distinctive asymmetric, tapered shape.',
      'The characteristic feature is specific cytoplasmic inclusions — what color are they?',
    ],
  },

  {
    id: 'q-int-03',
    categoryId: 'infections',
    difficulty: 'intermediate',
    imageUrl: I + 'clue-cell-bv.jpg',
    question: 'Branching pseudohyphae and budding spores (blastoconidia) are identified, with squamous cells threaded along the hyphae in a "shish-kebab" pattern. The smear is otherwise relatively clean. What is the organism?',
    options: ['Actinomyces', 'Candida species', 'Trichomonas vaginalis', 'Aspergillus'],
    correctAnswer: 'Candida species',
    explanation: 'Candida is identified by pseudohyphae (branching chains of elongated, constricted yeast cells) and budding blastoconidia (spores). The "shish-kebab" sign — squamous cells threaded on pseudohyphae — is pathognomonic. Aspergillus has true parallel-walled hyphae with 45° branching, not pseudohyphae.',
    keyFeatures: ['Pseudohyphae (branching with constrictions)', 'Budding blastoconidia/spores', '"Shish-kebab" sign', 'Relatively clean background'],
    clinicalRelevance: 'Vaginal candidiasis causes intense pruritus and curdy white discharge. Triggered by antibiotics, diabetes, pregnancy, or immunosuppression.',
    hints: [
      'Are the hyphae true (parallel walls, no constrictions) or pseudo (constrictions at budding points)?',
      'What is the "shish-kebab" sign and which organism causes it?',
    ],
  },

  {
    id: 'q-int-04',
    categoryId: 'benign',
    difficulty: 'intermediate',
    imageUrl: S + 'lsil-pap.jpg',
    question: 'Markedly enlarged cells (cytomegaly) with multinucleation and polychromatic cytoplasm are seen, but with a maintained LOW N/C ratio. The patient has a history of pelvic radiotherapy 5 years ago. What is the diagnosis?',
    options: ['HSIL', 'Squamous Cell Carcinoma', 'Radiation changes', 'Reactive changes due to inflammation'],
    correctAnswer: 'Radiation changes',
    explanation: 'Radiation-induced changes produce dramatic cytomegaly and bizarre cell shapes, but the critical differentiating feature from malignancy is the MAINTAINED LOW N/C RATIO — the nucleus enlarges proportionally with the cytoplasm. Clinical history of prior radiation is essential for correct interpretation.',
    keyFeatures: ['Cytomegaly (cell enlargement)', 'Multinucleation possible', 'LOW N/C ratio maintained despite enlargement', 'History of pelvic radiation'],
    clinicalRelevance: 'Recognition prevents false-positive malignancy diagnoses in radiated patients. These changes can persist for years.',
    hints: [
      'Despite the large cell size, what is the N/C ratio? Does the nucleus take up most of the cell?',
      'The patient history is a major clue — what might cause dramatic cell changes without increased N/C ratio?',
    ],
  },

  {
    id: 'q-int-05',
    categoryId: 'squamous',
    difficulty: 'intermediate',
    imageUrl: S + 'pap-abnormal.jpg',
    question: 'Squamous cells show nuclear enlargement approximately 2.5–3× normal with mild hyperchromasia and slight nuclear membrane irregularity, but changes are insufficient for LSIL diagnosis. The correct Bethesda category is:',
    options: ['ASC-H', 'ASC-US', 'LSIL', 'Negative for intraepithelial lesion'],
    correctAnswer: 'ASC-US',
    explanation: 'ASC-US (Atypical Squamous Cells of Undetermined Significance) is used when cells show nuclear changes beyond clearly reactive but below the threshold for LSIL. Nuclear enlargement is 2.5–3× (not the >3× of LSIL). The changes are equivocal — hence "undetermined significance."',
    keyFeatures: ['Nuclear enlargement 2.5–3× (less than LSIL)', 'Mild hyperchromasia', 'Slight nuclear membrane irregularity', 'Insufficient changes for LSIL diagnosis'],
    clinicalRelevance: 'Management: reflex HPV testing. HPV-positive → colposcopy. HPV-negative → routine screening.',
    hints: [
      'How much is the nuclear enlargement? The threshold between ASC-US and LSIL is approximately 3× normal.',
      'ASC means the changes exceed reactive but do not reach the bar for a squamous intraepithelial lesion.',
    ],
  },

  {
    id: 'q-int-06',
    categoryId: 'infections',
    difficulty: 'intermediate',
    imageUrl: I + 'normal-vs-bv.jpg',
    question: 'A Pap smear from a woman with a copper IUD for 5 years shows "cotton ball" aggregates of tangled filamentous basophilic bacteria with surrounding neutrophils. The patient is asymptomatic. What is the organism and what is the recommended management?',
    options: [
      'Candida — prescribe fluconazole',
      'Actinomyces — clinical evaluation; IUD removal only if symptomatic',
      'Trichomonas — treat with metronidazole, retain IUD',
      'Bacterial Vaginosis — treat with metronidazole, no IUD removal',
    ],
    correctAnswer: 'Actinomyces — clinical evaluation; IUD removal only if symptomatic',
    explanation: 'The "cotton ball" or "woolly ball" colonies of tangled filamentous bacteria are characteristic of Actinomyces israelii, a gram-positive anaerobe strongly associated with long-term IUD use. In ASYMPTOMATIC patients, the recommended management is clinical evaluation without automatic IUD removal. IUD removal and prolonged antibiotic therapy (penicillin) are indicated if the patient has symptoms (pelvic pain, fever, discharge) suggesting pelvic actinomycosis.',
    keyFeatures: ['"Cotton ball" filamentous bacterial colonies', 'Long-term IUD use (key history)', 'Surrounding neutrophilic inflammation', 'Management depends on symptoms'],
    clinicalRelevance: 'Pelvic actinomycosis is rare but serious. Asymptomatic Actinomyces on Pap smear alone does not require IUD removal.',
    hints: [
      'The colony morphology is key — are these discrete rods, branching pseudohyphae, or loose tangled filaments?',
      'This organism is classically associated with what type of contraception device?',
    ],
  },

  {
    id: 'q-int-07',
    categoryId: 'benign',
    difficulty: 'intermediate',
    imageUrl: B + 'reactive-changes.jpg',
    question: 'Following an endocervical curettage, a Pap smear shows squamous cells in flat sheets with a "streaming" directionality, macronucleoli, open fine chromatin, and SMOOTH nuclear membranes. There is no tumor diathesis. The most appropriate interpretation is:',
    options: ['Squamous Cell Carcinoma — requires urgent colposcopy', 'HSIL — requires immediate colposcopy', 'Repair/regeneration pattern — benign', 'ASC-H'],
    correctAnswer: 'Repair/regeneration pattern — benign',
    explanation: 'Repair (regenerative) pattern is a benign cellular response to injury characterized by: (1) flat sheets with nuclear "streaming," (2) macronucleoli (may be very prominent — the main mimic of malignancy), (3) open, fine chromatin, and (4) SMOOTH nuclear membranes. The absence of coarse chromatin and nuclear membrane irregularity, plus the context of recent curettage, confirm a repair pattern.',
    keyFeatures: ['Flat sheets with streaming (directional alignment)', 'Macronucleoli (can be very prominent)', 'Open, fine chromatin (NOT coarse)', 'SMOOTH nuclear membranes', 'Context of recent tissue injury'],
    clinicalRelevance: 'Repair pattern can be one of the most alarming-looking benign smears — macronucleoli may rival those of carcinoma. Smooth nuclear borders and clinical context of recent instrumentation are the key differentiators.',
    hints: [
      'Despite prominent nucleoli, what is the chromatin quality? Is it coarse/irregular or fine/open?',
      'What does "streaming" mean, and in what context does repair pattern appear?',
    ],
  },

  {
    id: 'q-int-08',
    categoryId: 'infections',
    difficulty: 'intermediate',
    imageUrl: I + 'hsv-pap.jpg',
    question: 'A single, markedly enlarged endocervical cell is identified with a huge intranuclear inclusion occupying most of the nucleus, surrounded by a clear halo, and a peripheral rim of marginated chromatin ("owl-eye" appearance). Small basophilic cytoplasmic inclusions are also present. What is the causative agent?',
    options: ['Herpes Simplex Virus (HSV)', 'Cytomegalovirus (CMV)', 'HPV', 'Chlamydia trachomatis'],
    correctAnswer: 'Cytomegalovirus (CMV)',
    explanation: 'CMV infects SINGLE cells (unlike HSV which causes multinucleated giant cells). The "owl-eye" appearance — one dominant intranuclear inclusion surrounded by a clear halo and a rim of marginated chromatin — is pathognomonic for CMV. Additional small basophilic cytoplasmic inclusions may be present. CMV characteristically infects endocervical cells, not squamous cells.',
    keyFeatures: ['Single cell (not multinucleated)', '"Owl-eye" intranuclear inclusion with halo', 'Peripheral chromatin margination', 'Small cytoplasmic inclusions', 'Infects endocervical cells preferentially'],
    clinicalRelevance: 'CMV cervicitis is most significant in immunocompromised patients. In pregnancy, primary maternal CMV carries a risk of congenital infection causing deafness and neurodevelopmental delay.',
    hints: [
      'How many cells are involved — one cell or a giant cell with many nuclei?',
      'The classic descriptor for the intranuclear inclusion is an animal\'s eye — which animal?',
    ],
  },

  {
    id: 'q-int-09',
    categoryId: 'glandular',
    difficulty: 'intermediate',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'Which architectural feature BEST distinguishes atypical glandular cells (AGC) from reactive endocervical cells?',
    options: [
      'Nuclear enlargement — AGC cells have larger nuclei than reactive cells',
      'Loss of honeycomb arrangement with nuclear crowding, overlapping, and stratification in AGC',
      'Prominent nucleoli — present in AGC but absent in reactive cells',
      'Cytoplasmic vacuolization — present in AGC but not reactive cells',
    ],
    correctAnswer: 'Loss of honeycomb arrangement with nuclear crowding, overlapping, and stratification in AGC',
    explanation: 'The key distinction between AGC and reactive endocervical cells is ARCHITECTURAL: reactive cells maintain their normal regular honeycomb arrangement with uniform nuclear spacing, while AGC shows nuclear crowding, overlapping, and stratification — disrupting the honeycomb. Both may show nuclear enlargement and nucleoli. Cytoplasmic vacuolization is common in normal endocervical cells.',
    keyFeatures: ['Reactive: preserved honeycomb with uniform spacing', 'AGC: crowding, stratification, loss of honeycomb', 'Nuclear enlargement and nucleoli appear in BOTH', 'Architecture is the critical discriminator'],
    clinicalRelevance: 'AGC carries up to 30–50% risk of significant neoplasia. Correct classification from reactive changes prevents both under-treatment and over-treatment.',
    hints: [
      'Think about the spatial arrangement of nuclei in a cluster — is it orderly like a honeycomb, or chaotic?',
      'Which features appear in both reactive and AGC cells, and which is specific to AGC?',
    ],
  },

  {
    id: 'q-int-10',
    categoryId: 'squamous',
    difficulty: 'intermediate',
    imageUrl: S + 'pap-abnormal.jpg',
    question: 'A Pap smear shows HSIL-type cells, plus individual pleomorphic cells with coarse chromatin and a granular background of necrotic debris and lysed blood. What feature most strongly indicates invasive SCC rather than pure HSIL?',
    options: [
      'High N/C ratio of the atypical cells',
      'Coarse chromatin in the atypical cells',
      'Tumor diathesis (granular necrotic background)',
      'Individual scattered atypical cells',
    ],
    correctAnswer: 'Tumor diathesis (granular necrotic background)',
    explanation: 'Tumor diathesis — the granular, necrotic, bloody background — is the single most important feature separating invasive SCC from HSIL. It represents tissue destruction from stromal invasion, something that cannot happen in HSIL (confined to the epithelium). High N/C ratio, coarse chromatin, and individual cells can all occur in HSIL. The background is the decider.',
    keyFeatures: ['Tumor diathesis = INVASION = carcinoma', 'HSIL = clean background always', 'Diathesis: granular necrosis + lysed RBCs + debris', 'N/C ratio and chromatin quality alone cannot distinguish HSIL from SCC'],
    clinicalRelevance: 'Recognizing tumor diathesis upgrades the diagnosis from HSIL to invasive SCC — changing management from LEEP/cone biopsy to urgent colposcopy + biopsy + staging.',
    hints: [
      'Look at the BACKGROUND of the smear, not just the cells — what does a "dirty" background signify?',
      'Can HSIL cells produce a granular, necrotic background? Why or why not?',
    ],
  },

  {
    id: 'q-int-11',
    categoryId: 'normal',
    difficulty: 'intermediate',
    imageUrl: N + 'normal-flora.jpg',
    question: 'A Pap smear from a 28-week pregnant woman shows 75% intermediate cells, many with a boat-shaped ("navicular") form and thick glycogen-rich cytoplasm. What hormonal influence explains this pattern?',
    options: [
      'High estrogen causing superficial cell predominance',
      'Progesterone-dominant environment causing intermediate cell predominance with navicular forms',
      'Hypoestrogenic state causing parabasal cell predominance',
      'Androgen influence causing metaplastic cell predominance',
    ],
    correctAnswer: 'Progesterone-dominant environment causing intermediate cell predominance with navicular forms',
    explanation: 'During pregnancy, high progesterone levels stimulate intermediate cell production and cause them to fold into boat-shaped "navicular" cells (from Latin navis = ship). These cells accumulate glycogen, forming thick cytoplasm that resists cytolysis by Lactobacillus. This pattern is physiologically normal and does not require further investigation.',
    keyFeatures: ['Navicular cells = boat-shaped intermediate cells in pregnancy', 'Progesterone → intermediate cell predominance', 'Glycogen-rich thick cytoplasm resists cytolysis', 'Normal finding in pregnancy'],
    clinicalRelevance: 'Recognizing the normal pregnancy smear pattern prevents misinterpretation. The parabasal cells appearing in later pregnancy should not be misidentified as dysplastic cells.',
    hints: [
      'What hormone dominates during pregnancy and what type of squamous cell does it promote?',
      'What is the shape of squamous cells in pregnancy, and what Latin word gives them their name?',
    ],
  },

  {
    id: 'q-int-12',
    categoryId: 'infections',
    difficulty: 'intermediate',
    imageUrl: I + 'normal-vs-bv.jpg',
    question: 'A Pap smear shows a lymphoid aggregate with a MIXED population of small mature lymphocytes, large transformed lymphocytes, plasma cells, and tingible-body macrophages ("starry sky"). The squamous cells are normal. What is the most likely diagnosis and classically associated organism?',
    options: [
      'Non-Hodgkin lymphoma — urgent lymph node biopsy required',
      'Follicular cervicitis — often associated with Chlamydia trachomatis',
      'HSV infection — treat with acyclovir',
      'Actinomyces colonisation — assess IUD status',
    ],
    correctAnswer: 'Follicular cervicitis — often associated with Chlamydia trachomatis',
    explanation: 'Follicular (lymphocytic) cervicitis shows reactive lymphoid follicles with germinal centers. Cytologically, mixed lymphoid aggregates with tingible-body macrophages create a "starry sky" pattern. The MIXED cell population (mature + transformed lymphocytes + plasma cells) distinguishes it from lymphoma, which shows a MONOMORPHIC population. It is the characteristic cytological pattern of Chlamydia trachomatis cervicitis.',
    keyFeatures: ['Mixed lymphoid population (not monomorphic)', 'Tingible-body macrophages = "starry sky"', 'Plasma cells present', 'Classically associated with Chlamydia trachomatis'],
    clinicalRelevance: 'Chlamydia is the most common bacterial STI globally — often asymptomatic but leading to PID, tubal factor infertility, and ectopic pregnancy. Recognizing follicular cervicitis should prompt NAAT Chlamydia testing.',
    hints: [
      'Is the lymphoid population uniform (all one type) or mixed (different lymphocyte stages + plasma cells)?',
      'The "starry sky" pattern results from what type of cell engulfing lymphocyte debris?',
    ],
  },

  // ─── ADVANCED ──────────────────────────────────────────────────────────────

  {
    id: 'q-adv-01',
    categoryId: 'squamous',
    difficulty: 'advanced',
    imageUrl: S + 'pap-abnormal.jpg',
    question: 'Markedly pleomorphic squamous cells including "tadpole" cells with dense eosinophilic cytoplasm, extreme nuclear atypia, macronucleoli (in non-keratinizing variant), and a granular, bloody, "dirty" background are present. What is the most appropriate diagnosis?',
    options: ['HSIL with features concerning for invasion', 'High-grade LSIL', 'Squamous Cell Carcinoma', 'ASC-H'],
    correctAnswer: 'Squamous Cell Carcinoma',
    explanation: 'The presence of TUMOR DIATHESIS — a granular, bloody background of necrotic debris — upgrades the diagnosis from HSIL to invasive SCC. "Tadpole" cells (keratinizing variant), extreme pleomorphism, and macronucleoli (non-keratinizing) confirm malignancy. HSIL has a clean background.',
    keyFeatures: ['Tumor diathesis (granular, necrotic, bloody background)', 'Extreme nuclear pleomorphism', '"Tadpole" or "fiber" cells (keratinizing type)', 'Macronucleoli (non-keratinizing type)'],
    clinicalRelevance: 'SCC requires urgent colposcopy and biopsy. Stage IA1 can be managed surgically; advanced disease requires chemoradiotherapy.',
    hints: [
      'What is the single most important background feature that separates HSIL from invasive carcinoma?',
      'Look for the "dirty background" — granular necrotic debris mixed with lysed blood cells.',
    ],
  },

  {
    id: 'q-adv-02',
    categoryId: 'glandular',
    difficulty: 'advanced',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'Cell strips showing nuclear pseudostratification and "feathering" at cluster edges, with coarse chromatin, apoptotic bodies, and — critically — a CLEAN background are identified. What is the most likely diagnosis?',
    options: ['Endocervical adenocarcinoma', 'Reactive endocervical cells', 'Adenocarcinoma in situ (AIS)', 'Atypical glandular cells (AGC)'],
    correctAnswer: 'Adenocarcinoma in situ (AIS)',
    explanation: 'AIS is characterized by "feathering" (nuclear palisading at cluster edges), rosette formation, nuclear pseudostratification, coarse chromatin, and apoptotic bodies. The CRITICAL distinguishing feature from invasive adenocarcinoma is the CLEAN BACKGROUND — no tumor diathesis, as the basement membrane is intact.',
    keyFeatures: ['"Feathering" (nuclear palisading at edges)', 'Rosette formation', 'Nuclear pseudostratification', 'Apoptotic bodies', 'CLEAN background (no diathesis)'],
    clinicalRelevance: 'AIS is the non-invasive precursor to endocervical adenocarcinoma. Treatment: cold knife conization or LEEP. Skip lesions make negative margins unreliable.',
    hints: [
      'Compare the background to invasive adenocarcinoma — what is the KEY difference?',
      '"Feathering" — nuclei protruding beyond the cytoplasmic border — is pathognomonic for which glandular lesion?',
    ],
  },

  {
    id: 'q-adv-03',
    categoryId: 'glandular',
    difficulty: 'advanced',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'Pleomorphic glandular cells with macronucleoli, three-dimensional clusters, and a watery granular background of necrotic debris are identified. How does this differ from AIS?',
    options: [
      'Presence of feathering — AIS lacks feathering',
      'Tumor diathesis (watery necrotic background) indicates stromal invasion in adenocarcinoma',
      'Nuclear pseudostratification — AIS lacks this feature',
      'Presence of apoptotic bodies — AIS lacks apoptosis',
    ],
    correctAnswer: 'Tumor diathesis (watery necrotic background) indicates stromal invasion in adenocarcinoma',
    explanation: 'Both AIS and invasive adenocarcinoma show feathering, pseudostratification, and apoptotic bodies. The KEY differentiator is the TUMOR DIATHESIS — the watery, granular, necrotic background in invasive adenocarcinoma reflects stromal invasion and tissue destruction, which AIS (confined to the epithelium) lacks.',
    keyFeatures: ['Tumor diathesis (watery, necrotic background) = invasion', 'Macronucleoli (more prominent than AIS)', 'Extreme pleomorphism', 'AIS has clean background despite similar architectural features'],
    clinicalRelevance: 'Invasive endocervical adenocarcinoma is increasingly common (now ~25% of cervical carcinomas). HPV 18 is predominant. Stage determines treatment.',
    hints: [
      'AIS and invasive adenocarcinoma share many features — what is the ONE feature that reliably indicates invasion?',
      'Think about what a "dirty background" means in cytopathology.',
    ],
  },

  {
    id: 'q-adv-04',
    categoryId: 'infections',
    difficulty: 'advanced',
    imageUrl: I + 'hsv-pap.jpg',
    question: 'Multinucleated giant cells with nuclear molding, ground-glass chromatin, margination of chromatin to the nuclear periphery, and occasional eosinophilic intranuclear inclusions surrounded by a clear halo are identified. What is the diagnosis?',
    options: ['Cytomegalovirus (CMV)', 'Herpes Simplex Virus (HSV)', 'HPV infection (koilocytosis)', 'Radiation effect'],
    correctAnswer: 'Herpes Simplex Virus (HSV)',
    explanation: 'HSV cytopathic effect (CPE) is characterized by the "3 Ms": Multinucleation, Molding (nuclei conforming to each other\'s shape), and Margination (chromatin pushed to nuclear periphery). The central "ground-glass" chromatin results from viral replication. Cowdry type A inclusions (eosinophilic, haloed) confirm HSV. CMV infects single cells with large basophilic inclusions ("owl-eye").',
    keyFeatures: ['Multinucleated giant cells', 'Nuclear molding (jigsaw-puzzle fitting)', 'Ground-glass chromatin', 'Chromatin margination', 'Cowdry type A inclusions (eosinophilic, haloed)'],
    clinicalRelevance: 'Genital herpes requires antiviral therapy (acyclovir). In pregnancy, neonatal HSV dissemination can be fatal — Pap smear diagnosis triggers obstetric management.',
    hints: [
      'What are the "3 Ms" of HSV cytopathic effect?',
      'How does the nuclear appearance of HSV differ from CMV (which shows a single large "owl-eye" inclusion in a single cell)?',
    ],
  },

  {
    id: 'q-adv-05',
    categoryId: 'glandular',
    difficulty: 'advanced',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'A 38-year-old woman\'s Pap smear shows small clusters of columnar cells with nuclear crowding, stratification, mild-to-moderate pleomorphism, prominent nucleoli, and occasional intracytoplasmic vacuoles. The Bethesda category is:',
    options: ['AIS', 'Invasive adenocarcinoma', 'Atypical glandular cells (AGC)', 'Normal endocervical cells'],
    correctAnswer: 'Atypical glandular cells (AGC)',
    explanation: 'AGC is used when glandular cells show nuclear changes beyond reactive but below the threshold for AIS or adenocarcinoma. Features: nuclear crowding, stratification, mild-to-moderate pleomorphism, and prominent nucleoli — but without the full criteria for AIS (feathering, rosettes, coarse chromatin, apoptosis). AGC may be endocervical or endometrial in origin.',
    keyFeatures: ['Nuclear crowding and stratification', 'Mild-to-moderate pleomorphism', 'Prominent nucleoli', 'Insufficient for AIS diagnosis (no feathering/rosettes/apoptosis)'],
    clinicalRelevance: 'AGC carries a 30–50% risk of associated neoplasia. Management requires colposcopy, ECC, and endometrial biopsy for women ≥35 years. AGC-FN (favor neoplastic) has the highest risk.',
    hints: [
      'Does this meet the full criteria for AIS? Check for feathering, rosettes, coarse chromatin, and apoptotic bodies.',
      'AGC is the "equivocal" glandular category — beyond reactive but below definitive neoplasia.',
    ],
  },

  {
    id: 'q-adv-06',
    categoryId: 'squamous',
    difficulty: 'advanced',
    imageUrl: S + 'pap-abnormal.jpg',
    question: 'Small, atypical squamous cells with high N/C ratios similar to HSIL cells are identified, but numbers are insufficient for a definitive HSIL diagnosis. The most appropriate Bethesda classification is:',
    options: ['ASC-US', 'ASC-H', 'LSIL', 'HSIL'],
    correctAnswer: 'ASC-H',
    explanation: 'ASC-H (Atypical Squamous Cells — cannot exclude HSIL) is used when there are atypical small cells with high N/C ratios suggesting HSIL, but the number or quality of cells is insufficient for definitive HSIL diagnosis. This category has a higher risk of CIN 2+ than ASC-US (approximately 24–94% in various studies) and requires immediate colposcopy.',
    keyFeatures: ['Small atypical cells with high N/C ratio', 'Changes suggest HSIL but insufficient for definitive diagnosis', 'Higher CIN 2+ risk than ASC-US', 'Requires colposcopy without HPV reflex testing'],
    clinicalRelevance: 'ASC-H bypasses reflex HPV testing — colposcopy is performed directly due to high risk of underlying HSIL/CIN 2+.',
    hints: [
      'What does "H" stand for in ASC-H? How does this differ from ASC-US in terms of underlying risk?',
      'When you see small cells with high N/C ratios but not enough for definitive HSIL, which Bethesda category applies?',
    ],
  },

  {
    id: 'q-adv-07',
    categoryId: 'squamous',
    difficulty: 'advanced',
    imageUrl: N + 'parabasal-cells.jpg',
    question: 'A post-menopausal smear shows small cells with high N/C ratios and a granular background. How do you differentiate true HSIL from atrophic changes in this patient?',
    options: [
      'HSIL cells have SMOOTH round nuclei; atrophic cells have COARSE irregular chromatin',
      'Atrophic cells have FINE, EVEN chromatin and SMOOTH nuclei; HSIL has COARSE, IRREGULAR chromatin',
      'Both have the same nuclear features — background is the only difference',
      'HSIL always shows koilocytes; atrophic changes do not',
    ],
    correctAnswer: 'Atrophic cells have FINE, EVEN chromatin and SMOOTH nuclei; HSIL has COARSE, IRREGULAR chromatin',
    explanation: 'Despite both atrophic parabasal cells and HSIL cells being small with high N/C ratios, their nuclear features differ critically. Atrophic cells have FINE, EVENLY distributed chromatin with SMOOTH, ROUND nuclear contours. HSIL cells have COARSE, IRREGULARLY distributed chromatin with IRREGULAR nuclear membranes. When uncertain, repeat the smear after 2–3 weeks of topical estrogen — atrophic cells will mature and resolve, while HSIL will persist.',
    keyFeatures: ['Atrophic: fine chromatin, smooth nuclei', 'HSIL: coarse chromatin, irregular nuclear membranes', 'Topical estrogen trial can help differentiate', 'Clinical context (post-menopausal, no HRT) is essential'],
    clinicalRelevance: 'Misinterpreting atrophy as HSIL leads to unnecessary colposcopy and patient anxiety. When in doubt, estrogen pre-treatment before a repeat smear is the standard approach.',
    hints: [
      'Focus on the chromatin quality — is it fine and even (like a normal cell) or coarse and irregular (like a dysplastic cell)?',
      'Think of a practical solution: what simple treatment can you give to clarify the diagnosis?',
    ],
  },

  {
    id: 'q-adv-08',
    categoryId: 'glandular',
    difficulty: 'advanced',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'A 63-year-old postmenopausal woman\'s Pap smear shows small clusters of cells with vacuolated cytoplasm, nuclear enlargement, mild pleomorphism, and a watery background. No squamous abnormality is identified. The most critical next step is:',
    options: [
      'Reflex HPV testing — manage based on result',
      'Repeat smear in 6 months',
      'Colposcopy + endocervical curettage + endometrial biopsy',
      'No further action — endometrial cells are normal in all women',
    ],
    correctAnswer: 'Colposcopy + endocervical curettage + endometrial biopsy',
    explanation: 'Under the 2014 Bethesda System, glandular cells in a postmenopausal woman are ALWAYS reportable and require investigation. The triple workup (colposcopy + ECC + endometrial biopsy) is mandatory to exclude endometrial carcinoma — the most common gynecological malignancy in developed countries. There is no role for HPV reflex testing in glandular cell management.',
    keyFeatures: ['Postmenopausal + glandular cells = always investigate', 'Triple workup: colposcopy + ECC + endometrial biopsy', 'No HPV reflex testing for glandular abnormalities', 'Endometrial carcinoma must be excluded'],
    clinicalRelevance: 'Endometrial carcinoma has increasing incidence associated with obesity and metabolic syndrome. Early detection allows curative surgical treatment in most cases.',
    hints: [
      'In women ≥45 or postmenopausal, endometrial cells are no longer "normal" — what does their presence signify?',
      'What three-part workup is recommended for glandular abnormalities in Bethesda guidelines?',
    ],
  },

  {
    id: 'q-adv-09',
    categoryId: 'squamous',
    difficulty: 'advanced',
    imageUrl: S + 'hsil-thinprep.jpg',
    question: 'In a Pap smear showing invasive SCC, which combination correctly describes KERATINIZING versus NON-KERATINIZING subtypes?',
    options: [
      'Keratinizing: macronucleoli + syncytial sheets; Non-keratinizing: "tadpole" cells + no nucleoli',
      'Keratinizing: bizarre "tadpole"/"fiber" cells, dense orangeophilic cytoplasm, NO nucleoli; Non-keratinizing: less bizarre, syncytial sheets, macronucleoli',
      'Keratinizing: gland formation + mucin; Non-keratinizing: solid nests + no mucin',
      'Both subtypes look identical cytologically',
    ],
    correctAnswer: 'Keratinizing: bizarre "tadpole"/"fiber" cells, dense orangeophilic cytoplasm, NO nucleoli; Non-keratinizing: less bizarre, syncytial sheets, macronucleoli',
    explanation: 'Keratinizing SCC shows dramatic pleomorphism — "tadpole" and "fiber" cells with intensely eosinophilic to orangeophilic dense cytoplasm, and notably ABSENT nucleoli. Non-keratinizing SCC shows less bizarre cells in syncytial sheets with PROMINENT MACRONUCLEOLI and less cytoplasmic eosinophilia. BOTH subtypes share tumor diathesis as a cardinal feature.',
    keyFeatures: ['Keratinizing: "tadpole"/"fiber" cells, dense orange cytoplasm, NO nucleoli', 'Non-keratinizing: syncytial sheets, macronucleoli, less pleomorphism', 'Tumor diathesis present in both subtypes'],
    clinicalRelevance: 'Both SCC subtypes require the same urgent management (colposcopy + biopsy + staging). The distinction is primarily prognostic — keratinizing (well-differentiated) has a slightly better prognosis in some studies.',
    hints: [
      'For keratinizing: what does abnormally keratinized cytoplasm look like on Papanicolaou stain?',
      'In non-keratinizing SCC, the cells are less bizarre but what prominent nuclear feature is seen?',
    ],
  },

  {
    id: 'q-adv-10',
    categoryId: 'infections',
    difficulty: 'advanced',
    imageUrl: I + 'hsv-pap.jpg',
    question: 'Which HIGH-RISK HPV type is most strongly associated with GLANDULAR lesions (AIS and endocervical adenocarcinoma) rather than squamous lesions?',
    options: ['HPV 16', 'HPV 18', 'HPV 31', 'HPV 33'],
    correctAnswer: 'HPV 18',
    explanation: 'While HPV 16 and 18 are both high-risk types, they have different tropisms: HPV 16 predominantly causes squamous lesions (LSIL, HSIL/CIN 2-3, SCC). HPV 18 has strong affinity for glandular cells and is the dominant HPV type in AIS and invasive endocervical adenocarcinoma. HPV 18 also tends to cause rapidly progressive lesions that may bypass detectable cytological stages.',
    keyFeatures: ['HPV 16 = predominantly squamous tropism (LSIL/HSIL/SCC)', 'HPV 18 = predominantly glandular tropism (AIS/adenocarcinoma)', 'HPV 18 progresses faster — may bypass cytological detection', 'Both covered by current HPV vaccines'],
    clinicalRelevance: 'The HPV 18 glandular tropism explains why adenocarcinoma rates have not declined as much as squamous carcinoma with Pap screening. HPV primary screening (co-testing) helps detect HPV 18 carriers before cytological changes appear.',
    hints: [
      'One of the two major high-risk types preferentially affects glandular cells — which one?',
      'Which cancer type (squamous or glandular cervical) has NOT declined as much with Pap screening, and which HPV type explains this?',
    ],
  },

  {
    id: 'q-adv-11',
    categoryId: 'glandular',
    difficulty: 'advanced',
    imageUrl: G + 'cervical-ais.jpg',
    question: 'After cone biopsy for AIS with histologically clear margins (>3 mm), the patient asks if she is cured. What is the most accurate response?',
    options: [
      'Yes — clear margins mean complete excision; no further surveillance needed',
      'No — AIS has "skip lesions" (non-contiguous foci in the endocervical canal), so clear margins do not guarantee complete removal; close surveillance with HPV testing + cytology is essential',
      'Yes — clear margins combined with negative HPV testing confirm cure',
      'No — hysterectomy is required regardless of margin status for AIS',
    ],
    correctAnswer: 'No — AIS has "skip lesions" (non-contiguous foci in the endocervical canal), so clear margins do not guarantee complete removal; close surveillance with HPV testing + cytology is essential',
    explanation: 'AIS has a unique biological feature: SKIP LESIONS — isolated foci of AIS that are non-contiguous within the endocervical canal, separated by normal epithelium. A clear surgical margin does NOT guarantee all AIS foci have been removed. Close surveillance (HPV testing + cytology at 6 months, then annually) is mandatory. Hysterectomy is definitive treatment for patients who have completed childbearing.',
    keyFeatures: ['Skip lesions make negative margins unreliable for AIS', 'Surveillance protocol: HPV + cytology at 6, 12, 24 months', 'Hysterectomy = definitive therapy after childbearing', 'This biology is UNIQUE to AIS — CIN does not have skip lesions'],
    clinicalRelevance: 'Recurrence rates for AIS after conservative excision range from 4–20% even with clear margins. Long-term follow-up is essential regardless of margin status.',
    hints: [
      'What is a "skip lesion" and why does it make margin interpretation unreliable?',
      'Compare AIS to CIN — does CIN have skip lesions? How does this affect management differently?',
    ],
  },

  {
    id: 'q-adv-12',
    categoryId: 'normal',
    difficulty: 'advanced',
    imageUrl: N + 'endocervical-cells.jpg',
    question: 'A ThinPrep Pap smear from a 38-year-old woman contains >8,000 well-preserved squamous cells but NO endocervical or transformation zone component. Under the 2014 Bethesda System, how should specimen adequacy be reported?',
    options: [
      'Unsatisfactory for evaluation — absent endocervical/TZ component',
      'Satisfactory for evaluation; endocervical/transformation zone component absent/insufficient',
      'Satisfactory for evaluation — endocervical cells are optional for adequacy',
      'Limited — repeat in 3 months',
    ],
    correctAnswer: 'Satisfactory for evaluation; endocervical/transformation zone component absent/insufficient',
    explanation: 'Under the 2014 Bethesda System, an absent endocervical/TZ component does NOT render a smear UNSATISFACTORY — the smear is SATISFACTORY but the absence is noted as a quality indicator. An UNSATISFACTORY smear requires: <8,000–12,000 squamous cells (LBC) or >75% of the cellular component obscured by blood, inflammation, or cytolysis.',
    keyFeatures: ['Absent EC/TZ = Satisfactory with quality indicator (NOT unsatisfactory)', 'Unsatisfactory thresholds: <8,000–12,000 cells (LBC) or >75% obscured', 'Report the absent EC/TZ — it may affect screening interval', 'The smear CAN be interpreted even without EC/TZ component'],
    clinicalRelevance: 'Distinguishing "satisfactory" from "unsatisfactory" has management implications — unsatisfactory smears require repeat testing within 2–4 months. An absent EC/TZ component may prompt a shorter screening interval but does not require immediate repeat.',
    hints: [
      'What are the criteria for an UNSATISFACTORY smear? Does missing endocervical cells meet those criteria?',
      'The EC/TZ component is a quality indicator, not an adequacy requirement — how should its absence be phrased?',
    ],
  },
];
