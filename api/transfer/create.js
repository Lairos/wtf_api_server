module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
      senderAddress,
      recipientAddress,
      amount,
      tokenSymbol,
      sourceChain,
      destinationChain,
      memo,
      referenceId
    } = req.query;

    // 驗證必要欄位
    if (!senderAddress || !recipientAddress || !amount || !tokenSymbol) {
      return res.status(400).json({
        error: {
          code: 'validation_failed',
          message: 'Missing required fields',
          details: {
            required: ['senderAddress', 'recipientAddress', 'amount', 'tokenSymbol']
          }
        }
      });
    }

    // 模擬創建轉帳
    const transferId = `TR${Date.now()}`;
    const transfer = {
      transferId,
      status: 'created',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      details: {
        senderAddress,
        recipientAddress,
        amount: Number(amount),
        tokenSymbol,
        sourceChain: sourceChain || 'ETH',
        destinationChain: destinationChain || 'ETH',
        memo,
        referenceId
      }
    };

    res.status(200).json(transfer);
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