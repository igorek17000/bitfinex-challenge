# Bitfinex Challenge

## Instruction

### Install the project's dependencies

```bash
yarn
```

### Start the project in development mode

```bash
yarn dev
```

## Known issues

1. I cannot read API docs so I don't know what is API payload and result. I assume that order book API returns following structure
   ```js
   [channelId, data];
   // the data might be single record or multiple records of
   [price, count, amount];
   ```
2. I dont know how to fetch total values so I assume that the TotalValue = Amount \* Count
