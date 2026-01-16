export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        // Validate email
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Basic email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Get environment variables
        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_GROUP_ID;

        console.log('Environment check:', {
            hasApiKey: !!apiKey,
            hasGroupId: !!groupId,
            apiKeyLength: apiKey ? apiKey.length : 0,
            groupId: groupId
        });

        if (!apiKey || !groupId) {
            console.error('Missing MailerLite environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error',
                details: `API Key: ${!!apiKey}, Group ID: ${!!groupId}`
            });
        }

        // Add subscriber to MailerLite
        console.log('Making API call to MailerLite with:', {
            email: email,
            groupId: groupId,
            apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'none'
        });

        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                email: email,
                groups: [groupId],
                status: 'active'
            })
        });

        console.log('MailerLite API response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('MailerLite API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            // Handle specific error cases
            if (response.status === 409) {
                return res.status(409).json({ error: 'Email already subscribed' });
            }
            
            return res.status(response.status).json({ 
                error: 'Failed to subscribe. Please try again.',
                details: errorData
            });
        }

        const data = await response.json();
        console.log('MailerLite API success response:', {
            email: email,
            responseData: data,
            status: response.status
        });

        return res.status(200).json({ 
            success: true, 
            message: 'Successfully subscribed to newsletter!' 
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error. Please try again.' 
        });
    }
} 