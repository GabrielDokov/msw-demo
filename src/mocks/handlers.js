// src/mocks/handlers.js
import { rest } from "msw";

const initialUsersData = [{ id: 1, username: "admin" }];

export const handlers = [
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(initialUsersData));
  }),

  rest.post("/users", async (req, res, ctx) => {
    const body = await req.json();

    const newUser = {
      ...body,
      id: Date.now(),
    };

    initialUsersData.push(newUser);
    return res(ctx.status(200), ctx.json(newUser));
  }),

  rest.delete("/users/:id", (req, res, ctx) => {
    const { id } = req.params;

    const index = initialUsersData.findIndex((user) => user.id === id);
    initialUsersData.splice(index, 1);
    return res(ctx.status(200), ctx.json({ deleteId: id }));
  }),

  rest.put("/users/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    const updatedUser = initialUsersData.reduce((acc, curr) => {
      if (curr.id === id) {
        return { ...curr, ...body };
      }
      return curr;
    });

    console.log(updatedUser);
    // console.log(updatedUser)

    return res(ctx.status(200), ctx.json(updatedUser));
  }),
];
