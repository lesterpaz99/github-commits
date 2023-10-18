import axios from "axios";

export interface GetCommitsI {
  url: string;
  perPage?: number;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// const controller = new AbortController();

export const commitsService = {
  getCommits: async ({ url }: GetCommitsI) => {
    try {
      const commits = await instance.get(url, {
        // signal: controller.signal,
      });
      return commits;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}