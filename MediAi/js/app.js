// MediAi JavaScript Application

// Sample Reports Database for simulation
const sampleReportsData = {
    blood: {
        title: "Complete Blood Count (CBC) Report",
        summary: "Your complete blood count results are overall within healthy parameters. Red blood cells and platelets show optimal oxygen transport and clotting capabilities. White blood cells are slightly elevated (11.2 K/uL), which commonly occurs during a mild immune response or temporary inflammation.",
        biomarkers: [
            { name: "White Blood Cells (WBC)", value: "11.2 K/uL", range: "4.5 - 11.0 K/uL", status: "attention", note: "Slightly elevated; may indicate mild immune activity." },
            { name: "Red Blood Cells (RBC)", value: "4.8 M/uL", range: "4.3 - 5.9 M/uL", status: "normal", note: "Optimal oxygen-carrying capacity." },
            { name: "Hemoglobin (Hgb)", value: "14.5 g/dL", range: "13.5 - 17.5 g/dL", status: "normal", note: "Healthy hemoglobin levels." },
            { name: "Platelets", value: "250 K/uL", range: "150 - 450 K/uL", status: "normal", note: "Normal blood clotting function." },
            { name: "Hematocrit", value: "43.0%", range: "41.0 - 50.0%", status: "normal", note: "Normal percentage of red blood cells." }
        ],
        doctorQuestions: [
            "Could the slight WBC elevation be related to recent seasonal allergies or mild cold?",
            "Are any dietary changes recommended to support overall immunity?"
        ],
        wellness: [
            "Maintain proper hydration with 8-10 glasses of water daily.",
            "Ensure 7-8 hours of consistent nightly sleep.",
            "Incorporate antioxidant-rich fruits and vegetables into meals."
        ]
    },
    lipid: {
        title: "Lipid & Cholesterol Panel",
        summary: "Your lipid panel shows total cholesterol within acceptable limits, but LDL ('bad') cholesterol is borderline elevated at 138 mg/dL. HDL ('good') cholesterol is healthy at 58 mg/dL. Making minor adjustments in dietary saturated fats and increasing aerobic exercise will easily optimize these numbers.",
        biomarkers: [
            { name: "Total Cholesterol", value: "215 mg/dL", range: "< 200 mg/dL", status: "attention", note: "Borderline elevated total cholesterol." },
            { name: "LDL Cholesterol", value: "138 mg/dL", range: "< 100 mg/dL", status: "attention", note: "Slightly above optimal range." },
            { name: "HDL Cholesterol", value: "58 mg/dL", range: "> 40 mg/dL", status: "normal", note: "Healthy protective cholesterol level." },
            { name: "Triglycerides", value: "140 mg/dL", range: "< 150 mg/dL", status: "normal", note: "Within normal limits." }
        ],
        doctorQuestions: [
            "What target LDL level should I aim for over the next 6 months?",
            "Should I consider specific dietary changes or supplements like omega-3 fatty acids?"
        ],
        wellness: [
            "Increase soluble fiber intake (oats, beans, lentils, apples).",
            "Engage in at least 150 minutes of moderate aerobic exercise per week.",
            "Reduce intake of trans fats and processed sugars."
        ]
    },
    metabolic: {
        title: "Comprehensive Metabolic Panel (CMP)",
        summary: "Your metabolic panel indicates normal kidney function (Creatinine and BUN) and healthy electrolyte balance (Sodium, Potassium). Fasting blood glucose is 98 mg/dL, which is within the normal healthy range (70-99 mg/dL).",
        biomarkers: [
            { name: "Fasting Glucose", value: "98 mg/dL", range: "70 - 99 mg/dL", status: "normal", note: "Normal blood sugar level." },
            { name: "Creatinine", value: "0.9 mg/dL", range: "0.6 - 1.2 mg/dL", status: "normal", note: "Healthy kidney function." },
            { name: "Blood Urea Nitrogen (BUN)", value: "15 mg/dL", range: "7 - 20 mg/dL", status: "normal", note: "Normal protein metabolism waste clearance." },
            { name: "Sodium", value: "140 mEq/L", range: "135 - 145 mEq/L", status: "normal", note: "Optimal electrolyte balance." },
            { name: "Potassium", value: "4.4 mEq/L", range: "3.5 - 5.0 mEq/L", status: "normal", note: "Healthy heart and muscle function." }
        ],
        doctorQuestions: [
            "Are my kidney and electrolyte markers completely stable compared to last year?",
            "Any routine guidelines for maintaining healthy glucose metabolism?"
        ],
        wellness: [
            "Maintain balanced carbohydrate intake with whole grains.",
            "Stay well hydrated throughout the day.",
            "Keep up with regular physical activity."
        ]
    }
};

