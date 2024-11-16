module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    return res.status(200).json({ 
      message: '你好，這是我的第一個 Vercel API！' 
    });
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