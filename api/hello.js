module.exports = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json({ 
      message: '你好，這是我的第一個 Vercel API！' 
    });
  } catch (error) {
    return res.status(500).json({ 
      error: '伺服器錯誤' 
    });
  }
}; 