// Medical Glossary Data
const medicalGlossary = [
    { term: "HDL Cholesterol", category: "Cardiology", desc: "Known as 'good' cholesterol, HDL helps remove other forms of cholesterol from your bloodstream." },
    { term: "LDL Cholesterol", category: "Cardiology", desc: "Known as 'bad' cholesterol, high levels can lead to plaque buildup in your arteries." },
    { term: "Hemoglobin", category: "Hematology", desc: "A protein in red blood cells that carries oxygen from your lungs to the rest of your body." },
    { term: "Creatinine", category: "Nephrology", desc: "A waste product filtered by the kidneys; used to evaluate how well your kidneys are functioning." },
    { term: "White Blood Cells (WBC)", category: "Immunology", desc: "Cells of the immune system that protect the body against infectious disease and foreign invaders." },
    { term: "Triglycerides", category: "Cardiology", desc: "A type of fat (lipid) found in your blood; excess calories are converted into triglycerides for storage." },
    { term: "Platelets", category: "Hematology", desc: "Small blood cell fragments that help form clots to stop bleeding." },
    { term: "Fasting Glucose", category: "Endocrinology", desc: "Measures blood sugar levels after an overnight fast; key marker for diabetes screening." },
    { term: "Hematocrit", category: "Hematology", desc: "The percentage by volume of red blood cells in your blood." },
    { term: "Electrolytes", category: "General", desc: "Minerals like sodium, potassium, and calcium that carry an electric charge and regulate body fluids." }
];

// Navigation & Tabs
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-brand-600', 'bg-brand-50');
        btn.classList.add('text-slate-600', 'hover:text-brand-600', 'hover:bg-slate-100');
    });

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-600', 'hover:text-brand-600', 'hover:bg-slate-100');
        activeNav.classList.add('text-brand-600', 'bg-brand-50');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Modal functions
function openPrivacyModal() {
    document.getElementById('privacyModal').classList.remove('hidden');
}

function closePrivacyModal() {
    document.getElementById('privacyModal').classList.add('hidden');
}

// File Upload Handling
const reportFileInput = document.getElementById('reportFileInput');
const fileInfoBox = document.getElementById('fileInfoBox');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const fileSizeDisplay = document.getElementById('fileSizeDisplay');
const analysisLoading = document.getElementById('analysisLoading');
const analysisResultsContainer = document.getElementById('analysisResultsContainer');

if (reportFileInput) {
    reportFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            fileNameDisplay.textContent = file.name;
            fileSizeDisplay.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
            fileInfoBox.classList.remove('hidden');
            analysisResultsContainer.classList.add('hidden');
        }
    });
}

// Load sample report directly
function loadSampleReport(type) {
    switchTab('analyzer');
    fileNameDisplay.textContent = `${type.toUpperCase()}_Medical_Report_Sample.pdf`;
    fileSizeDisplay.textContent = '1.8 MB (Sample)';
    fileInfoBox.classList.remove('hidden');
    analysisResultsContainer.classList.add('hidden');

    // Automatically trigger analysis for smooth experience
    setTimeout(() => {
        startAnalysis(type);
    }, 300);
}

// Start AI Analysis simulation
function startAnalysis(sampleType = 'blood') {
    fileInfoBox.classList.add('hidden');
    analysisLoading.classList.remove('hidden');
    analysisResultsContainer.classList.add('hidden');

    const progressBar = document.getElementById('progressBar');
    const statusTitle = document.getElementById('loadingStatusTitle');
    const statusDesc = document.getElementById('loadingStatusDesc');

    let progress = 0;
    progressBar.style.width = '0%';

    const steps = [
        { progress: 25, title: "Extracting Report Text...", desc: "Using advanced OCR to parse medical document..." },
        { progress: 50, title: "Analyzing Biomarkers...", desc: "Comparing values against clinical reference ranges..." },
        { progress: 75, title: "Translating to Plain English...", desc: "Synthesizing AI executive summary & health insights..." },
        { progress: 100, title: "Analysis Complete!", desc: "Preparing your interactive report breakdown..." }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
        if (stepIdx < steps.length) {
            progressBar.style.width = `${steps[stepIdx].progress}%`;
            statusTitle.textContent = steps[stepIdx].title;
            statusDesc.textContent = steps[stepIdx].desc;
            stepIdx++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                analysisLoading.classList.add('hidden');
                displayReportResults(sampleType);
            }, 400);
        }
    }, 500);
}

