import type { SlideContent } from '../types/learning';

// Images served locally from public/images/ — avoids Wikimedia hotlink restrictions
const N = '/images/normal/';
const I = '/images/infections/';
const B = '/images/benign/';
const S = '/images/squamous/';
const G = '/images/glandular/';

export const learningSlides: SlideContent[] = [

  // ─── NORMAL CERVICAL CELLS ───────────────────────────────────────────────────

  {
    id: 'norm-sq-01',
    categoryId: 'normal',
    title: 'Superficial Squamous Cells',
    imageUrl: N + 'superficial-cells.jpg',
    cellularFeatures: [
      'Large, polygonal cells with well-defined borders',
      'Abundant, flat cytoplasm (eosinophilic or cyanophilic)',
      'Clear cell boundaries visible between adjacent cells',
    ],
    nuclearFeatures: [
      'Small, pyknotic nuclei (densely condensed chromatin)',
      'Very low nuclear-to-cytoplasmic (N/C) ratio (<1:6)',
    ],
    backgroundFeatures: [
      'Clean background without debris',
      'Presence of Lactobacillus (rod-shaped bacteria — normal flora)',
    ],
    diagnosticNotes:
      'Superficial squamous cells are the most mature cells of the stratified squamous epithelium. Their pyknotic nuclei indicate terminal differentiation driven by high estrogen levels.',
    clinicalRelevance:
      'Predominance of superficial cells indicates adequate estrogenic stimulation, typically seen in the proliferative phase and in postmenopausal women on HRT.',
    cues: [
      {
        id: 'c1',
        x: 45,
        y: 30,
        title: 'Pyknotic Nucleus',
        description:
          'Observe the small, dark, and condensed (pyknotic) nucleus. The chromatin is so dense it appears as a solid dot — a hallmark of the fully mature superficial cell.',
      },
      {
        id: 'c2',
        x: 65,
        y: 55,
        title: 'Abundant Cytoplasm',
        description:
          'The cytoplasm is vast and polygonal, creating a very low N/C ratio. This extensive cytoplasm reflects full glycogen accumulation in mature squamous cells.',
      },
      {
        id: 'c3',
        x: 25,
        y: 70,
        title: 'Lactobacillus Flora',
        description:
          'The rod-shaped bacteria in the clean background are Lactobacillus acidophilus — the normal protective flora of the healthy cervix that maintains an acidic pH.',
      },
    ],
  },

  {
    id: 'norm-int-02',
    categoryId: 'normal',
    title: 'Intermediate Squamous Cells',
    imageUrl: N + 'normal-flora.jpg',
    cellularFeatures: [
      'Medium-sized polygonal cells',
      'Folded or "boat-shaped" cytoplasm (navicular cells in pregnancy)',
      'Cyanophilic (blue-staining) cytoplasm due to glycogen content',
    ],
    nuclearFeatures: [
      'Vesicular nucleus (open chromatin pattern)',
      'Slightly larger nucleus than superficial cells',
      'Low N/C ratio, but higher than superficial cells',
    ],
    backgroundFeatures: [
      'May show cytolysis by Döderlein bacilli (Lactobacillus)',
      'Naked nuclei or cytoplasmic fragments from cytolysis',
    ],
    diagnosticNotes:
      'Intermediate cells represent a mid-level of squamous maturation. They are the dominant cell type in the secretory phase and pregnancy.',
    clinicalRelevance:
      'Predominance during the secretory phase is normal. In pregnancy, "navicular cells" with thick glycogen-rich cytoplasm predominate — this is physiologically normal.',
    cues: [
      {
        id: 'c4',
        x: 50,
        y: 40,
        title: 'Vesicular Nucleus',
        description:
          'Unlike the pyknotic nucleus of superficial cells, this nucleus is larger with open, granular chromatin — reflecting an active but non-dividing cell.',
      },
      {
        id: 'c5',
        x: 30,
        y: 60,
        title: 'Glycogen-Rich Cytoplasm',
        description:
          'The blue-staining (cyanophilic) cytoplasm is packed with glycogen, which serves as a substrate for Lactobacillus to produce lactic acid and maintain vaginal acidity.',
      },
    ],
  },

  {
    id: 'norm-endo-03',
    categoryId: 'normal',
    title: 'Endocervical Cells',
    imageUrl: N + 'endocervical-cells.jpg',
    cellularFeatures: [
      'Tall, columnar cells with basal nuclei',
      'Mucin-containing cytoplasm (pale, vacuolated)',
      'Arranged in honeycomb (flat sheets) or palisade (strips) patterns',
    ],
    nuclearFeatures: [
      'Round to oval, basally placed nuclei',
      'Uniform, finely granular chromatin',
      'Small prominent nucleolus may be present',
    ],
    backgroundFeatures: [
      'Mucus threads in background',
      'Clean background otherwise',
    ],
    diagnosticNotes:
      'Endocervical cells line the endocervical canal and produce mucus. Their presence in a Pap smear confirms adequate sampling of the transformation zone.',
    clinicalRelevance:
      'Presence of endocervical cells is an indicator of sample adequacy — confirming sampling of the squamo-columnar junction (SCJ) where most cervical carcinomas arise.',
    cues: [
      {
        id: 'c6',
        x: 45,
        y: 35,
        title: 'Honeycomb Pattern',
        description:
          'When viewed en face (flat), endocervical cells arrange in a honeycomb configuration with uniform spacing and centrally placed nuclei — a defining architectural feature.',
      },
      {
        id: 'c7',
        x: 60,
        y: 65,
        title: 'Vacuolated Cytoplasm',
        description:
          'The pale, bubbly cytoplasm reflects stored mucin. This mucin is secreted into the cervical canal and acts as a barrier to ascending infection.',
      },
    ],
  },

  {
    id: 'norm-meta-04',
    categoryId: 'normal',
    title: 'Squamous Metaplastic Cells',
    imageUrl: N + 'endocervical-cells2.jpg',
    cellularFeatures: [
      'Polygonal cells, smaller than mature squamous cells',
      'Dense cytoplasm with spider-leg extensions',
      'Sharp cell borders',
    ],
    nuclearFeatures: [
      'Central, round to oval nucleus',
      'Finely granular chromatin',
      'N/C ratio intermediate between squamous and endocervical cells',
    ],
    backgroundFeatures: [
      'Clean background',
      'Often mixed with both squamous and endocervical cells',
    ],
    diagnosticNotes:
      'Squamous metaplasia is the normal physiological replacement of columnar endocervical epithelium by squamous epithelium at the transformation zone. These cells are immature reserve cells.',
    clinicalRelevance:
      'Metaplastic cells are a normal finding and indicate active remodelling at the transformation zone. Their presence confirms sampling from the squamo-columnar junction.',
    cues: [
      {
        id: 'c8',
        x: 50,
        y: 45,
        title: 'Spider-Leg Extensions',
        description:
          'Immature metaplastic cells often show cytoplasmic projections radiating outward — these "spider legs" are a distinguishing feature from mature squamous cells.',
      },
      {
        id: 'c9',
        x: 30,
        y: 30,
        title: 'Dense Cytoplasm',
        description:
          'The cytoplasm is denser and more homogeneous than endocervical cells but less flat than superficial squamous cells, reflecting their transitional nature.',
      },
    ],
  },

  {
    id: 'norm-para-05',
    categoryId: 'normal',
    title: 'Parabasal Cells',
    imageUrl: N + 'parabasal-cells.jpg',
    cellularFeatures: [
      'Small, round to oval cells — smallest of the squamous cells',
      'Scant, dense, cyanophilic cytoplasm',
      'High N/C ratio (similar to HSIL — important distinction)',
    ],
    nuclearFeatures: [
      'Round nucleus with fine, evenly distributed chromatin',
      'SMOOTH nuclear membrane — differentiates from HSIL',
      'Occasional small nucleolus',
    ],
    backgroundFeatures: [
      'Often seen with naked nuclei and cytolytic debris in atrophic smears',
      '"Blue blobs" — degenerated parabasal cells without recognizable nucleus',
      'Acute inflammation may be present in atrophic vaginitis',
    ],
    diagnosticNotes:
      'Parabasal cells are the least mature squamous cells sampled in a Pap smear. They dominate in atrophic conditions (post-menopause, post-partum, prolonged amenorrhea). Their high N/C ratio can mimic HSIL — the KEY difference is the SMOOTH, ROUND nucleus with FINE chromatin.',
    clinicalRelevance:
      'Atrophic smears dominated by parabasal cells can be difficult to interpret. Topical estrogen therapy normalizes the smear, allowing re-evaluation. Do NOT call an atrophic smear positive for HSIL without clinical correlation.',
    cues: [
      {
        id: 'c-para-1',
        x: 50,
        y: 40,
        title: 'Round, Smooth Nucleus',
        description:
          'The nucleus occupies a large proportion of the cell (high N/C ratio), but it is ROUND and SMOOTH — not irregular or coarsely granular like HSIL. This smooth contour is the single most important differentiating feature.',
      },
      {
        id: 'c-para-2',
        x: 30,
        y: 65,
        title: 'Scant Dense Cytoplasm',
        description:
          'The cytoplasm is scanty but densely stained (cyanophilic) — reflecting immature squamous differentiation without glycogen accumulation.',
      },
      {
        id: 'c-para-3',
        x: 70,
        y: 55,
        title: '"Blue Blob" Degeneration',
        description:
          'Parabasal cells can degenerate into pale, structureless "blue blobs" with no recognizable nucleus. These are a hallmark of atrophic smears and should not be misinterpreted as abnormal cells.',
      },
    ],
  },

  {
    id: 'norm-tz-06',
    categoryId: 'normal',
    title: 'Transformation Zone — Key Sampling Concepts',
    imageUrl: N + 'endocervical-cells.jpg',
    cellularFeatures: [
      'Mixed population of squamous metaplastic and endocervical cells',
      'Variable degrees of metaplastic maturation from immature to mature',
      'Reserve cells (small, oval, scant cytoplasm) may be seen beneath columnar cells',
    ],
    nuclearFeatures: [
      'Round to oval nuclei in both cell types',
      'Fine evenly distributed chromatin — uniformly benign',
      'Small nucleoli may be present in endocervical component',
    ],
    backgroundFeatures: [
      'May show mucus threads',
      'Clean background without diathesis',
      'Mixed flora — lactobacilli common',
    ],
    diagnosticNotes:
      'The transformation zone (TZ) is the area between the original and current squamo-columnar junctions — where columnar endocervical epithelium undergoes metaplastic replacement by squamous epithelium. This zone is the most vulnerable site for HPV infection and carcinogenesis. Cells sampled from here include metaplastic cells, endocervical cells, and their transitional reserve cell forms.',
    clinicalRelevance:
      'Complete sampling of the TZ is the primary goal of cervical sampling. The Bethesda System requires reporting whether an endocervical/TZ component is present as a quality indicator. Absent EC/TZ component does NOT make a smear "unsatisfactory" — it is Satisfactory with a quality note.',
    cues: [
      {
        id: 'c-tz-1',
        x: 45,
        y: 35,
        title: 'Endocervical Columnar Cells',
        description:
          'Tall columnar cells with basal nuclei and mucin-containing cytoplasm represent the columnar component of the TZ. Their presence confirms sampling at or near the squamo-columnar junction.',
      },
      {
        id: 'c-tz-2',
        x: 65,
        y: 60,
        title: 'Metaplastic Cells — Transitional Zone',
        description:
          'Polygonal cells with dense cytoplasm and spider-leg extensions represent immature squamous metaplasia — cells mid-transition from columnar to squamous phenotype. They are the cells most susceptible to HPV integration and subsequent carcinogenesis.',
      },
      {
        id: 'c-tz-3',
        x: 30,
        y: 70,
        title: 'Squamo-Columnar Junction',
        description:
          'The abrupt transition between columnar and squamous epithelium is the SCJ. In reproductive-age women, estrogen migrates this junction onto the ectocervix, making it easily sampled. In postmenopausal women, it recedes into the canal, making TZ sampling more challenging.',
      },
    ],
  },

  // ─── INFECTIOUS ORGANISMS ─────────────────────────────────────────────────────

  {
    id: 'inf-bv-01',
    categoryId: 'infections',
    title: 'Bacterial Vaginosis (Clue Cells)',
    imageUrl: I + 'clue-cells-bv.jpg',
    cellularFeatures: [
      'Squamous cells heavily coated with coccobacilli',
      'Obscured, "shaggy" cell borders ("clue cells")',
      'Loss of distinct cell margins',
    ],
    nuclearFeatures: [
      'Normal nuclei — not enlarged or hyperchromatic',
      'Nucleus visible beneath bacterial coating',
    ],
    backgroundFeatures: [
      'Filmy, granular smear background',
      'Significant reduction or absence of Lactobacillus',
      'Diffuse coating of small coccobacilli across the background',
    ],
    diagnosticNotes:
      'Bacterial Vaginosis (BV) is caused by a shift in vaginal flora from Lactobacillus to a polymicrobial mix dominated by Gardnerella vaginalis. The hallmark is the "clue cell" — a squamous cell with borders obscured by bacteria.',
    clinicalRelevance:
      'BV is the most common cause of vaginal discharge in women of reproductive age. It is associated with malodorous (fishy-smelling) discharge, preterm labor in pregnancy, and increased STI susceptibility.',
    cues: [
      {
        id: 'c10',
        x: 50,
        y: 40,
        title: 'Clue Cell',
        description:
          'The defining feature of BV — a squamous cell completely coated with Gardnerella vaginalis, making its borders appear "shaggy" and ill-defined.',
      },
      {
        id: 'c11',
        x: 20,
        y: 70,
        title: 'Filmy Background',
        description:
          'This granular, filmy background is caused by the massive proliferation of coccobacilli replacing the normal lactobacilli flora, resulting in a characteristic low-power appearance.',
      },
    ],
  },

  {
    id: 'inf-candida-02',
    categoryId: 'infections',
    title: 'Candida albicans Infection',
    imageUrl: I + 'clue-cell-bv.jpg',
    cellularFeatures: [
      'Squamous cells may show cytoplasmic vacuolization',
      'Cells can cluster around fungal hyphae',
      '"Shish-kebab" arrangement of cells threaded on pseudohyphae',
    ],
    nuclearFeatures: [
      'Normal nuclear features in host cells',
      'No nuclear enlargement or chromatin abnormality',
    ],
    backgroundFeatures: [
      'Pseudohyphae (branching filaments) and budding spores visible',
      'Background may show acute inflammation',
    ],
    diagnosticNotes:
      'Candida infection is recognized by its pseudohyphae (chains of elongated budding yeast) and spores. The classic "shish-kebab" sign occurs when squamous cells are threaded along the hyphae.',
    clinicalRelevance:
      'Vaginal candidiasis causes intense vulvovaginal pruritus and white, curdy discharge. Common triggers include antibiotic use, diabetes, immunosuppression, and pregnancy.',
    cues: [
      {
        id: 'c12',
        x: 55,
        y: 35,
        title: 'Pseudohyphae',
        description:
          'These branching, elongated chains of budding yeast cells are pseudohyphae — a growth form of Candida. True hyphae have no constrictions; pseudohyphae do.',
      },
      {
        id: 'c13',
        x: 35,
        y: 60,
        title: 'Budding Spores',
        description:
          'Round to oval yeast spores (blastoconidia) bud from the pseudohyphae. Their size (3–5 µm) helps distinguish Candida from other fungal species.',
      },
      {
        id: 'c14',
        x: 70,
        y: 55,
        title: '"Shish-Kebab" Sign',
        description:
          'Squamous cells impaled along pseudohyphae — this dramatic appearance is pathognomonic of Candida infection and results from the organism penetrating between cells.',
      },
    ],
  },

  {
    id: 'inf-trich-03',
    categoryId: 'infections',
    title: 'Trichomonas vaginalis',
    imageUrl: I + 'trichomonas-pap.jpg',
    cellularFeatures: [
      'Squamous cells showing perinuclear halos',
      'Cytoplasmic vacuolization in infected cells',
    ],
    nuclearFeatures: [
      'Multinucleation may occur in reactive host cells',
      'Normal chromatin in host cells',
    ],
    backgroundFeatures: [
      'Pear-shaped or oval flagellate organisms (10–30 µm)',
      'Pale, eosinophilic cytoplasm of the organisms',
      'Red cytoplasmic granules in the organisms (specific feature)',
      'Acute inflammatory exudate with neutrophils',
    ],
    diagnosticNotes:
      'Trichomonas vaginalis is a flagellate protozoan. In Pap smears, organisms appear pear-shaped with pale cytoplasm and characteristic red cytoplasmic granules. The "leptothrix" pattern (long thin bacteria mixed with Trichomonas) is a helpful clue.',
    clinicalRelevance:
      'Trichomoniasis is the most common non-viral STI globally. It causes frothy, yellow-green vaginal discharge with vulvovaginal irritation. It increases the risk of HIV transmission and adverse pregnancy outcomes.',
    cues: [
      {
        id: 'c15',
        x: 45,
        y: 35,
        title: 'Trichomonad Organism',
        description:
          'The pear-shaped (pyriform) protozoon is 10–30 µm in size — roughly the size of an intermediate squamous cell nucleus. Its pale cytoplasm with red cytoplasmic granules is characteristic.',
      },
      {
        id: 'c16',
        x: 65,
        y: 60,
        title: 'Red Cytoplasmic Granules',
        description:
          'The eosinophilic (red) granules within the Trichomonad\'s cytoplasm are hydrogenosomes — organelles unique to this organism. Their presence distinguishes Trichomonas from degenerated cells.',
      },
    ],
  },

  {
    id: 'inf-hsv-04',
    categoryId: 'infections',
    title: 'Herpes Simplex Virus (HSV)',
    imageUrl: I + 'hsv-pap.jpg',
    cellularFeatures: [
      'Multinucleated giant cells (key finding)',
      'Nuclear molding — nuclei compressed against each other',
      '"Ground-glass" nuclear chromatin appearance',
    ],
    nuclearFeatures: [
      'Nuclear molding with jigsaw-puzzle fitting of nuclei',
      'Margination of chromatin to periphery of nucleus',
      'Central "ground-glass" homogeneous chromatin',
      'Cowdry type A inclusions (eosinophilic, surrounded by clear halo)',
    ],
    backgroundFeatures: [
      'Background may be inflammatory',
      'Necrotic debris may be present in severe cases',
    ],
    diagnosticNotes:
      'HSV cytopathic effect (CPE) in Pap smears is characterized by the classic "3 Ms": Multinucleation, Molding, and Margination (of chromatin). Cowdry type A inclusions are specific but not always present.',
    clinicalRelevance:
      'Genital herpes (HSV-2 primarily) causes painful vesicular ulcers. In immunocompromised patients and neonates, disseminated HSV infection is life-threatening. Cytological diagnosis should prompt antiviral therapy.',
    cues: [
      {
        id: 'c17',
        x: 50,
        y: 40,
        title: 'Nuclear Molding',
        description:
          'The nuclei of this multinucleated giant cell are packed tightly, conforming to each other\'s shapes like puzzle pieces — a hallmark of HSV CPE caused by viral replication within the nucleus.',
      },
      {
        id: 'c18',
        x: 30,
        y: 55,
        title: 'Ground-Glass Chromatin',
        description:
          'The homogeneous, pale, "ground-glass" appearance of the nuclear chromatin is caused by viral DNA synthesis displacing the normal chromatin pattern.',
      },
    ],
  },

  {
    id: 'inf-actino-05',
    categoryId: 'infections',
    title: 'Actinomyces israelii',
    imageUrl: I + 'normal-vs-bv.jpg',
    cellularFeatures: [
      'No specific host cell changes',
      'Inflammatory host cells may surround the colonies',
    ],
    nuclearFeatures: [
      'Host cell nuclei remain normal',
    ],
    backgroundFeatures: [
      '"Cotton ball" or "woolly ball" colonies — loose clusters of tangled filamentous bacteria',
      'Basophilic, fine filaments radiating from a central dense core ("sulfur granule"-like)',
      'Neutrophilic infiltrate surrounds colonies',
      'Dirty, inflammatory background',
    ],
    diagnosticNotes:
      'Actinomyces israelii is a gram-positive anaerobic filamentous bacterium. In Pap smears, it forms characteristic "cotton ball" or "woolly ball" colonies — loose aggregates of fine basophilic filaments. It is most commonly seen in women using intrauterine devices (IUDs), particularly for >3 years.',
    clinicalRelevance:
      'Incidental Actinomyces on Pap smear in asymptomatic IUD users requires clinical evaluation but NOT automatic IUD removal. Symptomatic patients (pelvic pain, fever, discharge) should have the IUD removed and receive prolonged antibiotics (penicillin) to prevent pelvic actinomycosis — a serious, potentially life-threatening infection.',
    cues: [
      {
        id: 'c-actino-1',
        x: 50,
        y: 40,
        title: '"Cotton Ball" Colony',
        description:
          'The loose, fluffy aggregate of tangled filamentous bacteria forming a "cotton ball" or "woolly ball" is pathognomonic of Actinomyces. Each filament is approximately 1 µm wide — finer than fungal hyphae.',
      },
      {
        id: 'c-actino-2',
        x: 25,
        y: 65,
        title: 'Radiating Filaments',
        description:
          'At higher magnification, fine basophilic filaments radiate outward from the dense central core — forming the "sulfur granule" architecture seen histologically. This architecture distinguishes Actinomyces from other filamentous organisms.',
      },
      {
        id: 'c-actino-3',
        x: 70,
        y: 60,
        title: 'Surrounding Inflammation',
        description:
          'A halo of neutrophils and inflammatory debris typically surrounds Actinomyces colonies, reflecting the host immune response to the anaerobic bacteria.',
      },
    ],
  },

  {
    id: 'inf-cmv-06',
    categoryId: 'infections',
    title: 'Cytomegalovirus (CMV)',
    imageUrl: I + 'hsv-pap.jpg',
    cellularFeatures: [
      'Single, markedly enlarged endocervical cell — NOT a multinucleated giant cell',
      'Dramatic cytomegaly: cell 2–4× normal endocervical cell size',
      'Abundant cytoplasm containing small basophilic cytoplasmic inclusions',
    ],
    nuclearFeatures: [
      'One large central "owl-eye" intranuclear inclusion',
      'Inclusion surrounded by a clear halo',
      'Peripheral rim of marginated chromatin pushed to nuclear membrane',
      'Markedly enlarged nucleus',
    ],
    backgroundFeatures: [
      'Background may show mild inflammation',
      'Surrounding cells appear entirely normal',
    ],
    diagnosticNotes:
      'CMV produces a characteristic cytopathic effect in SINGLE cells — not giant cells. The hallmark "owl-eye" appearance results from the large intranuclear DNA inclusion with peripheral chromatin margination. CMV selectively infects endocervical columnar cells, not squamous cells — distinguishing it from HPV (squamous) and HSV (squamous, multinucleated). This single-cell pattern is immediately apparent at low magnification.',
    clinicalRelevance:
      'CMV is the most common congenital viral infection worldwide — primary maternal CMV during pregnancy carries a 30–40% risk of fetal transmission, causing sensorineural hearing loss, developmental delay, and chorioretinitis. In immunocompromised patients (HIV, transplant), CMV can cause disseminated life-threatening disease.',
    cues: [
      {
        id: 'c-cmv-1',
        x: 50,
        y: 40,
        title: '"Owl-Eye" Inclusion',
        description:
          'The large, smooth, eosinophilic intranuclear inclusion surrounded by a clear halo resembles an owl\'s eye — pathognomonic for CMV. The halo represents the clear space between the inclusion and the marginated chromatin rim at the nuclear periphery.',
      },
      {
        id: 'c-cmv-2',
        x: 25,
        y: 65,
        title: 'Single Cell (vs HSV)',
        description:
          'CMV infects single cells, producing dramatic cytomegaly in one cell at a time. This single-cell infection contrasts sharply with HSV, which causes multinucleated giant cells through cell fusion — a distinction immediately apparent at low magnification.',
      },
      {
        id: 'c-cmv-3',
        x: 70,
        y: 60,
        title: 'Cytoplasmic Inclusions',
        description:
          'Small, punctate basophilic inclusions in the cytoplasm represent CMV particles maturing within cytoplasmic organelles — a specific feature that differentiates CMV from other large-cell nuclear inclusions.',
      },
    ],
  },

  {
    id: 'inf-leptothrix-07',
    categoryId: 'infections',
    title: 'Leptothrix (Long Filamentous Bacteria)',
    imageUrl: I + 'normal-vs-bv.jpg',
    cellularFeatures: [
      'Host squamous cells are otherwise normal',
      'Minor reactive changes may occur if Trichomonas co-exists',
    ],
    nuclearFeatures: [
      'Host cell nuclei remain completely normal',
    ],
    backgroundFeatures: [
      'Extremely long, thin, filamentous bacteria — far longer than Lactobacillus rods',
      'Filaments appear singly or in tangled masses in the background',
      'Filaments may reach 100–200 µm long — very striking at low power',
      'Commonly co-exists with Trichomonas vaginalis ("leptothrix pattern")',
    ],
    diagnosticNotes:
      'Leptothrix is a non-pathogenic anaerobic filamentous bacterium found in the lower female genital tract. Its clinical importance lies in its association with Trichomonas vaginalis — the "leptothrix pattern" of extremely long filamentous bacteria alongside Trichomonas organisms is a well-recognized cytological finding. Leptothrix alone does not cause clinical disease and requires no treatment. Its presence should always prompt careful search for Trichomonas organisms.',
    clinicalRelevance:
      'When Leptothrix is identified in a Pap smear, systematically examine the entire smear for Trichomonas organisms (pear-shaped, 10–30 µm, red cytoplasmic granules). The co-occurrence rate with Trichomonas is approximately 50%. Treating the Trichomonas infection also resolves Leptothrix carriage.',
    cues: [
      {
        id: 'c-lept-1',
        x: 50,
        y: 40,
        title: 'Extremely Long Filamentous Bacteria',
        description:
          'Leptothrix filaments are remarkably long — often 100–200 µm, compared to 2–5 µm for Lactobacillus. At low power, they appear as long, tangled threads in the background, which is often the first feature to catch the eye when scanning the slide.',
      },
      {
        id: 'c-lept-2',
        x: 30,
        y: 65,
        title: 'Association with Trichomonas',
        description:
          'Leptothrix is a clue to look for Trichomonas. The pear-shaped Trichomonas organisms with red cytoplasmic granules may be subtle and easy to miss — finding Leptothrix should trigger a systematic high-magnification search throughout the smear before reporting.',
      },
    ],
  },

  // ─── BENIGN CELLULAR CHANGES ──────────────────────────────────────────────────

  {
    id: 'benign-react-01',
    categoryId: 'benign',
    title: 'Reactive Changes — Inflammation',
    imageUrl: B + 'reactive-changes.jpg',
    cellularFeatures: [
      'Enlarged cells with abundant cytoplasm',
      'Perinuclear halos (cytoplasmic vacuolization around nucleus)',
      'Polychromasia (variation in cytoplasmic staining)',
    ],
    nuclearFeatures: [
      'Nuclear enlargement (2–3× normal size)',
      'Smooth nuclear membranes',
      'Prominent nucleoli (macronucleoli)',
      'Open, vesicular chromatin — NOT coarse or irregular',
    ],
    backgroundFeatures: [
      'Acute inflammatory cells (neutrophils)',
      'May show cellular debris and mucus',
    ],
    diagnosticNotes:
      'Reactive changes are the hallmark of benign cellular response to injury. Key: nuclear membranes remain smooth and regular. Nucleoli are prominent but chromatin is NOT coarse — this differentiates reactive from dysplastic changes.',
    clinicalRelevance:
      'Reactive changes are associated with cervicitis (Chlamydia, Neisseria, non-specific), IUD use, radiation, or postpartum changes. Correlation with clinical history is essential.',
    cues: [
      {
        id: 'c19',
        x: 50,
        y: 40,
        title: 'Prominent Nucleolus',
        description:
          'The large, cherry-red nucleolus indicates active RNA synthesis as the cell responds to injury or inflammation. This is a BENIGN reactive feature — not to be confused with malignancy.',
      },
      {
        id: 'c20',
        x: 70,
        y: 60,
        title: 'Perinuclear Halo',
        description:
          'This clear halo around the nucleus (not to be confused with HPV-related koilocytosis) is caused by cytoplasmic vacuolization due to cellular edema from inflammation.',
      },
    ],
  },

  {
    id: 'benign-iud-02',
    categoryId: 'benign',
    title: 'IUD-Related Changes',
    imageUrl: B + 'reactive-changes.jpg',
    cellularFeatures: [
      'Small clusters of glandular-like cells',
      'Vacuolated cytoplasm with intracytoplasmic vacuoles',
      '"Exodus" pattern — small clusters of cells with neutrophils',
    ],
    nuclearFeatures: [
      'Nuclear enlargement with prominent nucleoli',
      'Degenerative nuclear changes (pyknosis, karyorrhexis)',
    ],
    backgroundFeatures: [
      'Inflammatory background',
      'Mucus and debris',
    ],
    diagnosticNotes:
      'IUD-related cellular changes can mimic glandular abnormalities. The key clue is the clinical history of IUD use. Cells appear in small, tight clusters with abundant intracytoplasmic vacuoles.',
    clinicalRelevance:
      'IUD-related changes can be misinterpreted as atypical glandular cells (AGC) if IUD history is unknown. Clinical correlation is essential to avoid unnecessary colposcopy.',
    cues: [
      {
        id: 'c21',
        x: 50,
        y: 45,
        title: 'Vacuolated Glandular Cells',
        description:
          'These small cells with abundant intracytoplasmic vacuoles mimic glandular abnormalities but represent a benign reaction to the IUD foreign body.',
      },
    ],
  },

  {
    id: 'benign-radiation-03',
    categoryId: 'benign',
    title: 'Radiation Changes',
    imageUrl: S + 'lsil-pap.jpg',
    cellularFeatures: [
      'Markedly enlarged cells (cytomegaly)',
      'Bizarre cell shapes and multinucleation',
      'Abundant, vacuolated cytoplasm with "polychromasia"',
    ],
    nuclearFeatures: [
      'Nuclear enlargement proportional to cytomegaly (N/C ratio maintained)',
      'Wrinkling and degeneration of nuclear membrane',
      'Cytoplasmic vacuoles may invade the nucleus (cytoplasmic invagination)',
    ],
    backgroundFeatures: [
      'Clean or mildly inflammatory background',
    ],
    diagnosticNotes:
      'Radiation-induced changes can be acute (within weeks) or chronic (years later). The key differentiating feature from malignancy is that despite marked cellular enlargement, the N/C ratio remains LOW.',
    clinicalRelevance:
      'Recognition of radiation changes prevents false-positive diagnoses of malignancy in patients with prior pelvic radiation. These findings should be correlated with the patient\'s radiation history.',
    cues: [
      {
        id: 'c22',
        x: 50,
        y: 40,
        title: 'Cytomegaly with Low N/C Ratio',
        description:
          'Although the cell is enormously enlarged, the nucleus enlarges proportionally — maintaining a LOW N/C ratio. This is the KEY feature distinguishing radiation changes from malignancy.',
      },
    ],
  },

  {
    id: 'benign-atrophy-04',
    categoryId: 'benign',
    title: 'Atrophic Pattern',
    imageUrl: N + 'parabasal-cells.jpg',
    cellularFeatures: [
      'Predominance of small parabasal-type cells',
      'Cells appear in loose sheets or individually',
      '"Blue blobs" — structureless, pale, degenerated cellular remnants',
    ],
    nuclearFeatures: [
      'Round, smooth nuclei with fine chromatin',
      'Karyorrhexis (nuclear fragmentation) in degenerated cells',
      'Naked nuclei scattered in background',
    ],
    backgroundFeatures: [
      'Granular, dirty background from cellular debris (pseudo-diathesis)',
      'Acute inflammation may be present (atrophic vaginitis)',
      'Absence of Lactobacillus (atrophic environment)',
    ],
    diagnosticNotes:
      'Atrophic smears are challenging — the cellular debris creates a "pseudo-diathesis" background that can mimic invasive carcinoma, and the small parabasal cells can mimic HSIL. The KEY distinguishing features are: SMOOTH nuclei with FINE chromatin, no true N/C ratio increase (nuclei are small), and clinical context of post-menopause or hypoestrogenic state.',
    clinicalRelevance:
      'Atrophic smears may be reported as "unsatisfactory" or result in equivocal interpretations. A repeat smear after 2–3 weeks of topical estrogen therapy allows cells to mature, greatly improving smear quality and diagnostic accuracy.',
    cues: [
      {
        id: 'c-atr-1',
        x: 50,
        y: 35,
        title: 'Pseudo-Diathesis Background',
        description:
          'The granular, debris-filled background mimics a tumor diathesis but is actually caused by cellular degeneration in an atrophic, thin epithelium. Clinical correlation (post-menopausal status) is essential to avoid a false diagnosis of carcinoma.',
      },
      {
        id: 'c-atr-2',
        x: 30,
        y: 60,
        title: '"Blue Blob"',
        description:
          'These structureless, pale-blue remnants are degenerated parabasal cells that have lost their nuclear detail. They are a hallmark of atrophic smears and must not be misinterpreted as malignant cells.',
      },
      {
        id: 'c-atr-3',
        x: 70,
        y: 65,
        title: 'Fine Chromatin (vs HSIL)',
        description:
          'Even when parabasal cells appear small with high N/C ratios (similar to HSIL), their chromatin is FINE and EVENLY distributed — not coarse or irregularly clumped as in true HSIL.',
      },
    ],
  },

  {
    id: 'benign-repair-05',
    categoryId: 'benign',
    title: 'Repair Pattern (Regeneration)',
    imageUrl: B + 'reactive-changes.jpg',
    cellularFeatures: [
      'Squamous cells in flat, cohesive sheets with "streaming" (directional alignment)',
      'Cytoplasm is abundant and well-defined',
      'Sheets may contain occasional normal mitotic figures',
    ],
    nuclearFeatures: [
      'Nuclear enlargement — may be dramatic',
      'PROMINENT MACRONUCLEOLI — large, cherry-red, may resemble adenocarcinoma',
      'Open, vesicular chromatin — critically FINE, NOT coarse',
      'SMOOTH nuclear membranes — key feature distinguishing from malignancy',
    ],
    backgroundFeatures: [
      'Often contains fresh blood or inflammatory debris from recent injury',
      'No tumor diathesis',
      'Inflammatory cells may be present',
    ],
    diagnosticNotes:
      'Repair (regeneration) pattern is a benign cellular response to epithelial injury — post-biopsy, post-instrumentation, post-cautery, or post-radiation. It is one of the most alarming-appearing benign conditions in cytology: MACRONUCLEOLI can be enormous, rivaling those of adenocarcinoma. The KEY differentiating features are: (1) SMOOTH nuclear membranes, (2) FINE, OPEN chromatin, and (3) the "streaming" pattern of cohesive sheets aligned in one direction.',
    clinicalRelevance:
      'Misinterpreting repair as adenocarcinoma leads to unnecessary radical procedures. Clinical context (recent cervical biopsy, LEEP, cautery) is essential. The Bethesda System classifies typical repair under "Negative for intraepithelial lesion or malignancy (NILM)."',
    cues: [
      {
        id: 'c-rep-1',
        x: 50,
        y: 35,
        title: 'Prominent Macronucleolus',
        description:
          'The macronucleolus (large, bright-red nucleolus) in repair can be huge — sometimes the most prominent feature in the smear. Despite its alarming size, the surrounding chromatin is FINE and OPEN, and the nuclear membrane is SMOOTH — both excluding malignancy.',
      },
      {
        id: 'c-rep-2',
        x: 30,
        y: 60,
        title: '"Streaming" in Flat Sheets',
        description:
          'Cells in repair align themselves in a directional pattern ("streaming") within flat, cohesive sheets. This tissue-paper-flat arrangement with streaming is characteristic of the regenerative pattern — malignant cells tend to pile up in 3D clusters or appear individually.',
      },
      {
        id: 'c-rep-3',
        x: 70,
        y: 65,
        title: 'Smooth Nuclear Membrane',
        description:
          'Despite nuclear enlargement and prominent nucleoli, the nuclear membrane in repair is SMOOTH and REGULAR — a critical distinction from HSIL or carcinoma, where the membrane is irregular, notched, or coarsely lobulated.',
      },
    ],
  },

  {
    id: 'benign-follicular-06',
    categoryId: 'benign',
    title: 'Follicular Cervicitis',
    imageUrl: B + 'reactive-changes.jpg',
    cellularFeatures: [
      'Background squamous cells are entirely normal — no dysplasia',
      'Lymphoid aggregates with cellular heterogeneity',
      'Epithelioid histiocytes may be present at periphery',
    ],
    nuclearFeatures: [
      'Mixed lymphoid population: small mature lymphocytes, large transformed lymphocytes, and immunoblasts',
      'Plasma cells with eccentric nuclei and "clock-face" chromatin',
      'Tingible-body macrophages with phagocytosed nuclear debris',
    ],
    backgroundFeatures: [
      '"Starry sky" appearance from tingible-body macrophages within lymphoid aggregates',
      'Lymphoglandular bodies (stripped lymphocyte cytoplasm) in background',
      'Mixed inflammatory background',
    ],
    diagnosticNotes:
      'Follicular cervicitis represents reactive germinal center formation in the cervical stroma, visible in Pap smears as lymphoid aggregates. The characteristic feature is the MIXED cell population — small lymphocytes, large transformed lymphocytes, plasma cells, and tingible-body macrophages creating the "starry sky" appearance. This MIXED population is the key feature distinguishing follicular cervicitis from LYMPHOMA, which shows a MONOMORPHIC population.',
    clinicalRelevance:
      'Follicular cervicitis is classically associated with Chlamydia trachomatis — the most prevalent bacterial STI globally. Identification of follicular cervicitis in a Pap smear should prompt NAAT (nucleic acid amplification test) testing for Chlamydia. Early treatment prevents PID, tubal occlusion, and infertility.',
    cues: [
      {
        id: 'c-foll-1',
        x: 50,
        y: 35,
        title: '"Starry Sky" Pattern',
        description:
          'Tingible-body macrophages (large pale histiocytes with phagocytosed nuclear debris) are scattered among the lymphoid aggregate — creating a "starry sky" appearance against the darker lymphoid background. This reflects active germinal center formation.',
      },
      {
        id: 'c-foll-2',
        x: 25,
        y: 65,
        title: 'Mixed Lymphoid Population',
        description:
          'The aggregate contains small mature lymphocytes AND large transformed lymphocytes AND plasma cells — confirming REACTIVE germinal center formation, not lymphoma. A monotonous single-cell-type population would raise concern for lymphoma.',
      },
      {
        id: 'c-foll-3',
        x: 70,
        y: 60,
        title: 'Lymphoglandular Bodies',
        description:
          'Small, round, pale-blue droplets in the background are lymphoglandular bodies — stripped fragments of lymphocyte cytoplasm. Their presence strongly suggests a lymphoid process and is a helpful low-power clue.',
      },
    ],
  },

  {
    id: 'benign-postpartum-07',
    categoryId: 'benign',
    title: 'Postpartum & Lactational Changes',
    imageUrl: N + 'parabasal-cells.jpg',
    cellularFeatures: [
      'Predominance of small, round parabasal-type cells',
      'Decidual cells may be present in early postpartum period',
      'Lactational changes: vacuolated cytoplasm in glandular cells',
    ],
    nuclearFeatures: [
      'Parabasal cells: round nuclei with FINE, EVEN chromatin',
      'SMOOTH nuclear membranes — distinguishing from HSIL',
      'Nuclei may show degenerative changes (karyorrhexis)',
    ],
    backgroundFeatures: [
      'Inflammatory background common (post-delivery cervicitis)',
      'Granular debris from cytolysis',
      '"Blue blobs" (degenerated cells) may be present',
    ],
    diagnosticNotes:
      'Postpartum and lactational smears are characterized by profound hypoestrogenism — progesterone and prolactin suppress estrogen production, resulting in an atrophic-type smear dominated by parabasal cells. This pattern can persist throughout lactation and is cytologically identical to a post-menopausal atrophic smear. It can MIMIC HSIL — the KEY differentiating features are: smooth nuclei with fine chromatin, and the clinical context of recent delivery or lactation.',
    clinicalRelevance:
      'Pap smears during the first 8–12 weeks postpartum are difficult to interpret. The Bethesda System advises deferring cervical screening until at least 12 weeks after delivery. When a postpartum smear is required, the atrophic pattern should be recognized as physiological.',
    cues: [
      {
        id: 'c-pp-1',
        x: 50,
        y: 35,
        title: 'Parabasal Cell Predominance',
        description:
          'The hypoestrogenic state of lactation leads to a smear dominated by small, round parabasal cells. The nuclei are SMOOTH with FINE chromatin — essential features that distinguish this from HSIL, which has coarse, irregular chromatin.',
      },
      {
        id: 'c-pp-2',
        x: 25,
        y: 65,
        title: 'Degenerative Background',
        description:
          'Cytolysis and cell degeneration in the hypoestrogenic environment produce a background of granular debris and "blue blobs." This pseudo-diathesis can be alarming but is entirely benign — clinical context (recent delivery, breastfeeding) is the key to correct interpretation.',
      },
      {
        id: 'c-pp-3',
        x: 70,
        y: 55,
        title: 'Decidual Cell',
        description:
          'Large, polygonal stromal cells with pale, abundant cytoplasm and small central nuclei — decidual cells — may occasionally shed into the smear in the early postpartum period. They should not be misidentified as malignant cells despite their striking appearance.',
      },
    ],
  },

  // ─── SQUAMOUS ABNORMALITIES ────────────────────────────────────────────────────

  {
    id: 'sq-ascus-01',
    categoryId: 'squamous',
    title: 'ASC-US (Atypical Squamous Cells of Undetermined Significance)',
    imageUrl: S + 'pap-abnormal.jpg',
    cellularFeatures: [
      'Squamous cells with nuclear changes exceeding reactive changes',
      'Changes insufficient for definitive LSIL diagnosis',
      'Cells are similar in size to intermediate squamous cells',
    ],
    nuclearFeatures: [
      'Nuclear enlargement 2.5–3× normal intermediate cell nucleus',
      'Mild hyperchromasia',
      'Slight irregularity of nuclear membrane',
      'N/C ratio slightly increased',
    ],
    backgroundFeatures: [
      'Variable — may be clean or inflammatory',
    ],
    diagnosticNotes:
      'ASC-US is the most common abnormal Pap result. It represents an equivocal category — changes are beyond reactive but insufficient for LSIL. The underlying pathology ranges from HPV infection to reactive changes to true LSIL.',
    clinicalRelevance:
      'Management: reflex HPV testing is the preferred approach. HPV-positive ASC-US proceeds to colposcopy. HPV-negative results allow return to routine screening. This category prevents both over- and under-treatment.',
    cues: [
      {
        id: 'c23',
        x: 50,
        y: 40,
        title: 'Mild Nuclear Enlargement',
        description:
          'The nucleus is approximately 3× the size of a normal intermediate cell nucleus — exceeding reactive changes but not meeting the full criteria for LSIL. This is the "borderline" zone.',
      },
      {
        id: 'c24',
        x: 30,
        y: 60,
        title: 'Slight Membrane Irregularity',
        description:
          'Minor irregularity of the nuclear membrane is present, hinting at an underlying HPV effect, but is insufficient to qualify as the definitive koilocytosis of LSIL.',
      },
    ],
  },

  {
    id: 'sq-lsil-02',
    categoryId: 'squamous',
    title: 'LSIL (Low-Grade Squamous Intraepithelial Lesion)',
    imageUrl: S + 'koilocyte-hpv.jpg',
    cellularFeatures: [
      'Cells similar in size to superficial/intermediate squamous cells',
      'Koilocytes: squamous cells with perinuclear halos',
      'Cytoplasmic border of halo is sharp and irregular (not smooth)',
    ],
    nuclearFeatures: [
      'Nuclear enlargement >3× normal intermediate cell nucleus',
      'Moderate hyperchromasia',
      'Irregular, wrinkled (raisin-like) nuclear membranes',
      'Binucleation or multinucleation common',
    ],
    backgroundFeatures: [
      'Background may show normal flora',
      'No tumor diathesis',
    ],
    diagnosticNotes:
      'LSIL corresponds to CIN 1 (mild dysplasia) and is most commonly caused by HPV infection. The koilocyte — a squamous cell with a well-defined perinuclear cavity and an enlarged, irregular nucleus — is the hallmark cytological feature.',
    clinicalRelevance:
      'LSIL has a high rate of spontaneous regression (approximately 60% within 2 years). Management involves colposcopy. In adolescents, conservative management with repeat cytology is appropriate given high regression rates.',
    cues: [
      {
        id: 'c25',
        x: 50,
        y: 35,
        title: 'Koilocyte — Perinuclear Halo',
        description:
          'This is the pathognomonic cell of HPV infection. The perinuclear cavity (halo) with a sharp, irregular outer border represents viral cytopathic effect — the virus replaces the cytoplasm near the nucleus.',
      },
      {
        id: 'c26',
        x: 70,
        y: 55,
        title: 'Raisin-Like Nucleus',
        description:
          'The nucleus is enlarged, hyperchromatic, and has an irregular, wrinkled membrane — resembling a raisin. Binucleation is common, reflecting viral-induced cell cycle dysregulation.',
      },
    ],
  },

  {
    id: 'sq-hsil-03',
    categoryId: 'squamous',
    title: 'HSIL (High-Grade Squamous Intraepithelial Lesion)',
    imageUrl: S + 'cin1-thinprep.jpg',
    cellularFeatures: [
      'Smaller cells than LSIL — similar to parabasal or metaplastic cells',
      'High N/C ratio (>50%)',
      'Cells may appear in clusters, sheets, or individually',
    ],
    nuclearFeatures: [
      'Marked nuclear enlargement and hyperchromasia',
      'Coarse, irregularly distributed chromatin',
      'Marked irregular nuclear membranes',
      'Nucleoli typically absent (unlike reactive changes)',
    ],
    backgroundFeatures: [
      'Background may be clean or inflammatory',
      'No tumor diathesis in pure HSIL (diathesis suggests carcinoma)',
    ],
    diagnosticNotes:
      'HSIL corresponds to CIN 2 and CIN 3 (moderate/severe dysplasia and carcinoma in situ). The critical difference from LSIL: HSIL cells are SMALLER with a very HIGH N/C ratio. Nucleoli are absent. Coarse chromatin is key.',
    clinicalRelevance:
      'HSIL requires immediate colposcopy and biopsy. If confirmed CIN 2/3, treatment by LEEP or cold knife conization is indicated. HSIL has a significant risk of progression to invasive carcinoma if untreated.',
    cues: [
      {
        id: 'c27',
        x: 45,
        y: 35,
        title: 'Very High N/C Ratio',
        description:
          'The nucleus occupies >50% of the cell — the cytoplasm is "scant." This is the most critical feature of HSIL and reflects the near-complete loss of cytoplasmic differentiation.',
      },
      {
        id: 'c28',
        x: 65,
        y: 55,
        title: 'Coarse, Irregular Chromatin',
        description:
          'The chromatin is coarsely granular and irregularly distributed — described as "salt and pepper" or "cracked glass" pattern. This contrasts with the fine chromatin of reactive cells.',
      },
    ],
  },

  {
    id: 'sq-scc-04',
    categoryId: 'squamous',
    title: 'Squamous Cell Carcinoma (SCC)',
    imageUrl: S + 'hsil-thinprep.jpg',
    cellularFeatures: [
      'Markedly pleomorphic cells — "tadpole" or "fiber" cell shapes',
      'Cells may appear individually or in clusters',
      'Malignant diathesis in background (key feature)',
    ],
    nuclearFeatures: [
      'Extreme nuclear enlargement and pleomorphism',
      'Macronucleoli may be present (especially in non-keratinizing SCC)',
      'Very coarse, irregular chromatin',
      'Abnormal mitotic figures',
    ],
    backgroundFeatures: [
      'TUMOR DIATHESIS: granular, bloody background with necrotic debris',
      'This "dirty background" is a cardinal feature of invasive carcinoma',
    ],
    diagnosticNotes:
      'Squamous cell carcinoma shows a spectrum from keratinizing (bizarre "tadpole" cells, dense eosinophilic cytoplasm, no nucleoli) to non-keratinizing (less bizarre, irregular sheets, prominent nucleoli). The tumor diathesis is the KEY distinguishing feature from HSIL.',
    clinicalRelevance:
      'Cervical SCC is almost entirely caused by persistent high-risk HPV infection (HPV 16 and 18 account for ~70%). Early detection by Pap screening is crucial — microinvasive SCC caught at stage IA1 has near-100% 5-year survival.',
    cues: [
      {
        id: 'c29',
        x: 40,
        y: 35,
        title: 'Tumor Diathesis',
        description:
          'The granular, eosinophilic, "dirty" background of necrotic debris and lysed blood is the tumor diathesis — a hallmark of INVASIVE carcinoma. Its presence upgrades the diagnosis from HSIL to malignancy.',
      },
      {
        id: 'c30',
        x: 65,
        y: 50,
        title: '"Tadpole" Keratinizing Cell',
        description:
          'This bizarre elongated cell with dense orange cytoplasm (keratinization) represents a malignant squamous cell undergoing abnormal keratinization — a feature of well-differentiated keratinizing SCC.',
      },
    ],
  },

  {
    id: 'sq-ascH-05',
    categoryId: 'squamous',
    title: 'ASC-H (Atypical Squamous Cells — Cannot Exclude HSIL)',
    imageUrl: S + 'lsil-pap.jpg',
    cellularFeatures: [
      'Small, atypical squamous cells with scant cytoplasm',
      'Similar in size to metaplastic or parabasal cells',
      'Number of atypical cells insufficient for definitive HSIL',
    ],
    nuclearFeatures: [
      'High N/C ratio resembling HSIL',
      'Nuclear hyperchromasia and irregularity',
      'Chromatin may be granular or coarse, but not meeting HSIL criteria',
    ],
    backgroundFeatures: [
      'Variable background',
      'No tumor diathesis',
    ],
    diagnosticNotes:
      'ASC-H is used when a small number of atypical cells with features suggesting HSIL are present, but the sample is insufficient to make a definitive HSIL call. This may reflect true HSIL, immature metaplasia, atrophy, or repair. ASC-H carries a ~24–94% CIN 2+ risk in studies.',
    clinicalRelevance:
      'Unlike ASC-US (which uses reflex HPV testing), ASC-H is managed by DIRECT COLPOSCOPY — no HPV reflex step is needed. The high risk of underlying CIN 2/3 makes immediate colposcopy mandatory regardless of HPV status.',
    cues: [
      {
        id: 'c-ascH-1',
        x: 50,
        y: 35,
        title: 'Small Cells with High N/C Ratio',
        description:
          'The atypical cells are SMALL — unlike ASC-US cells which are large (superficial/intermediate size). The high N/C ratio and nuclear atypia suggest HSIL, but the cells are too few or atypical to make a definitive HSIL call.',
      },
      {
        id: 'c-ascH-2',
        x: 30,
        y: 65,
        title: 'Nuclear Hyperchromasia',
        description:
          'The nucleus is darker than a reactive or metaplastic cell, with granular chromatin showing early coarsening — insufficient for definitive HSIL, but exceeding the threshold for ASC-US.',
      },
    ],
  },

  {
    id: 'sq-microinvasive-06',
    categoryId: 'squamous',
    title: 'Early Invasion — Microinvasive SCC',
    imageUrl: S + 'pap-abnormal.jpg',
    cellularFeatures: [
      'Background HSIL-type cells with very high N/C ratio',
      'Individual pleomorphic cells shed from the surface',
      'Early keratinization may appear in some cells',
    ],
    nuclearFeatures: [
      'Coarse, irregular chromatin',
      'Macronucleoli may begin to emerge (absent in pure HSIL)',
      'Irregular nuclear membranes',
    ],
    backgroundFeatures: [
      'EARLY tumor diathesis — subtle granular necrotic material in background',
      'Lysed red blood cells may begin to appear',
      'Even subtle diathesis indicates invasion — the background is the key finding',
    ],
    diagnosticNotes:
      'Early (microinvasive) SCC marks the transition from intraepithelial (HSIL) to invasive disease. The smear may still be dominated by HSIL-type cells, but the EMERGENCE OF TUMOR DIATHESIS — even subtle granular necrotic material — is the critical signal of stromal invasion. Macronucleoli may begin to appear (absent in pure HSIL). Microinvasion is defined histologically as invasion ≤3 mm depth and ≤7 mm horizontal extent (FIGO Stage IA1).',
    clinicalRelevance:
      'Microinvasive SCC (FIGO IA1) can be treated by cone biopsy with clear margins, potentially avoiding radical hysterectomy in women who wish to preserve fertility. Recognizing even subtle diathesis changes management from LEEP/cone biopsy (HSIL) to urgent colposcopy + biopsy + staging (invasive carcinoma).',
    cues: [
      {
        id: 'c-micro-1',
        x: 40,
        y: 35,
        title: 'Subtle Early Tumor Diathesis',
        description:
          'The granular, eosinophilic necrotic material in the background is subtle but present — this is the earliest cytological signal of stromal invasion. In pure HSIL the background is completely clean. Any background necrosis should prompt careful assessment for invasion.',
      },
      {
        id: 'c-micro-2',
        x: 65,
        y: 50,
        title: 'Emerging Macronucleolus',
        description:
          'A macronucleolus beginning to appear in cells that otherwise resemble HSIL is an early indicator of invasion. Pure HSIL lacks nucleoli — their appearance signals that the cell is no longer confined to the epithelium.',
      },
      {
        id: 'c-micro-3',
        x: 30,
        y: 70,
        title: 'Dominant HSIL Background Cells',
        description:
          'Typical HSIL cells (small, high N/C, coarse chromatin, no nucleoli) remain the dominant cell type — microinvasive SCC is not yet dominated by obviously malignant cells. Careful attention to the background is essential to upgrade the diagnosis.',
      },
    ],
  },

  // ─── GLANDULAR ABNORMALITIES ─────────────────────────────────────────────────

  {
    id: 'gland-agc-01',
    categoryId: 'glandular',
    title: 'Atypical Glandular Cells (AGC)',
    imageUrl: G + 'cervical-ais.jpg',
    cellularFeatures: [
      'Columnar or cuboidal cells with abnormal features',
      'Cells in strips, sheets, or three-dimensional clusters',
      'Loss of normal honeycomb arrangement',
    ],
    nuclearFeatures: [
      'Nuclear enlargement and stratification within cell strips',
      'Mild-to-moderate nuclear pleomorphism',
      'Nuclear crowding with overlapping',
      'Prominent nucleoli in some cases',
    ],
    backgroundFeatures: [
      'Background may be clean or show slight inflammation',
    ],
    diagnosticNotes:
      'AGC is a heterogeneous category encompassing endocervical origin (favor neoplastic) and endometrial origin. The key cytological features are nuclear crowding, stratification, and overlapping in glandular cell clusters — beyond reactive but below adenocarcinoma.',
    clinicalRelevance:
      'AGC carries a significant risk of underlying pathology (up to 30–50% associated with neoplasia). Management requires colposcopy, endocervical curettage, and endometrial sampling in women ≥35 years. AGC-FN (favor neoplastic) has the highest risk.',
    cues: [
      {
        id: 'c31',
        x: 50,
        y: 40,
        title: 'Nuclear Crowding & Stratification',
        description:
          'Unlike normal endocervical cells arranged in a flat honeycomb, AGC cells show nuclei that are crowded, stratified (layered), and overlapping — reflecting dysregulated cellular architecture.',
      },
      {
        id: 'c32',
        x: 30,
        y: 65,
        title: 'Feathering',
        description:
          'The irregular, "feathery" border at the edge of this cell cluster — where nuclei protrude beyond the cytoplasmic border — is a characteristic feature of endocervical glandular abnormality.',
      },
    ],
  },

  {
    id: 'gland-ais-02',
    categoryId: 'glandular',
    title: 'Adenocarcinoma In Situ (AIS)',
    imageUrl: G + 'cervical-ais.jpg',
    cellularFeatures: [
      '"Feathering" — nuclear palisading at cluster edges',
      'Rosette formation (cells arranged in circular clusters)',
      'Strips of cells with pseudostratified nuclei',
    ],
    nuclearFeatures: [
      'Marked nuclear enlargement and hyperchromasia',
      'Coarse, evenly distributed chromatin',
      'Nuclear stratification (multilayered) within cell strips',
      'Apoptotic bodies (single-cell necrosis)',
    ],
    backgroundFeatures: [
      'Clean background (important — distinguishes from invasive adenocarcinoma)',
    ],
    diagnosticNotes:
      'AIS is the precursor lesion to invasive endocervical adenocarcinoma. It is strongly associated with HPV 18. Key cytological features: feathering, rosettes, pseudostratification, apoptotic bodies, and — critically — a CLEAN background (no diathesis).',
    clinicalRelevance:
      'AIS is managed by excision (LEEP or CKC). A clean surgical margin does not guarantee complete excision due to skip lesions. AIS is increasingly recognized as Pap screening detects glandular lesions earlier.',
    cues: [
      {
        id: 'c33',
        x: 50,
        y: 35,
        title: '"Feathering" at Cell Edge',
        description:
          'Nuclei protrude beyond the cytoplasmic membrane at the periphery of the cluster — this "feathering" or nuclear palisading is pathognomonic of endocervical glandular neoplasia.',
      },
      {
        id: 'c34',
        x: 70,
        y: 60,
        title: 'Apoptotic Body',
        description:
          'Single necrotic cells within or adjacent to clusters represent apoptosis — a hallmark of high-grade glandular lesions and a key differentiating feature from reactive glandular changes.',
      },
    ],
  },

  {
    id: 'gland-adeno-03',
    categoryId: 'glandular',
    title: 'Invasive Endocervical Adenocarcinoma',
    imageUrl: G + 'cervical-ais.jpg',
    cellularFeatures: [
      'Markedly pleomorphic glandular cells',
      'Three-dimensional clusters with irregular borders',
      'Individual tumor cells shed into background',
    ],
    nuclearFeatures: [
      'Marked nuclear pleomorphism and hyperchromasia',
      'Macronucleoli — large, prominent nucleoli',
      'Abnormal mitotic figures',
      'Extreme nuclear membrane irregularity',
    ],
    backgroundFeatures: [
      'TUMOR DIATHESIS: watery, granular background with necrosis',
      'Lysed red blood cells in background',
    ],
    diagnosticNotes:
      'Invasive endocervical adenocarcinoma shows all features of AIS but with additional markers of invasion: tumor diathesis (watery necrotic background), macronucleoli, and extreme pleomorphism.',
    clinicalRelevance:
      'Endocervical adenocarcinoma accounts for approximately 25% of all cervical carcinomas, and its incidence is rising relative to squamous carcinoma. HPV 18 is the predominant type. Treatment depends on stage — surgery for early disease, chemoradiotherapy for advanced disease.',
    cues: [
      {
        id: 'c35',
        x: 40,
        y: 35,
        title: 'Macronucleolus',
        description:
          'The prominent, cherry-red nucleolus (macronucleolus) is a feature of invasive adenocarcinoma not typically seen in AIS. It reflects the intense RNA synthesis of rapidly dividing malignant cells.',
      },
      {
        id: 'c36',
        x: 65,
        y: 60,
        title: 'Watery Tumor Diathesis',
        description:
          'The pale, watery, granular background of necrotic debris distinguishes invasive adenocarcinoma from AIS, which has a clean background. This is the cytological signature of stromal invasion.',
      },
    ],
  },

  {
    id: 'gland-endo-04',
    categoryId: 'glandular',
    title: 'Normal Endometrial Cells',
    imageUrl: N + 'endocervical-cells2.jpg',
    cellularFeatures: [
      'Small, tight three-dimensional clusters ("lemon drops" or "exodus" pattern)',
      'Cells are smaller than endocervical cells',
      'Scant cytoplasm, often with vacuolation',
    ],
    nuclearFeatures: [
      'Small, round, hyperchromatic nuclei',
      'Nuclear molding within tight clusters',
      'Minimal nuclear pleomorphism',
    ],
    backgroundFeatures: [
      'Clean background',
      'Neutrophils may be incorporated into the clusters (typical of exodus)',
    ],
    diagnosticNotes:
      'Normal endometrial cells are shed during the first 12 days of the menstrual cycle and appear as tight, three-dimensional clusters. Their presence is a NORMAL finding in women under 45 years during the first half of the cycle. The key feature distinguishing normal endometrial cells from AGC is their small size, tight clustering, and NORMAL nuclear features.',
    clinicalRelevance:
      'In women ≥45 years or postmenopausal: endometrial cells in a Pap smear should be REPORTED under the 2014 Bethesda System, as they may represent endometrial pathology (hyperplasia or carcinoma). Endometrial sampling (biopsy or D&C) is warranted in this age group.',
    cues: [
      {
        id: 'c-endo-1',
        x: 50,
        y: 40,
        title: '"Lemon Drop" Cluster',
        description:
          'The tight, three-dimensional ball of small cells — resembling a lemon drop candy — is characteristic of normal endometrial cells. The cells are smaller than endocervical cells with much less cytoplasm.',
      },
      {
        id: 'c-endo-2',
        x: 30,
        y: 65,
        title: 'Small Hyperchromatic Nuclei',
        description:
          'The nuclei are small and hyperchromatic, but uniform — without the coarse chromatin, stratification, or feathering of AGC/AIS. This uniformity within the cluster is the key to recognising them as normal.',
      },
      {
        id: 'c-endo-3',
        x: 70,
        y: 55,
        title: 'Incorporated Neutrophils',
        description:
          'Neutrophils incorporated within the endometrial cell cluster form the "exodus" pattern — a helpful clue that these cells are of endometrial origin rather than endocervical.',
      },
    ],
  },

  {
    id: 'gland-endometrial-adeno-05',
    categoryId: 'glandular',
    title: 'Endometrial Adenocarcinoma in Pap Smear',
    imageUrl: G + 'cervical-ais.jpg',
    cellularFeatures: [
      'Small to medium-sized cells in tight three-dimensional clusters',
      'Cells smaller than endocervical cells — helpful low-power discriminator',
      'Vacuolated cytoplasm with intracytoplasmic vacuoles containing mucin or neutrophils',
    ],
    nuclearFeatures: [
      'Nuclear enlargement with mild-to-moderate pleomorphism',
      'Coarse, irregular chromatin',
      'Small but prominent nucleoli',
      'Nuclear crowding and overlapping within clusters',
    ],
    backgroundFeatures: [
      'Watery, granular diathesis-type background',
      'Macrophages (histiocytes) prominent in background — helpful clue to endometrial origin',
      'Necrotic debris',
    ],
    diagnosticNotes:
      'Endometrial adenocarcinoma cells appearing in a Pap smear are SMALLER than endocervical adenocarcinoma cells and form tight 3D clusters with vacuolated cytoplasm. The background characteristically shows WATERY DIATHESIS with prominent macrophages — distinct from the granular bloody diathesis of SCC. This macrophage-rich watery background is a helpful clue to endometrial rather than endocervical origin. Pap smear has only ~50% sensitivity for endometrial carcinoma.',
    clinicalRelevance:
      'Endometrial carcinoma is the most common gynecological malignancy in developed countries. A negative Pap does NOT exclude endometrial cancer — in postmenopausal women with abnormal uterine bleeding, endometrial biopsy is mandatory regardless of Pap result. The Bethesda System requires reporting endometrial cells in all women ≥45 years.',
    cues: [
      {
        id: 'c-endoad-1',
        x: 50,
        y: 35,
        title: 'Small 3D Clusters',
        description:
          'Endometrial carcinoma cells form compact, three-dimensional clusters — smaller and tighter than the irregular clusters of endocervical adenocarcinoma. This small cell size is a helpful low-power discriminator between endometrial and endocervical origin.',
      },
      {
        id: 'c-endoad-2',
        x: 25,
        y: 65,
        title: 'Watery Background with Macrophages',
        description:
          'The pale, watery diathesis background laden with macrophages/histiocytes is characteristic of endometrial origin. The macrophages may contain hemosiderin (golden pigment) from endometrial hemorrhage, reinforcing the uterine source.',
      },
      {
        id: 'c-endoad-3',
        x: 70,
        y: 60,
        title: 'Vacuolated Cytoplasm',
        description:
          'Intracytoplasmic vacuoles are common in endometrial glandular cells. Vacuoles containing engulfed neutrophils ("luminal neutrophils") are a specific feature of endometrial glandular cells and help distinguish endometrial from endocervical origin.',
      },
    ],
  },

  {
    id: 'gland-lower-seg-06',
    categoryId: 'glandular',
    title: 'Lower Uterine Segment (LUS) Sampling',
    imageUrl: N + 'endocervical-cells2.jpg',
    cellularFeatures: [
      'Small clusters of endometrial-type cells mixed with stromal cells',
      'Fusiform stromal cells with oval nuclei — the "ticket of admission" confirming endometrial origin',
      'Endometrial glandular cells in small, tight groups',
    ],
    nuclearFeatures: [
      'Stromal cells: oval, uniform, fine chromatin — no atypia',
      'Glandular cells: small, hyperchromatic, uniform nuclei',
      'No significant pleomorphism or stratification',
    ],
    backgroundFeatures: [
      'Clean background',
      'Myometrial fragments may be present in aggressive sampling',
    ],
    diagnosticNotes:
      'Lower uterine segment (LUS) sampling occurs when the endocervical brush reaches into the lower endometrial cavity, sampling the isthmic transitional zone. The hallmark is the co-appearance of ENDOMETRIAL GLANDULAR CELLS WITH FUSIFORM ENDOMETRIAL STROMAL CELLS — the stromal cells are the "ticket of admission" confirming endometrial rather than endocervical origin. Recognition prevents over-interpretation as AGC.',
    clinicalRelevance:
      'LUS sampling is particularly common with aggressive endocervical curettage or a long cytobrush. Recognition prevents unnecessary colposcopy and biopsy for a sampling artefact. If the cells show any atypia, further investigation is warranted.',
    cues: [
      {
        id: 'c-lus-1',
        x: 50,
        y: 35,
        title: 'Endometrial Stromal Cells',
        description:
          'The fusiform (spindle-shaped) stromal cells with oval, bland nuclei are the diagnostic "ticket of admission" — confirming that the associated glandular cells are of endometrial rather than endocervical origin. Endocervical glandular cells are never accompanied by this type of stromal cell.',
      },
      {
        id: 'c-lus-2',
        x: 25,
        y: 65,
        title: 'Tight Endometrial Glandular Clusters',
        description:
          'Small, tight clusters of hyperchromatic endometrial glandular cells are present alongside the stromal component. Compared to AGC/AIS, these cells are SMALLER, more uniform, and lack stratification, feathering, or apoptotic bodies — all features that would warrant further investigation.',
      },
    ],
  },
];
