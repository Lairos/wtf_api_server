module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
      recipientAddress,
      amount,
      tokenSymbol,
      senderAddress
    } = req.query;

    // 驗證必要欄位
    if (!recipientAddress || !amount || !tokenSymbol) {
      return res.status(400).json({
        error: {
          code: 'validation_failed',
          message: 'Missing required fields',
          details: {
            required: ['recipientAddress', 'amount', 'tokenSymbol']
          }
        }
      });
    }

    // 回傳交易資訊
    const transaction = {
      senderAddress: senderAddress || 'default_sender_address',
      recipientAddress,
      amount: Number(amount),
      tokenSymbol,
      action: 'create_transfer'
    };

    res.status(200).json(transaction);
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