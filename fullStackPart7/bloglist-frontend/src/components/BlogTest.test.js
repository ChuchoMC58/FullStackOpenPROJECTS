import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

//screen.debug(element)

test("testing blog form", async () => {
  const user = userEvent.setup();

  const mockHandler = jest.fn();
  render(<BlogForm handleBlog={mockHandler} />);

  const input = screen.getByPlaceholderText("placeholder");
  const button = screen.getByText("Save");

  await user.type(input, "form..");

  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].author).toBe("form..");
});

describe("frontEnd tests", () => {
  const blog = {
    title: "test",
    author: "Me",
    likes: 10,
    url: "somewhere",
  };

  const mockHandler = jest.fn();

  let container;

  beforeEach(() => {
    container = render(
      <Blog blog={blog} incrLikeByOne={mockHandler} />,
    ).container;
  });

  test("clicking likes twice", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("show more");
    await user.click(button);

    const likeButton = container.querySelector(".likeButton");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("user-event clicking a button to show more", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("show more");
    await user.click(button);

    screen.getByText("url:", { exact: false });
  });

  test("using CssSelectors", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("test");
  });

  test("using Screen", () => {
    const element = screen.getByText("Me");

    expect(element).toBeDefined();
  });
});
