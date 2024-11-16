module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    const users = [
      { id: 1, name: '小明' },
      { id: 2, name: '小華' }
    ];
    
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ 
      error: {
        code: 'internal_error',
        message: '伺服器錯誤',
        details: error.message,
        timestamp: new Date().toISOString(),
        requestId: `REQ${Date.now()}`
      }
    });
  }
}; 