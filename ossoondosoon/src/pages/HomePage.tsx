import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Hero */}
      <section
        style={{
          padding: 20,
          borderRadius: 16,
          border: "1px solid #eee",
          background: "linear-gradient(135deg, #f7f7ff, #f7fff9)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
              우리 아파트 커뮤니티
            </div>
            <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>
              OsoonDosoon
            </h1>
            <p style={{ margin: "8px 0 0", color: "#444" }}>
              공지, 민원, 소통을 한 곳에서. 이웃과 편하게 이야기해요.
            </p>
          </div>

          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid #eaeaea",
              background: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 24,
            }}
            aria-hidden
          >
            🏢
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <Link
            to="/boards"
            style={{
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "#fff",
              color: "#111",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>
              🗂️
            </span>
            게시판
          </Link>

          <Link
            to="/boards/new"
            style={{
              textDecoration: "none",
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>
              ✍️
            </span>
            글쓰기
          </Link>
        </div>
      </section>

      {/* Quick cards */}
      <section style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>바로가기</h2>
          <span style={{ fontSize: 12, color: "#777" }}>자주 쓰는 메뉴</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <QuickCard title="공지 / 소식" desc="관리사무소 공지 확인" emoji="📣" to="/boards?category=NOTICE" />
          <QuickCard title="자유게시판" desc="이웃과 소통하기" emoji="💬" to="/boards?category=FREE" />
          <QuickCard title="중고나눔" desc="필요한 물건 거래/나눔" emoji="🛍️" to="/boards?category=MARKET" />
          <QuickCard title="민원 / 문의" desc="불편사항 남기기" emoji="🛠️" to="/boards?category=COMPLAINT" />
        </div>
      </section>

      {/* Footer hint */}
      <div style={{ fontSize: 12, color: "#777", paddingTop: 6 }}>
        Tip: 상단의 <b>글쓰기</b>로 첫 게시글을 작성해보세요.
      </div>
    </div>
  );
}

function QuickCard({
  title,
  desc,
  emoji,
  to,
}: {
  title: string;
  desc: string;
  emoji: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #eee",
        background: "#fff",
        borderRadius: 16,
        padding: 14,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid #eee",
          display: "grid",
          placeItems: "center",
          fontSize: 18,
          background: "#fafafa",
          flex: "0 0 auto",
        }}
        aria-hidden
      >
        {emoji}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>{desc}</div>
      </div>
    </Link>
  );
}
