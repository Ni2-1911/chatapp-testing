import { renderHook, act } from "@testing-library/react";
import useViewModeReducer from "../ViewModeReducer";

describe("useViewModeReducer", () => {
  it("should initialize with default view mode", () => {
    const { result } = renderHook(() => useViewModeReducer());
    expect(result.current.viewMode).toBe("spacious");
  });
  it("should toggle view mode to compact", () => {
    const { result } = renderHook(() => useViewModeReducer());
    act(() => {
      result.current.toggleMode("spacious");
    });
    expect(result.current.viewMode).toBe("compact");
  });

  it("should toggle view mode back to spacious", () => {
    const { result } = renderHook(() => useViewModeReducer());
    act(() => {
      result.current.toggleMode("spacious");
    });
    act(() => {
      result.current.toggleMode("compact");
    });
    expect(result.current.viewMode).toBe("spacious");
  });
});
