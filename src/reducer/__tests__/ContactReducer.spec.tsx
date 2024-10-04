import { renderHook, act } from "@testing-library/react";
import useContactReducer from "../ContactReducer";
import { DEFAULT_USER } from "@app/constants/constant.common";

describe("useContactReducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default contacts", () => {
    const { result } = renderHook(() => useContactReducer());
    expect(result.current.contacts).toEqual(DEFAULT_USER);
  });

  it("should add a new contact", () => {
    const { result } = renderHook(() => useContactReducer());
    act(() => {
      result.current.addContact("test user");
    });
    expect(result.current.contacts).toHaveLength(2);
    expect(result.current.contacts).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "test user" })])
    );
  });

  it("should delete a contact", () => {
    const { result } = renderHook(() => useContactReducer());
    act(() => {
      result.current.addContact("test user");
    });
    const contactIdToDelete = result.current.contacts[1].id;
    act(() => {
      result.current.deleteContact(contactIdToDelete);
    });
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: contactIdToDelete }),
      ])
    );
  });

  it("should persist contacts in localStorage", () => {
    const { result } = renderHook(() => useContactReducer());
    act(() => {
      result.current.addContact("test user");
    });
    const savedContacts = JSON.parse(localStorage.getItem("contacts")!);
    expect(savedContacts.contacts).toHaveLength(2);
  });
});
