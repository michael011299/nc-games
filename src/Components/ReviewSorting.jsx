import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const ReviewSorting = () => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const handleToggle = () => {
    setSortMenuOpen(!sortMenuOpen);
  };

  const closeMenu = () => {
    setSortMenuOpen(false);
  };

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={sortMenuOpen ? "Open" : "Sort By"}
        onClick={handleToggle}
      >
        <Dropdown.Item href={"sort_by=title&order_by=ASC"} onClick={closeMenu}>
          Title
        </Dropdown.Item>
        <Dropdown.Item href={"?sort_by=votes&order_by=ASC"} onClick={closeMenu}>
          votes
        </Dropdown.Item>
        <Dropdown.Item
          href={"?sort_by=created_at&order_by=ASC"}
          onClick={closeMenu}
        >
          Created at
        </Dropdown.Item>
        <Dropdown.Item
          href={"?sort_by=comment_count&order_by=ASC"}
          onClick={closeMenu}
          exact
        >
          Comment count
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default ReviewSorting;
