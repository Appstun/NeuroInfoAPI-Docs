**⤴️ Back to the [README](../README.md)**

# Prebuild Clients

In this directory you can find ready-to-use client libraries for the NeuroInfoAPI that you can integrate into your projects.

## TypeScript/JavaScript

**File:** [`NeuroInfoAPI-Client.ts`](NeuroInfoAPI-Client.ts)

A comprehensive TypeScript client that provides full access to all NeuroInfoAPI endpoints with proper type definitions.

<br>

> [!NOTE]
> You can also use it in JavaScript by converting it with `tsc` or an online tool like [transform.tools](https://transform.tools/typescript-to-javascript).

### Features

- 🔒 **Authentication Support** - Automatic Bearer token handling
- 📝 **Full TypeScript Support** - Complete type definitions for all API responses
- ⏱️ **Timeout Protection** - 10-second request timeout by default

### Requirements

This file uses the npm package [axios](https://www.npmjs.com/package/axios) to do the request.<br>
Install the package with `npm install axios`.

### Quick Start

```typescript
import { NeuroInfoApiClient } from "./NeuroInfoAPI-Client";

const client = new NeuroInfoApiClient();

// For endpoints requiring authentication
client.setApiToken("your-api-token-here");
```

---

Need help or found a bug? Feel free to [open an issue](../../issues) or start a [discussion](../../discussions)!
