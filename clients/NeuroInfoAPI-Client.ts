import axios, { AxiosInstance, isAxiosError } from "axios";
// Result Types
type Success<T> = { data: T; error: null };
type Failure = { data: null; error: NeuroApiError };
export type ApiResult<T> = Success<T> | Failure;

/**
 * Custom error class for API errors with code and status information.
 */
export class NeuroApiError extends Error {
  constructor(public code: string, message: string, public status?: number) {
    super(message);
    this.name = "NeuroApiError";
  }
}

/**
 * Client for interacting with the NeuroInfo API.
 * Provides methods to fetch stream data, VODs, schedules, and subathon information.
 */
export class NeuroInfoApiClient {
  public apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: `https://neuro.appstun.net/api/v1`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Parses an error into a NeuroApiError with proper code and message.
   */
  private parseError(error: unknown): NeuroApiError {
    if (isAxiosError(error)) {
      const apiError = error.response?.data?.error;
      if (apiError?.code && apiError?.message) return new NeuroApiError(apiError.code, apiError.message, error.response?.status);
      if (!error.response) return new NeuroApiError("NETWORK", error.message || "Network error");
      return new NeuroApiError("HTTP_ERROR", `Request failed with status ${error.response.status}`, error.response.status);
    }
    return new NeuroApiError("UNKNOWN", String(error));
  }

  /** Sets the API token for authentication. Pass `null` to remove the token. */
  public setApiToken(token: string | null): void {
    if (token == null) delete this.apiInstance.defaults.headers.common["Authorization"];
    else this.apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /** Generic request wrapper that handles errors consistently. */
  private async request<T>(url: string, params?: Record<string, any>): Promise<ApiResult<T>> {
    try {
      const response = await this.apiInstance.get(url, params ? { params } : undefined);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: this.parseError(error) };
    }
  }

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#current-stream-status-1 */
  public getCurrentStream = () => this.request<TwitchStreamData>("/twitch/stream");

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#all-vods-1 */
  public getAllVods = () => this.request<TwitchVod[]>("/twitch/vods");

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#specific-vod-1 */
  public getVod = (streamId?: string) => this.request<TwitchVod>("/twitch/vod", streamId ? { streamId } : undefined);

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#specific-vod-1 */
  public getLatestVod = () => this.getVod();

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/schedule.md#specific-weekly-schedule-1 */
  public getSchedule = (year?: number, week?: number) =>
    this.request<ScheduleResponse>("/schedule", year || week ? { year, week } : undefined);

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/schedule.md#latest-weekly-schedule-1 */
  public getLatestSchedule = () => this.request<ScheduleLatestResponse>("/schedule/latest");

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/subathon.md#current-subathon-1 */
  public getCurrentSubathons = () => this.request<SubathonData[]>("/subathon/current");

  /** @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/subathon.md#subathon-data-specific-year-1 */
  public getSubathon = (year: number) => this.request<SubathonData>("/subathon", { year });
}
  }

  /**
   *
   */
  }

  /**
   *
   */
  }

  /**
   *
   */
    }
  }

  /**
   *
   */
  }

  /**
   *
   */
  }

  /**
   *
   */
  }
}

export interface TwitchStreamData {
  isLive: boolean;
  id?: string;
  title?: string;
  game?: {
    id: string;
    name: string;
  };
  language?: string;
  tags?: string[];
  isMature?: boolean;
  viewerCount?: number;
  startedAt?: Date;
  thumbnailUrl?: string;
}

export interface TwitchVod {
  id: string;
  streamId: string;
  title: string;
  url: string;
  viewable: string;
  type: string;
  language: string;
  duration: string;
  viewCount: number;
  createdAt: number; // Unix timestamp
  publishedAt: number; // Unix timestamp
  thumbnailUrl: string;
}

export interface ScheduleResponse {
  year: number;
  week: number;
  schedule: ScheduleEntry[];
  isFinal: boolean; // Indicates if the schedule is final or subject to change
}

export interface ScheduleLatestResponse extends ScheduleResponse {
  hasActiveSubathon: boolean; // Indicates if there is an active subathon
}

export interface ScheduleEntry {
  day: number; // Day of the week (0-6, Sunday-Saturday)
  time: number; // Unix timestamp in milliseconds
  message: string; // Schedule message/description
  type: "normal" | "offline" | "canceled" | "TBD" | "unknown"; // Schedule type
}

export interface SubathonData {
  year: number;
  name: string;
  subcount: number;
  goals: { [goalNumber: number]: SubathonGoal };
  isActive: boolean;
  startTimestamp?: number; // Unix timestamp
  endTimestamp?: number; // Unix timestamp
}

export interface SubathonGoal {
  name: string; // Goal title/name
  completed: boolean; // Whether the goal has been completed
  reached: boolean; // Whether the goal has been reached (dynamically calculated)
}
