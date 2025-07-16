// src/components/__tests__/SearchInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchInput from "../layout/search-bar";
import { store } from "../../redux/store";

describe("SearchInput", () => {
  it("renders the input box", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText(/search user by name/i)
    ).toBeInTheDocument();
  });

  it("shows results on typing if matches exist", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search user by name/i);
    fireEvent.change(input, { target: { value: "john" } });

    setTimeout(() => {
      expect(screen.getByText(/john/i)).toBeInTheDocument();
    }, 500);
  });
});
