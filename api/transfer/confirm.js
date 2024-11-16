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

    const { transferId, executionId } = req.query;

    if (!transferId || !executionId) {
      return res.status(400).json({
        error: {
          code: 'validation_failed',
          message: 'Transfer ID and Execution ID are required'
        }
      });
    }

    // 模擬確認結果
    const confirmationResult = {
      status: 'completed',
      confirmations: 12,
      completionTime: new Date().toISOString(),
      receipt: {
        transactionHash: '0x' + '1'.repeat(64),
        blockNumber: 15372042,
        feePaid: {
          amount: 0.001,
          token: 'ETH'
        },
        actualExecutionTime: 45
      },
      routeStatus: {
        sourceChain: 'confirmed',
        bridge: 'completed',
        destinationChain: 'confirmed'
      }
    };

    res.status(200).json(confirmationResult);
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