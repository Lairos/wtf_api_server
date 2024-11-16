module.exports = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    const users = [
      { id: 1, name: '小明' },
      { id: 2, name: '小華' }
    ];
    
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ 
      error: '伺服器錯誤' 
    });
  }
}; 