import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭하면 닫기
  useEffect(() => {
  if (!open) return;

  const onDown = (e: MouseEvent) => {
    const el = menuRef.current;
    if (!el) return;
    if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  document.addEventListener("mousedown", onDown);
  document.addEventListener("keydown", onKey);

  return () => {
    document.removeEventListener("mousedown", onDown);
    document.removeEventListener("keydown", onKey);
  };
}, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="OsoonDosoon 홈">
          <div className={styles.logo} aria-hidden>
            <span className={styles.logoMark}>OD</span>
          </div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>OsoonDosoon</div>
            <div className={styles.brandTag}>아파트 커뮤니티</div>
          </div>
        </Link>

        {/* 햄버거 + 드롭다운 */}
        <div className={styles.menuWrap} ref={menuRef}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="메뉴"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon />
          </button>

          {open && (
            <div className={styles.dropdown} role="menu" aria-label="헤더 메뉴">
              <NavLink
                to="/boards"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
                }
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuIcon} aria-hidden>🗂️</span>
                게시판
              </NavLink>
              <NavLink
                to="/boards/new"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menuItem} ${styles.primary} ${styles.active}`
                    : `${styles.menuItem} ${styles.primary}`
                }
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuIcon} aria-hidden>✍️</span>
                글쓰기
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
