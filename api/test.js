export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_GROUP_ID;

        return res.status(200).json({
            success: true,
            message: 'API is working',
            hasApiKey: !!apiKey,
            hasGroupId: !!groupId,
            apiKeyLength: apiKey ? apiKey.length : 0,
            groupId: groupId,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        return res.status(500).json({ 
            error: 'Test endpoint failed',
            message: error.message 
        });
    }
} 