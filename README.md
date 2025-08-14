# NeuroInfoApi Documentation

Welcome to the **NeuroInfoApi** documentation repository! This API provides comprehensive access to Neuro-sama stream data, including schedules, VODs, Twitch information, and subathon details.

## 📚 Documentation Overview

This repository contains complete documentation for all API endpoints:

- **[Quick Reference](quickInfo.md)** - Quick overview of all endpoints
- **[Authentication Guide](needsAuth.md)** - Endpoints requiring API tokens
- **[Error Documentation](errors.md)** - Error codes and troubleshooting
- **[Schedule API](schedule.md)** - Weekly stream schedules
- **[Twitch API](twitch.md)** - Stream status and VOD data
- **[Subathon API](subathon.md)** - Subathon goals and progress

## 📊 API Features

### Schedule Management

- Access weekly stream schedules
- Get the latest schedule without authentication
- Query specific weeks and years
- Calendar week support (ISO 8601)

### Twitch Integration

- Real-time stream status updates
- Complete VOD archive access
- Cached data for optimal performance
- Direct Twitch API integration

### Subathon Tracking

- Current subathon progress
- Goal tracking and completion status
- Historical subathon data
- Real-time subscriber counts

## 📖 Getting Started

1. **Browse the documentation** - Start with [quickInfo.md](quickInfo.md) for a quick overview
2. **Get an API token** - Visit the [API Dashboard](https://neuro.appstun.net/dash/) if you need access to protected endpoints
3. **Test endpoints** - Use the examples in each documentation file
4. **Check authentication** - Review [needsAuth.md](needsAuth.md) to see which endpoints require tokens
5. **Handle errors** - Read [errors.md](errors.md) for error codes and troubleshooting

## 🔧 API Technical Details

- **Base URL**: `https://neuro.appstun.net/api/v1/`
- **HTTP Methods**: GET only
- **Response Format**: JSON
- **Content-Type**: `application/json`
- **Authentication**: Bearer token in Authorization header

## ⚡ Rate Limiting

- **Public endpoints**: 300 requests per minute (generous)
- **Protected endpoints**: 100 requests per minute (standard)
- **Burst protection**: 10 requests per 10 seconds
- Rate limits are applied per API token

## 📝 Notes

- All timestamps are in Unix milliseconds
- Data is cached for optimal performance
- Manual updates may cause slight delays in data availability
- The API uses calendar week numbers (ISO 8601 standard)
- All responses follow a consistent JSON format (`{data: {...}}` for success, `{error: {...}}` for errors)

<br>

---

**📝 Contributing:** Found an error in the docs or the API? Want to improve something?<br>
Feel free to [open an issue](../../issues) or start a [discussion](../../discussions)!
