import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../user/user-card";

describe("UserCard Component", () => {
  const mockProps = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150",
    onClick: jest.fn(),
  };

  it("renders name and email", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<UserCard {...mockProps} />);
    fireEvent.click(screen.getByText(/john doe/i));
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
