import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DialogBox from "../DialogBox";
import { DialogBoxProp } from "@app/types/type.props";
import { DIALOG_BOX_DATA } from "@app/constants/constant.common";

describe("DialogBox", () => {
  const closeDialogMock = jest.fn();
  const dialogActionMock = jest.fn();

  const defaultProps: DialogBoxProp = {
    isOpen: false,
    closeDialog: closeDialogMock,
    dialogAction: dialogActionMock,
    actionType: "editMessage",
    viewData: DIALOG_BOX_DATA.editMessage,
  };
  const mockShowModal = jest.fn();
  const mockClose = jest.fn();

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = mockShowModal;
    window.HTMLDialogElement.prototype.close = mockClose;
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(<DialogBox {...defaultProps} />);
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("renders the dialog when isOpen is true", () => {
    render(<DialogBox {...{ ...defaultProps, isOpen: true }} />);
    const dialogElement = screen.getByTestId("dialog-box");
    expect(dialogElement).toBeInTheDocument();
  });

  it("calls closeDialog when cancel button is clicked", () => {
    render(<DialogBox {...{ ...defaultProps, isOpen: true }} />);
    fireEvent.click(screen.getByText(/cancel/i));
    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("calls dialogAction with input value when action button is clicked", () => {
    render(<DialogBox {...{ ...defaultProps, isOpen: true }} />);
    const inputElement = screen.getByPlaceholderText("Enter something");

    fireEvent.change(inputElement, { target: { value: "Test input" } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(dialogActionMock).toHaveBeenCalledWith("Test input");
    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });
});