// Render report results
function displayReportResults(type) {
    const data = sampleReportsData[type] || sampleReportsData['blood'];

    document.getElementById('reportTitleResult').textContent = data.title;
    document.getElementById('summaryTextResult').textContent = data.summary;

    // Render biomarkers
    const biomarkersList = document.getElementById('biomarkersList');
    biomarkersList.innerHTML = '';

    data.biomarkers.forEach(bio => {
        const isAttention = bio.status === 'attention';
        const badgeColor = isAttention ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-medical-100 text-medical-800 border-medical-200';
        const badgeText = isAttention ? 'Attention Needed' : 'Normal Range';
        const icon = isAttention ? 'fa-triangle-exclamation text-amber-600' : 'fa-circle-check text-medical-600';

        const card = document.createElement('div');
        card.className = `p-4 rounded-2xl border ${isAttention ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'} space-y-2 shadow-sm`;
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-sm flex items-center">
                    <i class="fa-solid ${icon} mr-2"></i> ${bio.name}
                </span>
                <span class="text-xs font-bold px-2.5 py-1 rounded-full border ${badgeColor}">${badgeText}</span>
            </div>
            <div class="flex items-baseline justify-between pt-1">
                <span class="text-xl font-extrabold text-slate-900">${bio.value}</span>
                <span class="text-xs text-slate-400">Ref: ${bio.range}</span>
            </div>
            <p class="text-xs text-slate-600 pt-1 border-t border-slate-100">${bio.note}</p>
        `;
        biomarkersList.appendChild(card);
    });

    // Render doctor questions
    const doctorList = document.getElementById('doctorQuestionsList');
    doctorList.innerHTML = '';
    data.doctorQuestions.forEach(q => {
        const li = document.createElement('li');
        li.textContent = q;
        doctorList.appendChild(li);
    });

    // Render wellness suggestions
    const wellnessList = document.getElementById('wellnessList');
    wellnessList.innerHTML = '';
    data.wellness.forEach(w => {
        const li = document.createElement('li');
        li.textContent = w;
        wellnessList.appendChild(li);
    });

    analysisResultsContainer.classList.remove('hidden');
    analysisResultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Print Report
function printReport() {
    window.print();
}

// Chat AI Assistant Logic
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

function handleChatSubmit(e) {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    appendUserMessage(query);
    chatInput.value = '';

    // Simulate AI thinking and replying
    setTimeout(() => {
        generateAiChatResponse(query);
    }, 800);
}

function sendQuickPrompt(btn) {
    const text = btn.textContent;
    chatInput.value = text;
    switchTab('chat');
    // Trigger submit
    setTimeout(() => {
        const event = new Event('submit');
        document.getElementById('chatForm').dispatchEvent(event);
    }, 200);
}

function appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'flex items-start justify-end space-x-3';
    div.innerHTML = `
        <div class="bg-brand-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm max-w-xl leading-relaxed">
            <p>${escapeHtml(text)}</p>
        </div>
        <div class="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
            <i class="fa-solid fa-user"></i>
        </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendAiMessage(text) {
    const div = document.createElement('div');
    div.className = 'flex items-start space-x-3 max-w-xl';
    div.innerHTML = `
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-medical-600 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
            <i class="fa-solid fa-robot"></i>
        </div>
        <div class="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-sm text-slate-700 text-sm leading-relaxed space-y-2">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAiChatResponse(query) {
    const lower = query.toLowerCase();
    let reply = "That is a great health question. Based on standard clinical guidelines, it's always best to review specific biomarker variations with your primary care provider who knows your complete medical history.";

    if (lower.includes('cholesterol') || lower.includes('hdl') || lower.includes('ldl')) {
        reply = "Cholesterol is a waxy substance your body needs. <strong>LDL</strong> is often called 'bad' cholesterol because high levels build up in artery walls, while <strong>HDL</strong> is 'good' cholesterol that helps clear it away. To improve cholesterol levels, focus on soluble fiber, healthy omega-3 fats, and regular aerobic exercise.";
    } else if (lower.includes('blood pressure') || lower.includes('bp')) {
        reply = "Normal blood pressure is generally below 120/80 mmHg. Readings consistently above 130/80 mmHg may indicate hypertension. Reducing sodium intake, regular cardio exercise, and stress management are excellent ways to support healthy blood pressure.";
    } else if (lower.includes('hemoglobin') || lower.includes('rbc') || lower.includes('blood count')) {
        reply = "Hemoglobin is the protein in your red blood cells that transports oxygen throughout your body. Normal ranges typically run 13.5-17.5 g/dL for adult males and 12.0-15.5 g/dL for adult females. Low hemoglobin can indicate iron deficiency or anemia.";
    } else if (lower.includes('sugar') || lower.includes('glucose') || lower.includes('diabetes')) {
        reply = "Fasting blood glucose between 70-99 mg/dL is considered normal. Readings between 100-125 mg/dL suggest prediabetes, while 126 mg/dL or higher on repeat tests may indicate diabetes. Whole grains, regular exercise, and limiting sugary drinks help maintain stable glucose.";
    }

    appendAiMessage(reply);
}

function clearChat() {
    chatMessages.innerHTML = `
        <div class="flex items-start space-x-3 max-w-xl">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-medical-600 text-white flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-sm text-slate-700 text-sm leading-relaxed space-y-2">
                <p>Chat history cleared. How else can Dr. MediAi assist you today?</p>
            </div>
        </div>
    `;
}

// Render Medical Glossary
function renderGlossary(filter = '') {
    const grid = document.getElementById('glossaryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = medicalGlossary.filter(item => 
        item.term.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase()) ||
        item.desc.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="text-slate-400 text-sm col-span-full text-center py-8">No medical terms found matching "${filter}".</p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-500 hover:shadow-md transition-all space-y-2';
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <h4 class="font-extrabold text-slate-900 text-base">${item.term}</h4>
                <span class="text-[11px] font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">${item.category}</span>
            </div>
            <p class="text-slate-600 text-sm leading-relaxed">${item.desc}</p>
        `;
        grid.appendChild(card);
    });
}

function filterGlossary() {
    const query = document.getElementById('glossarySearch').value;
    renderGlossary(query);
}

// Utility
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    renderGlossary();
});
