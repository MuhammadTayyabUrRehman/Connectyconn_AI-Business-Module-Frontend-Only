import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { prompt, context } = body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt string is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(200).json({
        reply: `**CONNECTYCON Executive Strategy Recommendation**\n\nRegarding your request on *"${prompt.slice(0, 50)}..."*:\n\n1. **Focus Metric**: At $84.2k MRR with 85% gross margins, your primary leverage point is reducing self-serve onboarding drop-off from 18% down to < 5%.\n2. **Immediate Action**: Launch the no-code workflow wizard (Milestone RM-3) and complete SOC2 Type II audit to unlock $240k in pending enterprise POCs.\n3. **Network Advantage**: Connect with Julian Sterling (@jsterling) in your pending queue for B2B PLG distribution insights.`,
        source: 'simulated_intelligence',
        suggestedActions: [
          'Generate 30-60-90 Day Roadmap',
          'Draft SOC2 Compliance Audit Checklist',
          'View Recommended Founder Matches',
        ],
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `You are CONNECTYCON's AI Business Advisor — an elite executive strategic assistant for technology founders, executives, and investors.\nYou provide concise, highly structured, actionable executive recommendations. Use bold text, bullet points, and quantitative KPIs.\nUser context: ${JSON.stringify(context || {})}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.status(200).json({
      reply: response.text,
      source: 'gemini_2.5_flash',
      suggestedActions: [
        'Export Advice to Action Items',
        'Generate SWOT Impact Analysis',
        'Schedule Advisory Follow-up',
      ],
    });
  } catch (error: any) {
    console.error('Advisor API Error:', error);
    res.status(500).json({
      error: 'Advisor service error',
      details: error?.message || 'Unknown error',
    });
  }
}
