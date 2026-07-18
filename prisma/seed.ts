import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed database...");

  // 1. Seed Categories
  const categoriesData = [
    { name: "Agriculture", slug: "agriculture", icon: "Sprout", description: "Schemes for farmers, agricultural loans, subsidies, and equipment." },
    { name: "Education", slug: "education", icon: "GraduationCap", description: "Scholarships, fellowships, educational loans, and school incentives." },
    { name: "Health", slug: "health", icon: "HeartPulse", description: "Health insurance, medical treatments, subsidies, and maternity benefits." },
    { name: "Social Welfare", slug: "social-welfare", icon: "HandHelping", description: "Pensions, social security, support for marginalized communities." },
    { name: "Women and Child Development", slug: "women-child-development", icon: "Baby", description: "Schemes for women empowerment, child nutrition, and protection." },
    { name: "Labour and Employment", slug: "labour-employment", icon: "Briefcase", description: "Employment guarantee, skill development, and worker welfare." },
    { name: "Transport", slug: "transport", icon: "Bus", description: "Concessions, licenses, public transport, and vehicle subsidies." },
    { name: "Finance", slug: "finance", icon: "IndianRupee", description: "Business loans, subsidies, microfinance, and banking benefits." },
    { name: "Rural Development", slug: "rural-development", icon: "Home", description: "Rural housing, sanitation, roads, and village infrastructure." },
    { name: "Urban Development", slug: "urban-development", icon: "Building2", description: "Urban housing, smart city benefits, and sanitation." },
    { name: "Minority Affairs", slug: "minority-affairs", icon: "Users", description: "Welfare and developmental schemes for minority communities." },
    { name: "Tribal Affairs", slug: "tribal-affairs", icon: "Shield", description: "Welfare, land rights, and education for tribal populations." },
    { name: "Disability Welfare", slug: "disability-welfare", icon: "Accessibility", description: "Subsidies, aids, and special pensions for persons with disabilities." },
    { name: "Senior Citizen Welfare", slug: "senior-citizen-welfare", icon: "UserCheck", description: "Pensions, health insurance, and travel concessions for seniors." },
    { name: "Housing", slug: "housing", icon: "HomeIcon", description: "Affordable housing, subsidies, and loans." },
    { name: "Food and Civil Supplies", slug: "food-civil-supplies", icon: "ShoppingCart", description: "Ration card services, subsidized food grains, and essential items." }
  ];

  console.log("Seeding categories...");
  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const dbCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoriesMap[cat.slug] = dbCat.id;
  }

  // 2. Seed Departments
  const departmentsData = [
    { name: "Ministry of Agriculture and Farmers Welfare", slug: "agriculture-farmers-welfare" },
    { name: "Ministry of Education", slug: "education" },
    { name: "Ministry of Health and Family Welfare", slug: "health-family-welfare" },
    { name: "Ministry of Women and Child Development", slug: "women-child-development" },
    { name: "Ministry of Social Justice and Empowerment", slug: "social-justice-empowerment" },
    { name: "Ministry of Rural Development", slug: "rural-development" },
    { name: "Ministry of Labour and Employment", slug: "labour-employment" },
    { name: "Ministry of Minority Affairs", slug: "minority-affairs" },
    { name: "Ministry of Tribal Affairs", slug: "tribal-affairs" },
    { name: "Ministry of Housing and Urban Affairs", slug: "housing-urban-affairs" },
    { name: "Ministry of Finance", slug: "finance" },
    { name: "Ministry of Road Transport and Highways", slug: "road-transport" },
    { name: "Ministry of Electronics and Information Technology", slug: "electronics-it" },
    { name: "Department of Food and Public Distribution", slug: "food-public-distribution" },
    { name: "Unique Identification Authority of India", slug: "uidai" },
    { name: "Ministry of External Affairs", slug: "external-affairs" },
    { name: "Department of Revenue", slug: "revenue" },
    { name: "Employees' Provident Fund Organisation", slug: "epfo" }
  ];

  console.log("Seeding departments...");
  const deptsMap: Record<string, string> = {};
  for (const dept of departmentsData) {
    const dbDept = await prisma.department.upsert({
      where: { slug: dept.slug },
      update: dept,
      create: dept,
    });
    deptsMap[dept.slug] = dbDept.id;
  }

  // 3. Seed States & UTs (All 36)
  const statesData = [
    // States
    { name: "Andhra Pradesh", slug: "andhra-pradesh", isUT: false, portalUrl: "https://www.ap.gov.in" },
    { name: "Arunachal Pradesh", slug: "arunachal-pradesh", isUT: false, portalUrl: "https://arunachalpradesh.gov.in" },
    { name: "Assam", slug: "assam", isUT: false, portalUrl: "https://assam.gov.in" },
    { name: "Bihar", slug: "bihar", isUT: false, portalUrl: "https://state.bihar.gov.in" },
    { name: "Chhattisgarh", slug: "chhattisgarh", isUT: false, portalUrl: "https://cgstate.gov.in" },
    { name: "Goa", slug: "goa", isUT: false, portalUrl: "https://www.goa.gov.in" },
    { name: "Gujarat", slug: "gujarat", isUT: false, portalUrl: "https://gujaratindia.gov.in" },
    { name: "Haryana", slug: "haryana", isUT: false, portalUrl: "https://haryana.gov.in" },
    { name: "Himachal Pradesh", slug: "himachal-pradesh", isUT: false, portalUrl: "https://himachal.nic.in" },
    { name: "Jharkhand", slug: "jharkhand", isUT: false, portalUrl: "https://www.jharkhand.gov.in" },
    { name: "Karnataka", slug: "karnataka", isUT: false, portalUrl: "https://www.karnataka.gov.in" },
    { name: "Kerala", slug: "kerala", isUT: false, portalUrl: "https://kerala.gov.in" },
    { name: "Madhya Pradesh", slug: "madhya-pradesh", isUT: false, portalUrl: "https://mp.gov.in" },
    { name: "Maharashtra", slug: "maharashtra", isUT: false, portalUrl: "https://www.maharashtra.gov.in" },
    { name: "Manipur", slug: "manipur", isUT: false, portalUrl: "https://manipur.gov.in" },
    { name: "Meghalaya", slug: "meghalaya", isUT: false, portalUrl: "https://meghalaya.gov.in" },
    { name: "Mizoram", slug: "mizoram", isUT: false, portalUrl: "https://mizoram.gov.in" },
    { name: "Nagaland", slug: "nagaland", isUT: false, portalUrl: "https://nagaland.gov.in" },
    { name: "Odisha", slug: "odisha", isUT: false, portalUrl: "https://odisha.gov.in" },
    { name: "Punjab", slug: "punjab", isUT: false, portalUrl: "https://punjab.gov.in" },
    { name: "Rajasthan", slug: "rajasthan", isUT: false, portalUrl: "https://rajasthan.gov.in" },
    { name: "Sikkim", slug: "sikkim", isUT: false, portalUrl: "https://www.sikkim.gov.in" },
    { name: "Tamil Nadu", slug: "tamil-nadu", isUT: false, portalUrl: "https://www.tn.gov.in" },
    { name: "Telangana", slug: "telangana", isUT: false, portalUrl: "https://www.telangana.gov.in" },
    { name: "Tripura", slug: "tripura", isUT: false, portalUrl: "https://tripura.gov.in" },
    { name: "Uttar Pradesh", slug: "uttar-pradesh", isUT: false, portalUrl: "https://up.gov.in" },
    { name: "Uttarakhand", slug: "uttarakhand", isUT: false, portalUrl: "https://uk.gov.in" },
    { name: "West Bengal", slug: "west-bengal", isUT: false, portalUrl: "https://wb.gov.in" },
    // UTs
    { name: "Andaman and Nicobar Islands", slug: "andaman-nicobar", isUT: true, portalUrl: "https://www.andaman.gov.in" },
    { name: "Chandigarh", slug: "chandigarh", isUT: true, portalUrl: "https://chandigarh.gov.in" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", slug: "dadra-nagar-haveli-daman-diu", isUT: true, portalUrl: "https://daman.nic.in" },
    { name: "Delhi", slug: "delhi", isUT: true, portalUrl: "https://delhi.gov.in" },
    { name: "Jammu and Kashmir", slug: "jammu-kashmir", isUT: true, portalUrl: "https://jk.gov.in" },
    { name: "Ladakh", slug: "ladakh", isUT: true, portalUrl: "https://ladakh.nic.in" },
    { name: "Lakshadweep", slug: "lakshadweep", isUT: true, portalUrl: "https://lakshadweep.gov.in" },
    { name: "Puducherry", slug: "puducherry", isUT: true, portalUrl: "https://puducherry.gov.in" }
  ];

  console.log("Seeding states...");
  const statesMap: Record<string, string> = {};
  for (const st of statesData) {
    const dbState = await prisma.state.upsert({
      where: { slug: st.slug },
      update: st,
      create: st,
    });
    statesMap[st.slug] = dbState.id;
  }

  // 4. Seed Services
  const servicesData = [
    {
      name: "Aadhaar Card Enrollment & Update",
      slug: "aadhaar-card",
      type: "SERVICE",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["uidai"],
      categoryId: categoriesMap["social-welfare"],
      shortDescription: "Get your 12-digit unique identity card or update your existing Aadhaar details (biometric/demographic).",
      fullDescription: "Aadhaar is a 12-digit unique identity number that can be obtained voluntarily by residents of India, based on their biometric and demographic data. It is a vital document for identifying citizens, availing government subsidies, opening bank accounts, and getting new mobile connections.",
      benefits: JSON.stringify([
        "Serves as universally accepted proof of identity and address.",
        "Allows access to government subsidies directly deposited in bank accounts (DBT).",
        "Enables digilocker registration, e-signatures, and instant online verifications."
      ]),
      eligibilitySummary: "All residents of India (including children and infants) are eligible.",
      requiredDocuments: JSON.stringify([
        "Proof of Identity (e.g. Passport, PAN, Voter ID)",
        "Proof of Address (e.g. Utility bills, Bank statement)",
        "Proof of Date of Birth (e.g. Birth certificate)"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Visit UIDAI official portal (https://myaadhaar.uidai.gov.in/).",
        "Book an appointment for enrollment at a nearby Aadhaar Seva Kendra.",
        "Check update status online using your Enrolment ID."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Visit nearby Aadhaar Center with completed form and original documents.",
        "Provide biometric data (iris scan and fingerprints) and photograph.",
        "Collect acknowledgement slip containing the 14-digit Enrolment ID."
      ]),
      officialWebsiteUrl: "https://uidai.gov.in",
      officialApplyUrl: "https://myaadhaar.uidai.gov.in",
      trackStatusUrl: "https://myaadhaar.uidai.gov.in/CheckStatus",
      helplineNumber: "1947",
      email: "help@uidai.gov.in",
      fees: "Free for first-time enrollment. Rs. 50 for demographic updates and Rs. 100 for biometric updates.",
      processingTime: "7 to 30 working days",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://uidai.gov.in", "https://myaadhaar.uidai.gov.in"]),
      beneficiaryTypes: "Resident Citizens"
    },
    {
      name: "Permanent Account Number (PAN) Card",
      slug: "pan-card",
      type: "SERVICE",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["finance"],
      categoryId: categoriesMap["finance"],
      shortDescription: "Apply for a new PAN card or reprint/correction in PAN details for financial transactions.",
      fullDescription: "Permanent Account Number (PAN) is a ten-digit alphanumeric identifier, issued by the Income Tax Department. It is mandatory for filing income tax returns, opening bank accounts, investing in mutual funds, and carrying out high-value financial transactions.",
      benefits: JSON.stringify([
        "Mandatory for filing Income Tax Returns (ITR).",
        "Acts as a valid identity proof.",
        "Allows opening of bank accounts, purchasing assets, and foreign currency exchange."
      ]),
      eligibilitySummary: "All Indian citizens, HUFs, companies, and foreigners doing business in India.",
      requiredDocuments: JSON.stringify([
        "Proof of Identity (Aadhaar, Voter ID, Passport)",
        "Proof of Address (Utility bill, Aadhaar, Bank Statement)",
        "Proof of Date of Birth (Birth certificate, Matriculation certificate)"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Visit NSDL (Protean) or UTITSL website.",
        "Select Form 49A (for Indian Citizens).",
        "Fill form details, pay fee, and e-sign using Aadhaar OTP (e-KYC)."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Download Form 49A, fill and paste two passport photos.",
        "Attach copies of ID, address, and DOB proofs.",
        "Submit at any NSDL PAN center and pay the application fee."
      ]),
      officialWebsiteUrl: "https://www.incometax.gov.in",
      officialApplyUrl: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
      trackStatusUrl: "https://tin.tin.nsdl.com/pantan/StatusTrack.html",
      helplineNumber: "18001801961",
      email: "tininfo@proteantech.in",
      fees: "Rs. 107 for dispatch within India, Rs. 1017 for dispatch outside India.",
      processingTime: "5 to 15 working days",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://www.incometax.gov.in", "https://tin-nsdl.com"]),
      beneficiaryTypes: "All Taxpayers"
    },
    {
      name: "DigiLocker Services",
      slug: "digilocker",
      type: "SERVICE",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["electronics-it"],
      categoryId: categoriesMap["education"],
      shortDescription: "Store and access official electronic documents like Driving License, Marksheets, and Aadhaar card digitally.",
      fullDescription: "DigiLocker is a flagship initiative of Ministry of Electronics & IT (MeitY) under Digital India. It provides citizens a personal cloud storage space to store, share, and verify documents and certificates legally at par with physical documents under IT Act.",
      benefits: JSON.stringify([
        "Valid electronic documents anywhere, avoiding carrying physical papers.",
        "Saves time and paper by sharing links of verified documents.",
        "Enables quick verification for educational admissions, employment, or traffic checks."
      ]),
      eligibilitySummary: "Every resident citizen with an Aadhaar card linked to a mobile number.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Number",
        "Linked mobile number for OTP authentication"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Visit digilocker.gov.in or download the DigiLocker App.",
        "Click Sign Up, enter your Name, DOB, Gender, Mobile Number, Email, and set 6-digit PIN.",
        "Authenticate using Aadhaar and mobile OTP."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Not applicable. DigiLocker is an exclusively online cloud service."
      ]),
      officialWebsiteUrl: "https://digilocker.gov.in",
      officialApplyUrl: "https://accounts.digilocker.gov.in/signup/smart_v2",
      helplineNumber: "011-24303500",
      email: "support@digilocker.gov.in",
      fees: "Free",
      processingTime: "Instant",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://digilocker.gov.in"]),
      beneficiaryTypes: "All Citizens"
    }
  ];

  console.log("Seeding services...");
  for (const s of servicesData) {
    const { slug, ...fields } = s;
    await prisma.scheme.upsert({
      where: { slug },
      update: { ...fields, slug },
      create: { ...fields, slug },
    });
  }

  // 5. Seed Central Government Schemes
  const centralSchemesData = [
    {
      name: "PM Kisan Samman Nidhi (PM-KISAN)",
      slug: "pm-kisan-samman-nidhi",
      type: "SCHEME",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["agriculture-farmers-welfare"],
      categoryId: categoriesMap["agriculture"],
      shortDescription: "An income support scheme of Rs. 6,000 per year for all landholding farmer families in India.",
      fullDescription: "Pradhan Mantri Kisan Samman Nidhi is a central sector scheme that provides financial assistance to landholding farmers. Under this scheme, an income support of Rs. 6,000 per year is provided in three equal installments of Rs. 2,000 directly into the bank accounts of the farmers via Direct Benefit Transfer (DBT).",
      benefits: JSON.stringify([
        "Rs. 6,000 financial support per year, paid in 3 installments of Rs. 2,000.",
        "Helps farmers meet agricultural expenses and crop cultivation requirements.",
        "Transferred directly into verified bank accounts, ensuring zero leakages."
      ]),
      eligibilitySummary: "Small and marginal farmers holding cultivable land in their name. Exclusion rules apply to high-income taxpayers and institutional landowners.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Card",
        "Land holding papers (Khatauni/Patta/Mutation details)",
        "Active Bank Account with Aadhaar linking",
        "Mobile Number linked to Aadhaar"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Go to the PM-Kisan Portal (https://pmkisan.gov.in/).",
        "Click on 'New Farmer Registration' link.",
        "Enter Aadhaar and Mobile, choose rural/urban, fill details, upload land proof, and submit."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Visit the nearest Common Service Centre (CSC) or local Revenue Office (Patwari/Lekhpal).",
        "Provide documents and fill application form.",
        "CSC operator submits and generates registration slip."
      ]),
      officialWebsiteUrl: "https://pmkisan.gov.in",
      officialApplyUrl: "https://pmkisan.gov.in/RegistrationFormNew.aspx",
      trackStatusUrl: "https://pmkisan.gov.in/BeneficiaryStatus_New.aspx",
      helplineNumber: "155261 / 1800115526",
      email: "pmkisan-ict@gov.in",
      fees: "Free (CSCs may charge nominal helper fee of Rs. 15-20)",
      processingTime: "30 to 45 days for verification",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://pmkisan.gov.in"]),
      beneficiaryTypes: "Farmers",
      keywords: "Farmer income support, PM Kisan, agricultural subsidy, land registration"
    },
    {
      name: "Ayushman Bharat PM Jan Arogya Yojana (AB-PMJAY)",
      slug: "ayushman-bharat-pmjay",
      type: "SCHEME",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["health-family-welfare"],
      categoryId: categoriesMap["health"],
      shortDescription: "The world's largest health insurance scheme, offering Rs. 5 lakh cover per family per year for secondary/tertiary hospitalisation.",
      fullDescription: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana is a national health insurance scheme launched by the government to help poor, vulnerable families. It offers cashless healthcare coverage of up to Rs. 5 lakh per family per year, covering secondary and tertiary hospitalisation expenses at public and empanelled private hospitals across India.",
      benefits: JSON.stringify([
        "Cashless health insurance cover up to Rs. 5,00,000 per family per year.",
        "Covers medical and surgical treatments, diagnostics, medicines, pre and post-hospitalisation.",
        "No limit on family size, age, or gender.",
        "Valid at all empanelled public and private hospitals across the country."
      ]),
      eligibilitySummary: "Identified poor and vulnerable families as per SECC 2011 database (socio-economic caste census), including BPL families, rural workers, and specific urban occupational categories.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Card",
        "Ration Card or proof of being in SECC database",
        "Mobile number",
        "Caste certificate (if applicable)"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Visit beneficiary portal (https://beneficiary.nha.gov.in/).",
        "Check eligibility using Ration card number, Aadhaar number, or PMJAY ID.",
        "Perform e-KYC using Aadhaar OTP and download the Ayushman Card."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Visit nearest empanelled hospital and contact 'Ayushman Mitra'.",
        "Provide Aadhaar and Ration Card to verify eligibility.",
        "Collect printed Ayushman Card after biometric validation."
      ]),
      officialWebsiteUrl: "https://pmjay.gov.in",
      officialApplyUrl: "https://beneficiary.nha.gov.in",
      trackStatusUrl: "https://beneficiary.nha.gov.in",
      helplineNumber: "14555",
      email: "ab.pmjay@nha.gov.in",
      fees: "Free",
      processingTime: "Instant after e-KYC validation",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://pmjay.gov.in", "https://beneficiary.nha.gov.in"]),
      beneficiaryTypes: "Low-income Families, BPL",
      keywords: "Health insurance, medical card, cash-free hospital, medical insurance"
    },
    {
      name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
      slug: "pm-awas-yojana-gramin",
      type: "SCHEME",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["rural-development"],
      categoryId: categoriesMap["housing"],
      shortDescription: "Financial assistance for construction of pucca house with basic amenities to rural homeless or dilapidated householders.",
      fullDescription: "Pradhan Mantri Awas Yojana - Gramin is social welfare program of the government, aimed at providing affordable housing for the rural poor in India. The assistance amount is Rs. 1.2 Lakh in plains and Rs. 1.3 Lakh in hilly/difficult areas, directly credited in bank accounts in installments matching construction stages.",
      benefits: JSON.stringify([
        "Financial grant of Rs. 1.20 lakh (plains) / Rs. 1.30 lakh (hilly areas) for house construction.",
        "Additional Rs. 12,000 for toilet construction in convergence with Swachh Bharat Mission.",
        "Optional 90-95 days of unskilled labour wage support under MGNREGA."
      ]),
      eligibilitySummary: "Rural families living in zero, one or two-room houses with kutcha walls and roof as per SECC 2011 data.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Card",
        "Bank account passbook",
        "MGNREGA Job Card number",
        "Affidavit stating no ownership of pucca house anywhere"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "PMAY-G registration is primarily handled through a geo-tagging survey app and portal by local Gram Panchayat officials. Individual online registration is not open to direct public submission.",
        "You can check your status in the permanent wait list using your Aadhaar or Register ID."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Submit request during Gram Sabha meetings.",
        "Gram Panchayat lists names based on housing deprivation indicators.",
        "Official inspects site, takes photographs (geo-tagged), and processes application."
      ]),
      officialWebsiteUrl: "https://pmayg.nic.in",
      trackStatusUrl: "https://awaassoft.nic.in/netiay/Benificiary.aspx",
      helplineNumber: "1800116446",
      email: "support-pmayg@gov.in",
      fees: "Free",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://pmayg.nic.in"]),
      beneficiaryTypes: "Rural Homeless, Low-Income",
      keywords: "Home subsidy, PM Awas, housing scheme, village home construct"
    },
    {
      name: "Atal Pension Yojana (APY)",
      slug: "atal-pension-yojana",
      type: "SCHEME",
      governmentLevel: "CENTRAL",
      departmentId: deptsMap["finance"],
      categoryId: categoriesMap["senior-citizen-welfare"],
      shortDescription: "A pension scheme targeting workers in the unorganised sector, offering a guaranteed pension of Rs. 1,000 to Rs. 5,000 per month.",
      fullDescription: "Atal Pension Yojana (APY) is a government-backed pension scheme in India, primarily targeted at unorganized sector workers like house helps, drivers, gardeners, etc. Under the APY, a guaranteed minimum pension of Rs. 1,000, Rs. 2,000, Rs. 3,000, Rs. 4,000 or Rs. 5,000 per month is given from the age of 60 years depending on the user's monthly contribution.",
      benefits: JSON.stringify([
        "Guaranteed monthly pension from Rs. 1,000 to Rs. 5,000 from age 60.",
        "Spouse receives the pension in case of death of the subscriber.",
        "Accumulated corpus returned to nominee after the death of both subscriber and spouse."
      ]),
      eligibilitySummary: "Indian citizens aged between 18 and 40 years. Must have a savings bank account. Income taxpayers are excluded.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Card",
        "Active Savings Bank Account",
        "Mobile Number"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Login to your bank's Internet Banking portal.",
        "Navigate to 'Government Schemes' or 'Social Security Schemes' and choose 'Atal Pension Yojana'.",
        "Fill auto-debit frequency, pension amount slab, nominee details, and submit."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Visit your bank branch where you hold a savings account.",
        "Fill out the APY registration form with account and nominee details.",
        "Ensure sufficient balance is maintained in the account for monthly auto-debit."
      ]),
      officialWebsiteUrl: "https://www.npscra.nsdl.co.in",
      trackStatusUrl: "https://www.npscra.nsdl.co.in",
      helplineNumber: "1800110069",
      fees: "No registration fee. Contribution depends on entry age and selected pension amount.",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://www.npscra.nsdl.co.in", "https://www.npscra.nsdl.co.in/scheme-details.php"]),
      beneficiaryTypes: "Unorganised sector workers, Seniors"
    }
  ];

  console.log("Seeding central schemes...");
  for (const cs of centralSchemesData) {
    const { slug, ...fields } = cs;
    const dbScheme = await prisma.scheme.upsert({
      where: { slug },
      update: { ...fields, slug },
      create: { ...fields, slug },
    });

    // Seed custom Eligibility Rules for eligibility checker matching
    if (slug === "pm-kisan-samman-nidhi") {
      await prisma.eligibilityRule.create({
        data: {
          schemeId: dbScheme.id,
          farmerStatus: true,
          gender: "ANY",
          maxIncome: 200000,
        }
      });
      await prisma.faq.createMany({
        data: [
          { question: "Who is excluded from PM-Kisan?", answer: "Institutional landowners, income tax payers, retired pensioners receiving Rs. 10,000+ monthly, constitutional post holders, and active professionals are excluded.", schemeId: dbScheme.id },
          { question: "How is land verification done?", answer: "Land verification is done through integration with state land records (Bhulekh). Your land registration detail must match your Aadhaar name.", schemeId: dbScheme.id }
        ]
      });
    } else if (slug === "ayushman-bharat-pmjay") {
      await prisma.eligibilityRule.create({
        data: {
          schemeId: dbScheme.id,
          bplStatus: true,
          gender: "ANY",
        }
      });
      await prisma.faq.createMany({
        data: [
          { question: "Is there a limit on family members?", answer: "No, there is no limit on the number of family members or age restrictions under AB-PMJAY.", schemeId: dbScheme.id }
        ]
      });
    } else if (slug === "atal-pension-yojana") {
      await prisma.eligibilityRule.create({
        data: {
          schemeId: dbScheme.id,
          minAge: 18,
          maxAge: 40,
          seniorStatus: false, // only 18-40 can apply
        }
      });
    }
  }

  // 6. Seed State Scheme Examples (Maharashtra and Karnataka)
  const stateSchemesData = [
    {
      name: "Majhi Ladki Bahin Yojana",
      slug: "majhi-ladki-bahin-yojana",
      type: "SCHEME",
      governmentLevel: "STATE",
      stateId: statesMap["maharashtra"],
      categoryId: categoriesMap["women-child-development"],
      shortDescription: "A direct cash transfer scheme of Rs. 1,500 per month for underprivileged women in Maharashtra.",
      fullDescription: "The Mukhyamantri Majhi Ladki Bahin Yojana is a major initiative by the Government of Maharashtra providing Rs. 1,500 monthly stipend to eligible women aged 21 to 65. The scheme aims to promote health, nutrition, and financial independence among women.",
      benefits: JSON.stringify([
        "Stipend of Rs. 1,500 per month credited directly to bank account.",
        "Financial independence and support for women's personal and medical expenses."
      ]),
      eligibilitySummary: "Women resident of Maharashtra, aged between 21 and 65, with annual family income less than Rs. 2.5 Lakh.",
      requiredDocuments: JSON.stringify([
        "Aadhaar Card of Maharashtra",
        "Domicile Certificate of Maharashtra or school leaving certificate showing birthplace in Maharashtra",
        "Income Certificate (under Rs. 2.5 lakh per annum) or yellow/orange ration card",
        "Bank Passbook (account must be Aadhaar linked)",
        "Affidavit/Declaration form"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Download and install the 'Nari Shakti Doot' mobile application.",
        "Register with mobile number, complete profiles, and select 'Ladki Bahin Yojana'.",
        "Scan documents, take a live selfie, fill form and submit."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Collect application form from local Anganwadi center or Gram Panchayat office.",
        "Submit completed form with photocopies of verified documents to Anganwadi Sevika or ward officer."
      ]),
      officialWebsiteUrl: "https://ladkibahin.maharashtra.gov.in",
      trackStatusUrl: "https://ladkibahin.maharashtra.gov.in",
      helplineNumber: "181 / 022-22023164",
      fees: "Free",
      processingTime: "15 to 30 days",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://maharashtra.gov.in"]),
      beneficiaryTypes: "Women",
      keywords: "Maharashtra, Ladki Bahin, women cash transfer, monthly stipend"
    },
    {
      name: "Gruha Lakshmi Scheme (Karnataka)",
      slug: "gruha-lakshmi-karnataka",
      type: "SCHEME",
      governmentLevel: "STATE",
      stateId: statesMap["karnataka"],
      categoryId: categoriesMap["women-child-development"],
      shortDescription: "A monthly financial assistance of Rs. 2,000 for the woman head of household in Karnataka.",
      fullDescription: "Gruha Lakshmi is one of the key guarantee schemes of the Government of Karnataka. It provides Rs. 2,000 monthly allowance to the woman head of every household in Karnataka, aiding in poverty alleviation and social security.",
      benefits: JSON.stringify([
        "Rs. 2,000 direct monthly deposit into bank account.",
        "Empowers women heads of families and provides essential household budget support."
      ]),
      eligibilitySummary: "Woman must be registered as head of family in RC/Antyodaya/BPL ration cards of Karnataka. Government employees and tax-paying families are excluded.",
      requiredDocuments: JSON.stringify([
        "Aadhaar card of woman head and husband",
        "Ration Card (BPL/APL/Antyodaya showing applicant as head)",
        "Mobile number linked with Aadhaar",
        "Bank account passbook copy"
      ]),
      onlineApplicationSteps: JSON.stringify([
        "Visit Seva Sindhu portal (https://sevasindhugs.karnataka.gov.in/).",
        "Login or register, search 'Gruha Lakshmi' and complete the application with Aadhaar verification."
      ]),
      offlineApplicationSteps: JSON.stringify([
        "Visit nearest Karnataka One, Bangalore One, or Grama One center.",
        "Get token, submit documents to desk operator, verify details, and collect printed acknowledgement receipt."
      ]),
      officialWebsiteUrl: "https://sevasindhugs.karnataka.gov.in",
      helplineNumber: "1902",
      fees: "Free",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      sourceUrls: JSON.stringify(["https://karnataka.gov.in"]),
      beneficiaryTypes: "Women, Low-Income",
      keywords: "Karnataka, women head pension, Seva Sindhu"
    }
  ];

  console.log("Seeding state schemes...");
  for (const ss of stateSchemesData) {
    const { slug, ...fields } = ss;
    const dbScheme = await prisma.scheme.upsert({
      where: { slug },
      update: { ...fields, slug },
      create: { ...fields, slug },
    });

    if (slug === "majhi-ladki-bahin-yojana") {
      await prisma.eligibilityRule.create({
        data: {
          schemeId: dbScheme.id,
          minAge: 21,
          maxAge: 65,
          gender: "FEMALE",
          maxIncome: 250000,
        }
      });
    } else if (slug === "gruha-lakshmi-karnataka") {
      await prisma.eligibilityRule.create({
        data: {
          schemeId: dbScheme.id,
          gender: "FEMALE",
          bplStatus: true,
        }
      });
    }
  }

  // 7. Seed Admin User
  const defaultAdmin = {
    username: "admin",
    password: "Password@123" // In production, hash it. Here we use plaintext for easy local verification.
  };

  console.log("Seeding admin user...");
  await prisma.adminUser.upsert({
    where: { username: defaultAdmin.username },
    update: defaultAdmin,
    create: defaultAdmin,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error in seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
