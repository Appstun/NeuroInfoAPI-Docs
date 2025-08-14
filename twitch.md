**⤴️ Back to the [README](README.md)**

# Twitch API Documentation

## Endpoints

> [!NOTE]
> Video on Demand (VOD) and stream informations are fetched straight from the Twitch API but is stored in a cache. <br>
> The stream info updates every 30 seconds and the VOD list in the database every 2 hours.

### Current Stream Status

`GET https://neuro.appstun.net/api/v1/twitch/stream`

### All VODs

`GET https://neuro.appstun.net/api/v1/twitch/vods`

### Specific VOD

`GET https://neuro.appstun.net/api/v1/twitch/vod`

## Description

Access Twitch stream data and VOD information. Stream data is publicly available, while VOD endpoints require authentication.

## Endpoints Details

### Current Stream Status

#### Endpoint

`GET https://neuro.appstun.net/api/v1/twitch/stream`

#### Description

Get current Twitch stream information. This is a public endpoint with generous rate limiting.

#### Parameters

None

#### Request Example

```http
GET https://neuro.appstun.net/api/v1/twitch/stream
```

#### Response Format

##### Success Response (200)

```json
{
  "isLive": true,
  "title": "Neuro-sama Stream",
  "game": "Just Chatting",
  "viewers": 15420,
  "startedAt": "2025-07-02T14:00:00Z",
  "thumbnailUrl": "https://static-cdn.jtvnw.net/previews-ttv/live_user_vedal987-1920x1080.jpg"
}
```

### All VODs

#### Endpoint

`GET https://neuro.appstun.net/api/v1/twitch/vods`

#### Description

Get all cached VODs from the database. Requires authentication.

#### Authentication

**Required** - Valid API token must be provided in Authorization header.

#### Parameters

None

#### Request Example

```http
GET https://neuro.appstun.net/api/v1/twitch/vods
Authorization: Bearer YOUR_API_TOKEN
```

#### Response Format

##### Success Response (200)

```json
[
  {
    "streamId": "123456789",
    "title": "Neuro-sama Stream VOD",
    "duration": "02:45:30",
    "createdAt": "2025-07-01T16:00:00Z",
    "url": "https://www.twitch.tv/videos/123456789",
    "thumbnailUrl": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/123456789_thumb.jpg"
  },
  {
    "streamId": "987654321",
    "title": "Evil-sama Stream VOD",
    "duration": "03:12:45",
    "createdAt": "2025-06-30T18:00:00Z",
    "url": "https://www.twitch.tv/videos/987654321",
    "thumbnailUrl": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/987654321_thumb.jpg"
  }
]
```

### Specific VOD

#### Endpoint

`GET https://neuro.appstun.net/api/v1/twitch/vod`

#### Description

Get a specific VOD by stream ID, or the latest VOD if no ID is provided. Requires authentication.

#### Authentication

**Required** - Valid API token must be provided in Authorization header.

#### Parameters

| Parameter  | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| `streamId` | string | No       | Twitch stream (not VOD ID) |

> [!NOTE]
> If no specific VOD ID is provided, the latest VOD will be returned

#### Request Examples

```http
GET https://neuro.appstun.net/api/v1/twitch/vod?streamId=123456789
Authorization: Bearer YOUR_API_TOKEN

GET https://neuro.appstun.net/api/v1/twitch/vod
Authorization: Bearer YOUR_API_TOKEN
```

#### Response Format

##### Success Response (200)

```json
{
  "streamId": "123456789",
  "title": "Neuro-sama Stream VOD",
  "duration": "02:45:30",
  "createdAt": "2025-07-01T16:00:00Z",
  "url": "https://www.twitch.tv/videos/123456789",
  "thumbnailUrl": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/123456789_thumb.jpg"
}
```

## Error Responses

### No VODs Found (404)

```json
{
  "error": {
    "code": "VD2",
    "message": "No vods found in the database."
  }
}
```

### No Specific VOD Found (404)

```json
{
  "error": {
    "code": "VD1",
    "message": "No vod found with the given stream id."
  }
}
```

### Authentication Required (401)

```json
{
  "error": {
    "code": "AU1",
    "message": "Missing or invalid authorization header"
  }
}
```

### Invalid Token (403)

```json
{
  "error": {
    "code": "AU2",
    "message": "Invalid or expired API token"
  }
}
```

### Rate Limit Exceeded (429)

```json
{
  "error": {
    "code": "RL4",
    "message": "Rate limit exceeded: Maximum 100 requests per minute"
  }
}
```

## Other Notes

- Stream data is cached for 30 seconds
- VOD data is cached for 15 minutes (all VODs) to 1 hour (specific VOD)
- All Twitch endpoints have rate limiting applied, VOD endpoints require valid API authentication
