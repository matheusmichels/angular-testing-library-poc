import { HttpClientModule } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  it('should create', async () => {
    await render(UsersListComponent, {
      imports: [HttpClientModule],
    });

    screen.debug();
  });

  describe('Fetch Users', () => {
    it('should complete users request', async () => {
      await render(UsersListComponent, {
        imports: [HttpClientModule],
      });

      userEvent.click(screen.getByTestId('fetch-users'));

      await screen.findByTestId('request-loading');
      await screen.findByTestId('users-list');

      const error = screen.queryByTestId('request-error');
      expect(error).not.toBeInTheDocument();
    });

    it('should fail users request', async () => {
      server.use(
        rest.get('https://jsonplaceholder.typicode.com/users', (_req, res, ctx) => res(ctx.status(500)))
      );

      await render(UsersListComponent, {
        imports: [HttpClientModule],
      });

      userEvent.click(screen.getByTestId('fetch-users'));

      await screen.findByTestId('request-loading');
      await screen.findByTestId('request-error');

      const list = screen.queryByTestId('users-list');
      expect(list).not.toBeInTheDocument();
    });
  });
});
