# Transfer API Documentation

## Base URL
```
https://wtfapiserver-swvnram53-james-projects-d8e99eb1.vercel.app
```

## API Endpoints

### 1. Create Transfer
建立新的轉帳請求。

**Endpoint:** `GET /api/transfer/create`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| senderAddress | string | 是 | 發送���錢包地址 |
| recipientAddress | string | 是 | 接收方錢包地址 |
| amount | number | 是 | 轉帳金額 |
| tokenSymbol | string | 是 | 代幣符號 (例如: "USDT", "ETH") |
| sourceChain | string | 否 | 來源鏈 (預設: "ETH") |
| destinationChain | string | 否 | 目標鏈 (預設: "ETH") |
| memo | string | 否 | 交易備註 |
| referenceId | string | 否 | 客戶端參考ID |

**Response:**
```json
{
  "transferId": "TR1234567890",
  "status": "created",
  "createdAt": "2024-03-20T08:00:00Z",
  "expiresAt": "2024-03-20T09:00:00Z",
  "details": {
    "senderAddress": "0x1234...",
    "recipientAddress": "0xabcd...",
    "amount": 100,
    "tokenSymbol": "USDT",
    "sourceChain": "ETH",
    "destinationChain": "ETH",
    "memo": "Test transfer",
    "referenceId": "REF123"
  }
}
```

### 2. Validate Transfer
驗證轉帳請求的詳細資訊。

**Endpoint:** `GET /api/transfer/validate`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| transferId | string | 是 | 轉帳ID |
| checkBalances | boolean | 否 | 是否檢查餘額 |
| checkLimits | boolean | 否 | 是否檢查限額 |
| checkNetwork | boolean | 否 | 是否檢查網路狀態 |

**Response:**
```json
{
  "isValid": true,
  "validationDetails": {
    "balanceSufficient": true,
    "addressValid": true,
    "networkCompatible": true,
    "tokenSupported": true,
    "withinLimits": true
  },
  "warnings": [],
  "errors": []
}
```

### 3. Get Transfer Options
獲取可用的轉帳路由選項。

**Endpoint:** `GET /api/transfer/options`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| transferId | string | 是 | 轉帳ID |
| maxFee | number | 否 | 最大可接受手續費 |
| maxTime | number | 否 | 最大可接受時間(秒) |

**Response:**
```json
{
  "options": [
    {
      "routeId": "ROUTE1",
      "protocol": "ETH-ERC20",
      "fee": {
        "amount": 0.001,
        "token": "ETH"
      },
      "estimatedTime": 300,
      "securityLevel": "high",
      "compatibility": "full",
      "gasPrice": {
        "slow": 50,
        "standard": 65,
        "fast": 80
      }
    }
  ]
}
```

### 4. Execute Transfer
執行轉帳交易。

**Endpoint:** `GET /api/transfer/execute`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| transferId | string | 是 | 轉帳ID |
| routeId | string | 是 | 選擇的路由ID |
| walletSignature | string | 是 | 錢包簽名 |
| gasPrice | string | 否 | Gas價格選擇 ("slow"/"standard"/"fast") |

**Response:**
```json
{
  "executionId": "EX1234567890",
  "status": "pending",
  "transactionHash": "0x1111...",
  "estimatedCompletion": "2024-03-20T08:10:00Z",
  "route": {
    "sourceChainTxHash": "0x2222...",
    "bridgeTxHash": null,
    "destinationChainTxHash": null
  }
}
```

### 5. Confirm Transfer
確認轉帳狀態。

**Endpoint:** `GET /api/transfer/confirm`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| transferId | string | 是 | 轉帳ID |
| executionId | string | 是 | 執行ID |

**Response:**
```json
{
  "status": "completed",
  "confirmations": 12,
  "completionTime": "2024-03-20T08:10:45Z",
  "receipt": {
    "transactionHash": "0x1111...",
    "blockNumber": 15372042,
    "feePaid": {
      "amount": 0.001,
      "token": "ETH"
    },
    "actualExecutionTime": 45
  },
  "routeStatus": {
    "sourceChain": "confirmed",
    "bridge": "completed",
    "destinationChain": "confirmed"
  }
}
```

### 6. Create Transaction
建立新的交易請求。

**Endpoint:** `GET /api/transaction/create`

**Query Parameters:**
| 參數 | 類型 | 必填 | 描述 |
|------|------|------|------|
| recipientAddress | string | 是 | 接收方錢包地址 |
| amount | number | 是 | 轉帳金額 |
| tokenSymbol | string | 是 | 代幣符號 (例如: "USDT", "ETH") |
| senderAddress | string | 否 | 發送方錢包地址 |

**Response:**
```json
{
  "senderAddress": "0x1234...",
  "recipientAddress": "0xabcd...",
  "amount": 100,
  "tokenSymbol": "USDT",
  "action": "create_transfer"
}
```

## 錯誤響應
所有 API 在發生錯誤時會返回統一格式的錯誤響應：

```json
{
  "error": {
    "code": "error_code",
    "message": "Error message",
    "details": {},
    "timestamp": "2024-03-20T08:00:00Z"
  }
}
```

### 常見錯誤代碼
- `validation_failed`: 參數驗證失敗
- `internal_error`: 內部服務器錯誤
- `method_not_allowed`: 請求方法不允許 