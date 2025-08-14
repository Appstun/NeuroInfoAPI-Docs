**⤴️ Back to the [README](README.md)**

# API Error Documentation

## Response Format

All API responses follow a consistent JSON format:

**Success Response:**

```json
{
  "data": { ... }
}
```

**Error Response:**

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Error Codes Reference

### General API Errors (AP)

| Code  | Error               | Description           |
| ----- | ------------------- | --------------------- |
| `AP1` | `Api_InternalError` | Internal server error |
| `AP3` | `Api_NotFound`      | 404 Not Found         |

### Schedule Errors (SC)

| Code  | Error                 | Description                                                 |
| ----- | --------------------- | ----------------------------------------------------------- |
| `SC1` | `Sched_NoSchedule`    | No schedule found in the database for the given week & year |
| `SC2` | `Sched_InvalidParams` | Invalid year or week parameter                              |

### VOD Errors (VD)

| Code  | Error        | Description                           |
| ----- | ------------ | ------------------------------------- |
| `VD1` | `Vod_NoVod`  | No vod found with the given stream id |
| `VD2` | `Vod_NoVods` | No vods found in the database         |

### Authentication Errors (AU)

| Code   | Error                        | Description                                                                    |
| ------ | ---------------------------- | ------------------------------------------------------------------------------ |
| `AU1`  | `Auth_MissingHeader`         | Missing or invalid authorization header                                        |
| `AU2`  | `Auth_InvalidToken`          | Invalid or expired API token                                                   |
| `AU3`  | `Auth_TokenRegenFailed`      | Failed to regenerate token                                                     |
| `AU4`  | `Auth_MissingUserData`       | User ID and username are required                                              |
| `AU5`  | `Auth_TokenGenFailed`        | Failed to generate token                                                       |
| `AU6`  | `Auth_TokenDelFailed`        | Failed to delete token                                                         |
| `AU8`  | `Auth_AccountBlocked`        | Account is blocked                                                             |
| `AU9`  | `Auth_MissingHeaderDetailed` | Missing or invalid authorization header. Use: Authorization: Bearer YOUR_TOKEN |
| `AU10` | `Auth_InvalidTokenFormat`    | Invalid token format                                                           |
| `AU11` | `Auth_InvalidExpiredToken`   | Invalid or expired API token                                                   |
| `AU12` | `Auth_InternalError`         | Internal server error during authentication                                    |
| `AU13` | `Auth_ConfigurationError`    | Configuration error. Please check Twitch settings                              |
| `AU14` | `Auth_MissingAuthCode`       | Authorization code missing                                                     |

### Rate Limit Errors (RL)

| Code  | Error                       | Description                                             |
| ----- | --------------------------- | ------------------------------------------------------- |
| `RL2` | `RateLimit_TooManyRequests` | Too many requests from this API token                   |
| `RL3` | `RateLimit_Strict`          | Rate limit exceeded: Maximum 30 requests per minute     |
| `RL4` | `RateLimit_Standard`        | Rate limit exceeded: Maximum 100 requests per minute    |
| `RL5` | `RateLimit_Generous`        | Rate limit exceeded: Maximum 300 requests per minute    |
| `RL6` | `RateLimit_Burst`           | Rate limit exceeded: Maximum 10 requests per 10 seconds |

### Subathon Errors (SB)

| Code  | Error                       | Description                                            |
| ----- | --------------------------- | ------------------------------------------------------ |
| `SB1` | `Subathon_NoActiveSubathon` | No active subathon found                               |
| `SB2` | `Subathon_NoParams`         | Year parameter is required                             |
| `SB3` | `Subathon_InvalidParams`    | Invalid year parameter or year cannot be in the future |
| `SB4` | `Subathon_NoSubathon`       | No subathon found for the specified year               |

## Common Error Scenarios

### Authentication Issues

- **Missing Token**: Returns `AU1` or `AU9` with detailed instructions
- **Invalid Token**: Returns `AU2` or `AU11` for expired/invalid tokens
- **Token Format**: Returns `AU10` for malformed authorization headers
- **Account Issues**: Returns `AU8` for blocked accounts

### Rate Limiting

The API implements multiple rate limiting tiers:

- **Burst Protection**: 10 requests per 10 seconds (`RL6`)
- **Strict Tier**: 30 requests per minute (`RL3`)
- **Standard Tier**: 100 requests per minute (`RL4`)
- **Generous Tier**: 300 requests per minute (`RL5`)

### Parameter Validation

- **Schedule**: Requires valid year and week parameters (`SC2`)
- **Subathon**: Requires year parameter, cannot be future date (`SB3`)
- **VOD**: Requires valid stream ID (`VD1`)

<br>

---

Encountering unexpected errors despite sending correct data?<br> [Open an issue](../../issues) or start a [discussion](../../discussions).
