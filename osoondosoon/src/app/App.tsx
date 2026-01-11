import { Route, Routes } from "react-router-dom";
import BoardsListPage from "@/pages/BoardsListPage";
import BoardDetailPage from "@/pages/BoardDetailPage";
import BoardFormPage from "@/pages/BoardFormPage";
import HomePage from "@/pages/HomePage";
import Header from "@/shared/ui/Header"

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsListPage />} />
        <Route path="/boards/new" element={<BoardFormPage mode="create" />} />
        <Route path="/boards/:id" element={<BoardDetailPage />} />
        <Route path="/boards/:id/edit" element={<BoardFormPage mode="edit" />} />
      </Routes>
    </div>
  );
}
