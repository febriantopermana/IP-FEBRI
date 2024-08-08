const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async (title) => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `give me three title only of anime that similiar to ${title} with format array of string json, please remove open \`\`\`json and close \`\`\``

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    return JSON.parse(text)
}

module.exports = gemini