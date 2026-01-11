import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useBoardDetail, useCreateBoard, useUpdateBoard } from "@/features/boards/hooks";
import type { BoardCategory, BoardRequest } from "@/features/boards/types";
import styles from "./BoardFormPage.module.css";

const CATEGORY_OPTIONS: { value: BoardCategory; label: string; emoji: string }[] = [
  { value: "NOTICE", label: "공지 / 소식", emoji: "📣" },
  { value: "FREE", label: "자유게시판", emoji: "💬" },
  { value: "MARKET", label: "중고나눔", emoji: "🛍️" },
  { value: "COMPLAINT", label: "민원 / 문의", emoji: "🛠️" },
];

function normalizeCategory(v: string | null): BoardCategory {
  const ok = ["NOTICE", "FREE", "MARKET", "COMPLAINT"] as const;
  return ok.includes(v as any) ? (v as BoardCategory) : "FREE";
}

export default function BoardFormPage({ mode }: { mode: "create" | "edit" }) {
  const nav = useNavigate();
  const id = Number(useParams().id);
  const [sp] = useSearchParams();

  const create = useCreateBoard();
  const update = useUpdateBoard(id);
  const detail = useBoardDetail(id);

  // ✅ create일 때 기본 카테고리: URL query 기준
  const defaultCategory = normalizeCategory(sp.get("category"));

  const [form, setForm] = useState<BoardRequest>({
    writer: "",
    title: "",
    content: "",
    category: defaultCategory, // ✅ 추가
  });

  useEffect(() => {
    if (mode === "edit" && detail.data) {
      setForm({
        writer: detail.data.writer ?? "",
        title: detail.data.title ?? "",
        content: detail.data.content ?? "",
        // ✅ detail 응답에 category가 있으면 사용, 없으면 기존값 유지
        category: (detail.data as any).category ?? defaultCategory,
      });
    }
  }, [mode, detail.data]); // defaultCategory는 초기값으로만 쓰고 싶으면 의존성에서 제외해도 됨

  const pending = create.isPending || update.isPending;
  const pageTitle = useMemo(() => (mode === "create" ? "글쓰기" : "글 수정"), [mode]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.writer.trim() || !form.title.trim() || !form.content.trim()) {
      alert("작성자/제목/내용을 모두 입력해 주세요.");
      return;
    }
    if (!form.category) {
      alert("게시판(카테고리)을 선택해 주세요.");
      return;
    }

    try {
      if (mode === "create") {
        const created = await create.mutateAsync(form); // ✅ category 포함
        nav(`/boards/${created.boardId}`);
        return;
      }

      await update.mutateAsync(form); // ✅ category 포함(원하면 edit에선 고정도 가능)
      nav(`/boards/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (mode === "edit" && !Number.isFinite(id)) return <div className={styles.state}>잘못된 접근</div>;
  if (mode === "edit" && detail.isLoading) return <div className={styles.state}>불러오는 중...</div>;

  // ✅ 취소 시: create는 선택한 카테고리 목록으로 돌아가게
  const cancelTo =
    mode === "edit"
      ? `/boards/${id}`
      : `/boards?category=${form.category ?? "FREE"}`;

  return (
    <div className={styles.wrap}>
      {/* 상단바 */}
      <div className={styles.topBar}>
        <button
          className={styles.backBtn}
          onClick={() => nav(-1)}
          aria-label="뒤로가기"
          type="button"
        >
          ←
        </button>

        <div className={styles.topTitle}>{mode === "create" ? "작성" : "수정"}</div>
        <div />
      </div>

      {/* 헤더/설명 카드 */}
      <section className={styles.hero}>
        <div className={styles.kicker}>{mode === "create" ? "커뮤니티 · 작성" : "커뮤니티 · 수정"}</div>
        <h1 className={styles.heroTitle}>{pageTitle}</h1>
        <p className={styles.heroDesc}>
          {mode === "create" ? "이웃과 나눌 이야기를 작성해보세요." : "내용을 수정하고 저장해 주세요."}
        </p>
      </section>

      {/* 폼 카드 */}
      <form className={styles.formCard} onSubmit={onSubmit}>
        {/* ✅ 카테고리 선택 (create에서 특히 중요) */}
        <label className={styles.field}>
          <div className={styles.label}>게시판</div>

          <select
            className={styles.select}
            value={form.category ?? "FREE"}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value as BoardCategory }))
            }
            disabled={mode === "edit"} // ✅ 수정에서는 카테고리 고정(원하면 false로)
          >
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.emoji} {o.label}
              </option>
            ))}
          </select>

          {mode === "edit" ? (
            <div className={styles.hint}>수정 화면에서는 게시판을 변경할 수 없어요.</div>
          ) : null}
        </label>

        <label className={styles.field}>
          <div className={styles.label}>작성자</div>
          <input
            className={styles.input}
            placeholder="예) 101동 1203호"
            value={form.writer}
            onChange={(e) => setForm((p) => ({ ...p, writer: e.target.value }))}
          />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>제목</div>
          <input
            className={styles.input}
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
        </label>

        <label className={styles.field}>
          <div className={styles.labelRow}>
            <div className={styles.label}>내용</div>
            <div className={styles.counter}>{form.content.length.toLocaleString()}자</div>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="내용을 입력하세요"
            rows={10}
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          />
        </label>

        {(create.isError || update.isError) && (
          <div className={styles.error}>
            저장 실패: {((create.error || update.error) as Error)?.message ?? "알 수 없는 오류"}
          </div>
        )}

        {/* 하단 고정 액션 */}
        <div className={styles.bottomBar}>
          <Link to={cancelTo} className={styles.ghostBtn}>
            취소
          </Link>

          <button className={styles.primaryBtn} type="submit" disabled={pending}>
            {pending ? "저장 중..." : mode === "create" ? "등록" : "수정 저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
