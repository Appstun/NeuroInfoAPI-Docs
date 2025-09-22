import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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

    this.apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401)
          throw new Error("Unauthorized: API Token invalid or missing. Some endpoints require authentication.");

        return Promise.reject(error);
      }
    );
  }

  /**
   * Sets the API token for the client instance.
   *
   * @param token - The API token to be set. If `null`, the Authorization header will be removed.
   *                If a string is provided, it will be set as a Bearer token in the Authorization header.
   */
  setApiToken(token: string | null): void {
    if (token == null) delete this.apiInstance.defaults.headers.common["Authorization"];
    else this.apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Fetches the current Twitch stream data from the API.
   *
   * @returns {Promise<TwitchStreamData>} A promise that resolves to a `TwitchStreamData` object containing
   *                                      information about the current Twitch stream.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#current-stream-status-1
   */
  async getCurrentStream(): Promise<TwitchStreamData> {
    const response = await this.apiInstance.get("/twitch/stream");
    return response.data;
  }

  /**
   * Fetches all Twitch VODs from the API saved in the database.
   *
   * @returns {Promise<TwitchVod[]>} A promise that resolves to an array of Twitch VOD objects.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#all-vods-1
   */
  async getAllVods(): Promise<TwitchVod[]> {
    const response = await this.apiInstance.get("/twitch/vods");
    return response.data;
  }

  /**
   * Fetches a Twitch VOD (Video on Demand) based on the provided stream ID.
   *
   * @param streamId - (Optional) The ID of the stream for which to fetch the VOD.
   *                   If not provided, the method will fetch a default or latest VOD.
   * @returns {Promise<TwitchVod>} A promise that resolves to a `TwitchVod` object containing the VOD details.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#specific-vod-1
   */
  async getVod(streamId?: string): Promise<TwitchVod> {
    const config: AxiosRequestConfig = {};
    if (streamId) {
      config.params = { streamId };
    }
    const response = await this.apiInstance.get("/twitch/vod", config);
    return response.data;
  }

  /**
   * Retrieves the latest Twitch VOD (Video on Demand).
   *
   * @returns {Promise<TwitchVod>} A promise that resolves to the latest Twitch VOD.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/twitch.md#specific-vod-1
   */
  async getLatestVod(): Promise<TwitchVod> {
    return this.getVod();
  }

  /**
   * Fetches the schedule for a specified year and week.
   *
   * @param year - The year for which the schedule is requested (optional).
   * @param week - The week number for which the schedule is requested (optional).
   * @returns {Promise<ScheduleResponse>} A promise that resolves to a `ScheduleResponse` containing the schedule data.
   * @remarks If neither `year` nor `week` is provided, the method fetches a default schedule.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/schedule.md#specific-weekly-schedule-1
   */
  async getSchedule(year?: number, week?: number): Promise<ScheduleResponse> {
    const config: AxiosRequestConfig = {};
    if (year || week) {
      config.params = {};
      if (year) config.params.year = year;
      if (week) config.params.week = week;
    }
    const response = await this.apiInstance.get("/schedule", config);
    return response.data;
  }

  /**
   * Fetches the latest schedule from the API.
   *
   * @returns {Promise<ScheduleResponse>} A promise that resolves to the latest schedule data.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/schedule.md#latest-weekly-schedule-1
   */
  async getLatestSchedule(): Promise<ScheduleResponse> {
    const response = await this.apiInstance.get("/schedule/latest");
    return response.data;
  }

  /**
   * Fetches the current active subathons from the API.
   *
   * @returns {Promise<SubathonData[]>} A promise that resolves to an array of `SubathonData` objects
   *                                    representing the current subathons.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/subathon.md#current-subathon-1
   */
  async getCurrentSubathons(): Promise<SubathonData[]> {
    const response = await this.apiInstance.get("/subathon/current");
    return response.data;
  }

  /**
   * Fetches subathon data for a specific year.
   *
   * @param year - The year for which the subathon data is requested.
   * @returns {Promise<SubathonData>} A promise that resolves to a `SubathonData` object
   *                                  representing the subathon for the specified year.
   * @docs https://github.com/Appstun/NeuroInfoAPI-Docs/blob/master/subathon.md#subathon-data-specific-year-1
   */
  async getSubathon(year: number): Promise<SubathonData> {
    const response = await this.apiInstance.get("/subathon", { params: { year } });
    return response.data;
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

export interface ScheduleEntry {
  day: number; // Day of the week (0-6, Sunday-Saturday)
  time: number; // Unix timestamp in milliseconds
  message: string; // Schedule message/description
  type: "normal" | "offline" | "TBD" | "unknown"; // Schedule type
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
