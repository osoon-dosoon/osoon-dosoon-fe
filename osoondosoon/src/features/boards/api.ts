import { http } from "@/shared/api/http";
import type { BoardDetail, BoardListResponse, BoardRequest, BoardCategory } from "./types";

export const boardsApi = {
  list: async ({ category }: { category?: BoardCategory }) => {
    const res = await http.get<BoardListResponse>("/api/boards", {
      params: category ? { category } : {},
    });
    return res.data;
  },

  get: async (id: number) => {
    const res = await http.get<BoardDetail>(`/api/boards/${id}`);
    return res.data;
  },

  create: async (payload: BoardRequest) => {
    const res = await http.post<BoardDetail>("/api/boards", payload);
    return res.data;
  },

  update: async (id: number, payload: BoardRequest) => {
    const res = await http.put<number>(`/api/boards/${id}`, payload);
    return res.data; // id
  },

  remove: async (id: number) => {
    const res = await http.delete<number>(`/api/boards/${id}`);
    return res.data; // id
  },
};
