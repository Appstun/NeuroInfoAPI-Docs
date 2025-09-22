**⤴️ Back to the [README](README.md)**

# Schedule API Documentation

## Endpoints

> [!IMPORTANT]
> Schedules are saved manually to the database, so the latest schedule may not be accessible right away.

### Specific Weekly Schedule

`GET https://neuro.appstun.net/api/v1/schedule`

### Latest Weekly Schedule

`GET https://neuro.appstun.net/api/v1/schedule/latest`

### Devstream Times

`GET https://neuro.appstun.net/api/v1/schedule/devstreamtimes`

## Description

Access weekly schedule data from the database. The main endpoint allows you to get a specific week's schedule, while the latest endpoint returns the most recent schedule available. Authentication is required for specific week requests.

## Endpoints Details

### Specific Weekly Schedule

#### Endpoint

`GET https://neuro.appstun.net/api/v1/schedule`

#### Description

Get a weekly schedule from the database for a given week and year.

#### Authentication

**Required** - Valid API token must be provided in Authorization header.

#### Parameters

| Parameter | Type    | Required | Description                                     |
| --------- | ------- | -------- | ----------------------------------------------- |
| `week`    | integer | Yes      | Calendar week number (1-53)                     |
| `year`    | integer | No       | Year (defaults to current year if not provided) |

> [!NOTE]
> The oldest weekly schedule is week 38 2024.

#### Request Examples

```http
GET https://neuro.appstun.net/api/v1/schedule?week=25&year=2024
Authorization: Bearer YOUR_API_TOKEN

GET https://neuro.appstun.net/api/v1/schedule?week=25
Authorization: Bearer YOUR_API_TOKEN
```

#### Response Format

##### Success Response (200)

```json
{
  "year": 2024,
  "week": 25,
  "schedule": [
    {
      "day": 0,
      "time": 1719475200000,
      "message": "Neuro-sama Stream",
      "type": "normal"
    },
    {
      "day": 1,
      "time": 1719561600000,
      "message": "Evil-sama Stream",
      "type": "normal"
    },
    {
      "day": 2,
      "time": 1719648000000,
      "message": "Offline Day",
      "type": "offline"
    },
    {
      "day": 3,
      "time": 1719734400000,
      "message": "TBD Stream",
      "type": "TBD"
    }
  ],
  "isFinal": true
}
```

### Latest Weekly Schedule

#### Endpoint

`GET https://neuro.appstun.net/api/v1/schedule/latest`

#### Description

Get the most recent weekly schedule available in the database.

#### Authentication

**Not required** - This is a public endpoint.

#### Parameters

None

#### Request Example

```http
GET https://neuro.appstun.net/api/v1/schedule/latest
```

#### Response Format

##### Success Response (200)

```json
{
  "year": 2025,
  "week": 32,
  "schedule": [
    {
      "day": 0,
      "time": 1723334400000,
      "message": "Neuro-sama Stream",
      "type": "normal"
    },
    {
      "day": 1,
      "time": 1723420800000,
      "message": "Evil-sama Stream",
      "type": "normal"
    },
    {
      "day": 2,
      "time": 1723507200000,
      "message": "Offline Day",
      "type": "offline"
    },
    {
      "day": 3,
      "time": 1723593600000,
      "message": "TBD Stream",
      "type": "TBD"
    }
  ],
  "isFinal": true
}
```

### Devstream Times

#### Endpoint

`GET https://neuro.appstun.net/api/v1/schedule/devstreamtimes`

#### Description

Returns the timestamps where a devstream happened.

#### Authentication

**Not required** – This is a public endpoint.

#### Parameters

None

#### Request Example

```http
GET https://neuro.appstun.net/api/v1/schedule/devstreamtimes
```

#### Response Format

##### Success Response (200)

```json
[1723680000000, 1723939200000, 1724198400000]
```

#### Schedule Entry Properties

| Property  | Type   | Description                                          | Always included |
| --------- | ------ | ---------------------------------------------------- | --------------- |
| `day`     | number | Day of the week (0-6, Sunday-Saturday)               | Yes             |
| `time`    | number | Unix timestamp in milliseconds                       | Yes             |
| `message` | string | Schedule message/description                         | Yes             |
| `type`    | string | Schedule type: "normal", "offline", "TBD", "unknown" | Yes             |

#### Response Properties

| Property   | Type    | Description                                        | Always included |
| ---------- | ------- | -------------------------------------------------- | --------------- |
| `year`     | number  | Year of the schedule                               | Yes             |
| `week`     | number  | Calendar week number (1-53)                        | Yes             |
| `schedule` | array   | Array of schedule entries (see above)              | Yes             |
| `isFinal`  | boolean | Whether this schedule is considered final/complete | Yes             |

## Error Responses

### Invalid Parameters (400)

```json
{
  "error": {
    "code": "SC2",
    "message": "Invalid year or week parameter"
  }
}
```

### No Schedule Found (404)

```json
{
  "error": {
    "code": "SC1",
    "message": "No schedule found in the database for the given week & year."
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

- The API uses calendar week numbers (ISO 8601)
- Specific week requests require authentication and use standard rate limiting
- Latest schedule endpoint is public with generous rate limiting
- If only `week` is provided without `year`, the current year is used
- Valid years range from 2023 to the current year (2025)
- Specific week schedules are cached for 30 minutes
- Latest schedule is cached for 5 minutes
- Schedule data is globally cached for a minimum of 6 hours, so changed schedules are not immediately available
