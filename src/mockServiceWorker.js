import { rest } from 'msw';
import { setupServer } from 'msw/node';

const resolver = jest.fn()

const server = setupServer(
  rest.post('/getTodos', (req, res, ctx) => {
    return res(
      ctx.json({
        todos: "server response",
      })
    );
  }),

  rest.post('/cart', resolver)

);

export { server, resolver };