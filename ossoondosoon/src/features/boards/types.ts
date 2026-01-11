export type BoardCategory = "NOTICE" | "FREE" | "MARKET" | "COMPLAINT";

export type BoardRequest = {
  writer: string;
  title: string;
  content: string;
  category?: BoardCategory;
};

export type BoardListItem = {
  boardId: number;
  writer: string;
  title: string;
  content: string;
  createdAt: string;
  category?: BoardCategory; // ✅ BE가 아직 안 주면 optional로
};

export type BoardListResponse = { data: BoardListItem[] };

// detail 타입도 category가 있으면 좋음
export type BoardDetail = {
  boardId: number;
  writer: string;
  title: string;
  content: string;
  createdAt?: string;
  category?: BoardCategory;
};
