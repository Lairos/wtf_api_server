# Universal Transfer Operations (UTO) API Documentation

## 1. Create Transfer
Creates a new transfer request with the specified parameters.

### Input Parameters
```typescript
{
  // Required
  senderAddress: string,      // The wallet address of the sender
  recipientAddress: string,   // The wallet address of the recipient
  amount: number,             // The amount to transfer
  tokenSymbol: string,        // The symbol of the token (e.g., "USDT", "ETH")
  
  // Optional
  sourceChain?: string,       // The source blockchain (default: sender's current chain)
  destinationChain?: string,  // The destination blockchain (default: same as source)
  memo?: string,             // Optional transaction memo/note
  referenceId?: string,      // Client-side reference ID
  preferences?: {
    maxFee?: number,         // Maximum acceptable fee
    minSpeed?: number,       // Minimum acceptable speed (in seconds)
    preferredRoute?: string  // Preferred routing protocol
  }
}
```

### Response
```typescript
{
  transferId: string,         // Unique identifier for the transfer
  status: TransferStatus,     // "created" | "pending" | "completed" | "failed"
  createdAt: DateTime,        // Creation timestamp
  expiresAt: DateTime,        // Expiration timestamp
  validationErrors?: string[] // Any immediate validation errors
}
```

## 2. Validate Transfer
Validates the transfer details and checks for potential issues.

### Input Parameters
```typescript
{
  transferId: string,         // The ID of the transfer to validate
  validateOptions?: {
    checkBalances: boolean,   // Whether to check account balances
    checkLimits: boolean,     // Whether to check transfer limits
    checkNetwork: boolean     // Whether to check network status
  }
}
```

### Response
```typescript
{
  isValid: boolean,           // Overall validation result
  validationDetails: {
    balanceSufficient: boolean,
    addressValid: boolean,
    networkCompatible: boolean,
    tokenSupported: boolean,
    withinLimits: boolean
  },
  warnings: string[],         // Any warning messages
  errors: string[]           // Any error messages
}
```

## 3. Get Transfer Options
Retrieves available transfer routes and options.

### Input Parameters
```typescript
{
  transferId: string,         // The ID of the transfer
  filters?: {
    maxFee?: number,         // Maximum acceptable fee
    maxTime?: number,        // Maximum acceptable time
    preferredChains?: string[], // Preferred blockchain networks
    excludedProtocols?: string[] // Protocols to exclude
  }
}
```

### Response
```typescript
{
  options: [{
    routeId: string,         // Unique identifier for this route
    protocol: string,        // Transfer protocol (e.g., "TRON-TRC20")
    fee: {
      amount: number,
      token: string
    },
    estimatedTime: number,   // Estimated completion time in seconds
    securityLevel: string,   // "high" | "medium" | "low"
    compatibility: string,   // "full" | "partial"
    bridgeProtocol?: string, // Cross-chain bridge protocol if applicable
    gasPrice?: {
      slow: number,
      standard: number,
      fast: number
    }
  }]
}
```

## 4. Execute Transfer
Executes the transfer using the selected route and parameters.

### Input Parameters
```typescript
{
  transferId: string,         // The ID of the transfer
  routeId: string,           // The selected route ID
  walletSignature: string,   // Signed transaction data
  executionPreferences?: {
    gasPrice?: "slow" | "standard" | "fast",
    slippageTolerance?: number,
    deadline?: number        // Transaction deadline in seconds
  }
}
```

### Response
```typescript
{
  executionId: string,       // Unique execution identifier
  status: string,           // "pending" | "completed" | "failed"
  transactionHash?: string,  // Blockchain transaction hash
  estimatedCompletion: DateTime,
  route: {
    sourceChainTxHash?: string,
    bridgeTxHash?: string,
    destinationChainTxHash?: string
  }
}
```

## 5. Confirm Transfer
Checks the status and confirmation of a transfer.

### Input Parameters
```typescript
{
  transferId: string,        // The ID of the transfer
  executionId: string       // The execution ID
}
```

### Response
```typescript
{
  status: string,           // "pending" | "completed" | "failed"
  confirmations: number,    // Number of block confirmations
  completionTime?: DateTime,
  receipt: {
    transactionHash: string,
    blockNumber: number,
    feePaid: {
      amount: number,
      token: string
    },
    actualExecutionTime: number // Actual execution time in seconds
  },
  routeStatus: {
    sourceChain: string,    // "pending" | "confirmed"
    bridge?: string,        // "pending" | "completed" | "failed"
    destinationChain: string // "pending" | "confirmed"
  }
}
```

## Error Handling

All operations may return an error response in the following format:
```typescript
{
  error: {
    code: string,           // Error code
    message: string,        // Human-readable error message
    details?: any,          // Additional error details
    timestamp: DateTime,    // Error timestamp
    requestId?: string     // Request ID for tracking
  }
}
```

Common error codes:
- `insufficient_balance`
- `invalid_address`
- `network_error`
- `validation_failed`
- `execution_timeout`
- `route_unavailable`
- `bridge_failure`
- `signature_invalid` 