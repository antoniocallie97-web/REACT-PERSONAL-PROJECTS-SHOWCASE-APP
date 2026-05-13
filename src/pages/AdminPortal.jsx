import { useState } from "react";
import SearchBar from "../components/SearchBar";

function AdminPortal() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1>Admin Portal</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
    </div>
  );
}

export default AdminPortal;
