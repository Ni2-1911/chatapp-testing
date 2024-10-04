import { renderHook, act } from "@testing-library/react";
import useSelectedContactReducer from "../SelectedContactReducer";
import { UserIdKey } from "@app/types/type.common";

describe("useSelectedContactReducer", () => {
  it("should initialize with null contact selected", () => {
    const { result } = renderHook(() => useSelectedContactReducer());
    expect(result.current.contactSelected).toBeNull();
  });

  it("should set contact selected", () => {
    const { result } = renderHook(() => useSelectedContactReducer());
    const id: UserIdKey = "user_id_0000";
    const mockContact = { id, name: "test user", profileImg: "" };
    act(() => {
      result.current.handleContactSelected(mockContact);
    });
    expect(result.current.contactSelected).toEqual(mockContact);
  });

  it("should update contact selected", () => {
    const { result } = renderHook(() => useSelectedContactReducer());
    const id1: UserIdKey = "user_id_0000";
    const id2: UserIdKey = "user_id_0001";
    const firstContact = { id: id1, name: "test user 1", profileImg: "" };
    const secondContact = { id: id2, name: "test user 2", profileImg: "" };
    act(() => {
      result.current.handleContactSelected(firstContact);
    });
    expect(result.current.contactSelected).toEqual(firstContact);

    act(() => {
      result.current.handleContactSelected(secondContact);
    });
    expect(result.current.contactSelected).toEqual(secondContact);
  });
});
