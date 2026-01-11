import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoardDetail, useDeleteBoard } from "@/features/boards/hooks";
import styles from "./BoardDetailPage.module.css";

export default function BoardDetailPage() {
  const nav = useNavigate();
  const id = Number(useParams().id);
  const { data, isLoading, isError } = useBoardDetail(id);
  const del = useDeleteBoard();

  if (!Number.isFinite(id)) return <div className={styles.state}>잘못된 접근</div>;
  if (isLoading) return <div className={styles.state}>로딩중...</div>;
  if (isError || !data) return <div className={styles.state}>조회 실패</div>;

  const onDelete = async () => {
    if (!confirm("삭제할까요?")) return;
    await del.mutateAsync(id);
    nav("/boards");
  };

  return (
    <div className={styles.wrap}>
      {/* 상단 */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => nav(-1)} aria-label="뒤로가기">
          ←
        </button>

        <div className={styles.topTitle}>게시글</div>

        <div className={styles.topActions}>
          <Link to={`/boards/${id}/edit`} className={styles.editBtn}>
            수정
          </Link>
        </div>
      </div>

      {/* 헤더 카드 */}
      <section className={styles.headerCard}>
        <div className={styles.kicker}>커뮤니티 · 게시판</div>
        <h1 className={styles.title}>{data.title}</h1>

        <div className={styles.meta}>
          <span className={styles.metaItem}>👤 {data.writer}</span>
          {"createdAt" in data && data.createdAt ? (
            <span className={styles.metaItem}>
              🕒 {new Date((data as any).createdAt).toLocaleString()}
            </span>
          ) : null}
        </div>
      </section>

      {/* 본문 카드 */}
      <section className={styles.contentCard}>
        <div className={styles.contentLabel}>내용</div>
        <div className={styles.content}>{data.content}</div>
      </section>

      {/* 하단 고정 액션 */}
      <div className={styles.bottomBar}>
        <Link to="/boards" className={styles.ghostBtn}>
          목록
        </Link>

        <button
          className={styles.dangerBtn}
          onClick={onDelete}
          disabled={del.isPending}
        >
          {del.isPending ? "삭제중..." : "삭제"}
        </button>
      </div>
    </div>
  );
}
