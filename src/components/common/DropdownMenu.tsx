import { ReactNode } from "react";

export default function DropdownMenu({ children }: { children: ReactNode }) {
  return (
    <details>
      <summary data-testid="dropdown-summary">
        <i className="bx bx-chevron-down bx-sm"></i>
      </summary>
      <div className="util">
        <ul className="utilList">{children}</ul>
      </div>
    </details>
  );
}
