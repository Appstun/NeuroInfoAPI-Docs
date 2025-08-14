**⤴️ Back to the [README](README.md)**

# NeuroInfoApi - Quick Reference

## Base URL

`https://neuro.appstun.net/api/v1/`

## Schedule API

_Full docs of endpoint: [schedule.md](schedule.md)_

### Specific Weekly Schedule

`GET /schedule`

- **Purpose**: Weekly schedule for Neuro-sama streams
- **Parameters**: `week` (required), `year` (optional)
- **Public**: No (Auth required)
- **Example**: `/schedule?week=25&year=2024`

### Latest Weekly Schedule

`GET /schedule/latest`

- **Purpose**: Latest weekly schedule in database
- **Parameters**: None
- **Public**: Yes

## Twitch API

_Full docs of endpoint: [twitch.md](twitch.md)_

### Current Stream Status

`GET /twitch/stream`

- **Purpose**: Current stream information
- **Parameters**: None
- **Public**: Yes

### All VODs

`GET /twitch/vods`

- **Purpose**: All VODs
- **Parameters**: None
- **Public**: No (Auth required)

### Specific VOD

`GET /twitch/vod`

- **Purpose**: Latest or specific VOD
- **Parameters**: `streamId` (optional for specific VOD)
- **Public**: No (Auth required)
- **Example**: `/twitch/vod?streamId=324052648700`

## Subathon API

_Full docs of endpoint: [subathon.md](subathon.md)_

### Current Subathon

`GET /subathon/current`

- **Purpose**: Current active subathon data with goals
- **Parameters**: None
- **Public**: Yes

### Subathon Data (Specific Year)

`GET /subathon`

- **Purpose**: Subathon data for specific year
- **Parameters**: `year` (required)
- **Public**: No (Auth required)
- **Example**: `/subathon?year=2024`

## Authentication

In Header: `Authorization: Bearer YOUR_API_TOKEN`

> [!NOTE]
> To access non-public API endpoints, you need an API token.  
> Visit the [API Dashboard](https://neuro.appstun.net/dash/), connect with your Twitch account, and click the `Generate API Token` button to create one.

_For a quick overview of endpoints requiring authentication, refer to [needsAuth.md](needsAuth.md)._
