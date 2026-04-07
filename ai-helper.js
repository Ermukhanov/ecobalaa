// ============================================================
// AI HELPER - Real llm.alem.ai API Integration
// ============================================================

console.log('🤖 AI Helper script starting to load...');

const AI_CONFIG = {
    API_KEY: 'sk-I3ehqk94TiQHwW3V5SS0RQ',
    API_URL: 'https://llm.alem.ai/v1/chat/completions',
    MODEL: 'gpt-3.5-turbo',
    TEMPERATURE: 0.7,
    MAX_TOKENS: 500
};

// System prompts for different contexts
const SYSTEM_PROMPTS = {
    hamster_kids: `You are an EcoHamster - a helpful, friendly AI assistant for children aged 5-12. 
Your role is to:
- Help kids learn about ecology and environmental protection
- Explain ecological concepts in simple, fun language
- Encourage eco-friendly habits and behaviors
- Tell interesting facts about animals and nature
- Support kids in EcoGame quiz challenges
- Be positive, encouraging, and use emojis appropriately
- Always respond in Russian (Русский язык)
Language: Russian. Keep responses SHORT (1-2 sentences for kids).`,

    hamster_teen: `You are EcoHamster - a knowledgeable AI guide for teenagers aged 13-17.
Your role is to:
- Explain environmental science and ecology comprehensively
- Discuss sustainable living and climate action
- Provide resources for eco-activism
- Help with EcoGame quiz questions
- Encourage critical thinking about environmental issues
- Maintain an engaging, respectful tone
- Always respond in Russian (Русский язык)
Language: Russian. Keep responses concise but informative (2-3 sentences).`,

    teacher: `You are EcoGame Assistant - an educational support tool for teachers.
Your role is to:
- Help teachers create engaging EcoGame quiz content
- Provide teaching materials about environmental education
- Suggest interactive activities for eco-learning
- Support lesson planning
- Answer questions about environmental science
- Always respond in Russian (Русский язык)
Language: Russian.`
};

// Main AI call function
async function callAIAPI(userMessage, context = 'hamster_kids') {
    try {
        console.log('🤖 AI Call Start:', { context, messageLength: userMessage.length });
        
        const systemPrompt = SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.hamster_kids;
        
        console.log(`📨 Sending request to ${AI_CONFIG.API_URL}`);
        
        const response = await fetch(AI_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: AI_CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: AI_CONFIG.TEMPERATURE,
                max_tokens: AI_CONFIG.MAX_TOKENS
            })
        });

        console.log(`📡 Response status: ${response.status}`);

        if (!response.ok) {
            let errorData = '';
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = await response.text();
            }
            
            console.error('❌ AI API HTTP Error:', response.status, errorData);
            return { 
                error: `HTTP ${response.status}: ${JSON.stringify(errorData)}`, 
                success: false 
            };
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || 'No response content';
        
        console.log('✅ AI Response received:', aiResponse.substring(0, 100));
        
        return { 
            success: true,
            message: aiResponse,
            model: data.model,
            usage: data.usage
        };

    } catch (error) {
        console.error('❌ AI Call Error:', error.message, error);
        return { 
            error: `❌ Error: ${error.message}`,
            success: false
        };
    }
}

// Test function for debugging
async function testAIAPI() {
    console.log('🧪 Testing AI API...');
    const result = await callAIAPI('Привет!', 'hamster_kids');
    console.log('Test result:', result);
    return result;
}

// For EcoHamster chat in kids/teen
async function sendToEcoHamster(message, userRole = 'kids') {
    const context = userRole === 'teen' ? 'hamster_teen' : 'hamster_kids';
    return await callAIAPI(message, context);
}

// For teacher support
async function sendToTeacherAssistant(message) {
    return await callAIAPI(message, 'teacher');
}

// Stream response (for real-time chat)
async function streamAIResponse(userMessage, context = 'hamster_kids', onChunk) {
    try {
        const systemPrompt = SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.hamster_kids;
        
        const response = await fetch(AI_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: AI_CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: AI_CONFIG.TEMPERATURE,
                max_tokens: AI_CONFIG.MAX_TOKENS,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    try {
                        const json = JSON.parse(line.slice(6));
                        const content = json.choices[0]?.delta?.content || '';
                        if (content) {
                            fullResponse += content;
                            if (onChunk) onChunk(content);
                        }
                    } catch (e) {
                        // Skip parse errors
                    }
                }
            }
        }

        return { success: true, message: fullResponse };

    } catch (error) {
        console.error('Stream Error:', error);
        if (onChunk) onChunk(`\n❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// Export for use in HTML
window.EcoAI = {
    sendToHamster: sendToEcoHamster,
    sendToTeacher: sendToTeacherAssistant,
    callAPI: callAIAPI,
    streamResponse: streamAIResponse
};

// Also expose callAIAPI globally for direct use
window.callAIAPI = callAIAPI;

console.log('✅ AI Helper loaded! callAIAPI is available globally');
