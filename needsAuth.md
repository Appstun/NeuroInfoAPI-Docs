**⤴️ Back to the [README](README.md)**

# Endpoints that require Authentication

> [!IMPORTANT]
> Authentication is done via a Authorization Header: `Authorization: Bearer YOUR_API_TOKEN`<br>
> To generate an API token, visit the [API Dashboard](https://neuro.appstun.net/api/dash/). Log in with your Twitch account and click the `Generate API Token` button.

## Schedule API

- **`GET /api/v1/schedule`** - Get specific weekly schedules
  - Parameters: `week` (required), `year` (optional)

## Twitch API

- **`GET /api/v1/twitch/vods`** - Get all VODs
- **`GET /api/v1/twitch/vod`** - Get specific or latest VOD
  - Parameters: `streamId` (optional)

## Subathon API

- **`GET /api/v1/subathon`** - Get subathon data for specific year
  - Parameters: `year` (required)

---

## Public Endpoints (no auth required)

- `GET /api/v1/schedule/latest` - Latest weekly schedule
- `GET /api/v1/schedule/devstreamtimes` - Devstream timestamps
- `GET /api/v1/twitch/stream` - Current stream information
- `GET /api/v1/subathon/current` - Current active subathon
- `GET /api/test/geterror` - Test error endpoint
