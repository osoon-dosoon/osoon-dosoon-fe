import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsApi } from "./api";
import type { BoardRequest, BoardCategory } from "./types";
import { boardKeys } from "./keys";

export function useBoardsList(category: BoardCategory) {
  return useQuery({
    queryKey: boardKeys.list(category),
    queryFn: () => boardsApi.list({ category }),
  });
}

export function useBoardDetail(id: number) {
  return useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: () => boardsApi.get(id),
    enabled: Number.isFinite(id),
  });
}

export function useCreateBoard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BoardRequest) => boardsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: boardKeys.lists() }),
  });
}

export function useUpdateBoard(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: BoardRequest) => boardsApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: boardKeys.lists() });
      qc.invalidateQueries({ queryKey: boardKeys.detail(id) });
    },
  });
}

export function useDeleteBoard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => boardsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: boardKeys.lists() }),
  });
}
