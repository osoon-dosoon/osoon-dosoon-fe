export const boardKeys = {
  all: ["boards"] as const,
  lists: () => [...boardKeys.all, "list"] as const,
  list: (category: string) => [...boardKeys.lists(), category] as const,
  detail: (id: number) => [...boardKeys.all, "detail", id] as const,
};
