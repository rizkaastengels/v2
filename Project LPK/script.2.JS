const skinProblems = {
    "kulit kering": {
        keywords: ["kering", "pecah-pecah", "bersisik", "kasar", "ketarik"],
        responses: [
            {
                analisis: "Dari gejala yang Anda sebutkan, sepertinya Anda mengalami masalah kulit kering. Kulit kering bisa disebabkan oleh berbagai faktor seperti cuaca, penggunaan produk yang terlalu keras, atau dehidrasi.",
                solusi: "Berikut beberapa rekomendasi untuk mengatasi kulit kering:",
                langkah: [
                    "1. Gunakan cleanser yang lembut dan non-foaming",
                    "2. Aplikasikan toner yang mengandung humectant seperti glycerin",
                    "3. Gunakan serum atau moisturizer dengan kandungan hyaluronic acid",
                    "4. Lindungi kulit dengan sunscreen di siang hari",
                    "5. Pertimbangkan untuk menggunakan facial oil di malam hari"
                ],
                tips: "Pastikan untuk minum cukup air dan hindari mandi dengan air terlalu panas karena bisa memperparah kulit kering."
            }
        ]
    },
    "kulit berminyak": {
        keywords: ["berminyak", "mengkilap", "kilap", "minyak", "mengkilat"],
        responses: [
            {
                analisis: "Berdasarkan keluhan Anda, tampaknya Anda memiliki tipe kulit berminyak. Kondisi ini biasanya disebabkan oleh produksi sebum yang berlebihan.",
                solusi: "Berikut rekomendasi perawatan untuk kulit berminyak:",
                langkah: [
                    "1. Gunakan cleanser dengan kandungan salicylic acid",
                    "2. Pilih toner yang mengandung niacinamide atau witch hazel",
                    "3. Aplikasikan moisturizer berbasis gel yang oil-free",
                    "4. Gunakan sunscreen yang ringan dan non-comedogenic",
                    "5. Pertimbangkan penggunaan clay mask 1-2 kali seminggu"
                ],
                tips: "Hindari produk yang terlalu rich atau creamy, dan jangan lupa double cleansing di malam hari."
            }
        ]
    },
    "kulit sensitif": {
        keywords: ["sensitif", "merah", "iritasi", "gatal", "perih"],
        responses: [
            {
                analisis: "Dari gejala yang Anda sebutkan, tampaknya Anda memiliki kulit sensitif. Kulit sensitif membutuhkan perhatian khusus dan produk yang gentle.",
                solusi: "Berikut rekomendasi untuk merawat kulit sensitif:",
                langkah: [
                    "1. Gunakan cleanser yang sangat lembut dan fragrance-free",
                    "2. Pilih produk dengan kandungan menenangkan seperti aloe vera",
                    "3. Hindari produk yang mengandung alkohol dan parfum",
                    "4. Gunakan moisturizer yang minimal ingredients",
                    "5. Pakai sunscreen mineral/physical (zinc oxide/titanium dioxide)"
                ],
                tips: "Selalu patch test produk baru dan hindari eksfoliasi yang terlalu keras."
            }
        ]
    },
    "jerawat": {
        keywords: ["jerawat", "berjerawat", "bruntusan", "acne", "komedo"],
        responses: [
            {
                analisis: "Dari keluhan Anda, sepertinya Anda mengalami masalah jerawat. Jerawat bisa disebabkan oleh berbagai faktor seperti hormonal, bakteri, atau penggunaan produk yang tidak sesuai.",
                solusi: "Berikut rekomendasi untuk mengatasi jerawat:",
                langkah: [
                    "1. Gunakan cleanser dengan salicylic acid atau benzoyl peroxide",
                    "2. Aplikasikan spot treatment yang mengandung tea tree oil",
                    "3. Pilih moisturizer non-comedogenic",
                    "4. Jangan lupa gunakan sunscreen setiap hari",
                    "5. Pertimbangkan penggunaan produk dengan niacinamide"
                ],
                tips: "Hindari memencet jerawat dan jaga kebersihan wajah serta barang-barang yang bersentuhan dengan wajah seperti handuk dan sarung bantal."
            }
        ]
    },
    "healthy": {
        keywords:["sehat","bersih","lembap"],
        responses: [
            {
                analisis: "Sepertinya anda memiiki kulit wajah yang baik, tapi untuk menjaga kesehatan kulit wajah anda.",
                solusi: "Berikut cara menjaga kulit anda agar tetap sehat dan baik:",
                langkah: [
                    "1. Mengurangi makanan yang berminyak",
                    "2. Menjaga waktu istirahat anda",
                    "3. Minum air putih yang cukup",
                    "4. Mengonsumsi sayuran dan buah"
                ],
                tips: "Selalu ikuti aturan diatas."
            }
        ]
    }
};

