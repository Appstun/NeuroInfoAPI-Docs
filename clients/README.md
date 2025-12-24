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
- ✅ **Type-Safe Error Handling** - Result pattern with `{ data, error }` return type
- 📡 **Event System** - `NeuroInfoApiEventer` for "real-time" updates

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

### Error Handling

All client methods return a result object with either `data` or `error`:

```typescript
const { data, error } = await client.getCurrentStream();

if (error) {
  // error is NeuroApiError with code, message, and status
  console.log(`Error ${error.code}: ${error.message}`);
  return;
}

// TypeScript knows data is TwitchStreamData here
console.log(data.title);
```

### Event System

Use `NeuroInfoApiEventer` to listen for "real-time" updates:

```typescript
import { NeuroInfoApiEventer } from "./NeuroInfoAPI-Client";

const eventer = new NeuroInfoApiEventer();
eventer.setApiToken("your-api-token-here");

// Listen for stream going live
eventer.on("streamOnline", (stream) => {
  console.log(`${stream.title} is now live!`);
});

// With optional error handler
eventer.on(
  "scheduleUpdate",
  (schedule) => console.log(`New schedule for week ${schedule.week}`),
  (error) => console.log(`Failed to fetch schedule: ${error.code}`)
);

// Start polling (default: every 60 seconds, minimum: 10 seconds)
eventer.fetchInterval = 30000; // 30 seconds
eventer.startEventLoop();
```

**Available Events:**
| Event | Description |
|-------|-------------|
| `streamOnline` | Stream went live |
| `streamOffline` | Stream went offline |
| `streamUpdate` | Any stream data changed |
| `scheduleUpdate` | Schedule was updated |
| `subathonUpdate` | Subathon data changed |
| `subathonGoalUpdate` | A subathon goal was reached/updated |

---

Need help or found a bug? Feel free to [open an issue](../../issues) or start a [discussion](../../discussions)!
