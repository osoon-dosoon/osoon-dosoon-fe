import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useBoardsList } from "@/features/boards/hooks";
import type { BoardCategory } from "@/features/boards/types";
import styles from "./BoardsListPage.module.css";

const allowed: BoardCategory[] = ["NOTICE", "FREE", "MARKET", "COMPLAINT"];
function normalizeCategory(v: string | null): BoardCategory {
  if (allowed.includes(v as BoardCategory)) return v as BoardCategory;
  return "FREE";
}

const meta: Record<BoardCategory, { title: string; icon: string; desc: string }> = {
  NOTICE: { title: "공지 / 소식", icon: "📣", desc: "관리사무소 공지를 확인해요." },
  FREE: { title: "자유게시판", icon: "💬", desc: "이웃과 편하게 이야기해요." },
  MARKET: { title: "중고나눔", icon: "🛍️", desc: "필요한 물건을 나누고 거래해요." },
  COMPLAINT: { title: "민원 / 문의", icon: "🛠️", desc: "불편사항을 남겨주세요." },
};

export default function BoardsListPage() {
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const category = normalizeCategory(sp.get("category"));

  const { data, isLoading, isError, error } = useBoardsList(category);
  const boards = data?.data ?? [];
  const m = meta[category];

  if (isLoading) return <div className={styles.state}>로딩중...</div>;
  if (isError) return <div className={styles.state}>에러: {(error as Error).message}</div>;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <div className={styles.kickerChip}>커뮤니티</div>

          <div className={styles.titleRow}>
            <span className={styles.titleIcon} aria-hidden>{m.icon}</span>
            <h2 className={styles.title}>{m.title}</h2>
            <span className={styles.count}>{boards.length}</span>
          </div>

          <p className={styles.subtitle}>{m.desc}</p>
        </div>
      </div>

      {boards.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden>{m.icon}</div>
          <div className={styles.emptyTitle}>아직 게시글이 없어요</div>
          <div className={styles.emptyDesc}>첫 글을 작성해서 이웃과 소통해보세요.</div>
        </div>
      ) : (
        <ul className={styles.list}>
          {boards.map((b) => (
            <li key={b.boardId}>
              <Link to={`/boards/${b.boardId}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitle}>{b.title}</div>
                  <div className={styles.chev} aria-hidden>›</div>
                </div>

                <div className={styles.meta}>
                  <span className={styles.writer}>👤 {b.writer}</span>
                  {b.createdAt ? (
                    <span className={styles.date}>
                      {new Date(b.createdAt).toLocaleString()}
                    </span>
                  ) : null}
                </div>

                <div className={styles.preview}>{b.content}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ 현재 카테고리로 글쓰기 이동 */}
      <button
        className={styles.fab}
        onClick={() => nav(`/boards/new?category=${category}`)}
        aria-label="게시글 작성"
        title="게시글 작성"
      >
        +
      </button>
    </div>
  );
}
