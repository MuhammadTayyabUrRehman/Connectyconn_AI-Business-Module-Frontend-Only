export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    platform: 'CONNECTYCON',
    version: '2026.1.0',
    timestamp: new Date().toISOString(),
  });
}
