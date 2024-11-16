module.exports = async (req, res) => {
  // 設置 CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { transferId, maxFee, maxTime } = req.query;

    if (!transferId) {
      return res.status(400).json({
        error: {
          code: 'validation_failed',
          message: 'Transfer ID is required'
        }
      });
    }

    // 模擬可用路由選項
    const options = [
      {
        routeId: 'ROUTE1',
        protocol: 'ETH-ERC20',
        fee: {
          amount: 0.001,
          token: 'ETH'
        },
        estimatedTime: 300,
        securityLevel: 'high',
        compatibility: 'full',
        gasPrice: {
          slow: 50,
          standard: 65,
          fast: 80
        }
      },
      {
        routeId: 'ROUTE2',
        protocol: 'TRON-TRC20',
        fee: {
          amount: 1,
          token: 'TRX'
        },
        estimatedTime: 180,
        securityLevel: 'high',
        compatibility: 'full'
      }
    ];

    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'internal_error',
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      }
    });
  }
}; 