function formatResponse(response) {
    const sections = response.split('\n\n');
    let formattedResponse = '';
    
    sections.forEach((section, index) => {
        if (section.includes('Tips tambahan:')) {
            formattedResponse += `<div class="tips-section">${section}</div>`;
        } else if (section.includes('Berikut')) {
            const [title, ...steps] = section.split('\n');
            formattedResponse += `
                <div class="solution-section">
                    <div class="solution-title">${title}</div>
                    <div class="steps-section">
                        ${steps.map(step => `<div class="step-item">${step}</div>`).join('')}
                    </div>
                </div>`;
        } else {
            formattedResponse += `<div class="text-section">${section}</div>`;
        }
    });
    
    return formattedResponse;
}

function getRandomResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

function handleInput() {
    const userInput = document.getElementById("user-input").value;
    const chatDisplay = document.getElementById("chat-display");

    if (!userInput.trim()) return;

    let response = "Maaf, saya tidak memahami masalah kulit yang Anda sebutkan. Mohon jelaskan lebih detail tentang kondisi kulit Anda, misalnya apakah kering, berminyak, sensitif, atau berjerawat?";
    let category = null;

    const yesResponses = [
        "Baik, apa yang ingin Anda tanyakan mengenai kulit Anda?",
        "Tentu, silakan tanyakan apa yang ingin Anda ketahui tentang perawatan kulit Anda.",
        "Saya siap membantu Anda lagi. Apa yang ingin Anda konsultasikan?"
    ];

    const noResponses = [
        "Baiklah, terima kasih :D",
        "Senang bisa membantu Anda. Semoga harimu menyenangkan! :)",
        "Terima kasih telah berkonsultasi. Jaga kesehatan kulitmu ya! ^_^"
    ];

    if (userInput.toLowerCase() === "iya" || userInput.toLowerCase() === "ya") {
        response = getRandomResponse(yesResponses);
    } else if (userInput.toLowerCase() === "tidak" || userInput.toLowerCase() === "nggak" || userInput.toLowerCase() === "gak") {
        response = getRandomResponse(noResponses);
    } else {
        for (let problem in skinProblems) {
            if (skinProblems[problem].keywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
                category = problem;
                break;
            }
        }

        if (category) {
            const problemResponse = skinProblems[category].responses[0];
            response = `${problemResponse.analisis}\n\n${problemResponse.solusi}\n${problemResponse.langkah.join('\n')}\n\nTips tambahan: ${problemResponse.tips}\n\nApakah ada yang ingin ditanyakan lagi?`;
        }
    }

    const userMessageHTML = `<div class="user-message"><strong>Anda:</strong> ${userInput}</div>`;
    const botMessageHTML = `<div class="bot-message"><strong>BeautyChat:</strong><div class="bot-content">${formatResponse(response)}</div></div>`;
    
    chatDisplay.innerHTML += userMessageHTML + botMessageHTML;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    document.getElementById("user-input").value = "";
}

document.addEventListener('DOMContentLoaded', function() {
    const chatDisplay = document.getElementById("chat-display");
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");

    // Pesan selamat datang
    const welcomeMessage = `<div class="bot-message"><strong>BeautyChat:</strong> Halo! Kami dapat membantu anda untuk mengetahui teknik sintesis nanomaterial carbon nanotube. hal yang dijelaskan meliputi: alat dan bahan, skema kerja, dan karakterisasi. </div>`;
    chatDisplay.innerHTML = welcomeMessage;

    if (sendButton) {
        sendButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleInput();
        });
    }

    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleInput();
            }
        });
    }
});

