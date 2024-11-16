# Vercel API Server Demo

這是一個使用 Vercel 部署的簡單 API 服務器示例。

## API 網址
https://wtfapiserver-swvnram53-james-projects-d8e99eb1.vercel.app

## API 端點

### Transfer APIs
- GET /api/transfer/create
  - 參數: senderAddress, recipientAddress, amount, tokenSymbol, sourceChain?, destinationChain?, memo?, referenceId?

- GET /api/transfer/validate
  - 參數: transferId, checkBalances?, checkLimits?, checkNetwork?

- GET /api/transfer/options
  - 參數: transferId, maxFee?, maxTime?

- GET /api/transfer/execute
  - 參數: transferId, routeId, walletSignature, gasPrice?

- GET /api/transfer/confirm
  - 參數: transferId, executionId

### Transaction APIs
- GET /api/transaction/create
  - 參數: recipientAddress, amount, tokenSymbol, senderAddress?

### 其他 APIs
- GET /api/hello
- GET /api/users

## 專案結構
\`\`\`
.
├── api/
│   ├── transfer/
│   │   ├── create.js
│   │   ├── validate.js
│   │   ├── options.js
│   │   ├── execute.js
│   │   └── confirm.js
│   ├── hello.js
│   └── users.js
├── .gitignore
├── package.json
├── vercel.json
└── README.md
\`\`\`
