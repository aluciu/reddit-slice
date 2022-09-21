import React from 'react';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

import CommentsList from './CommentsList';

describe('CommentsList', () => {
  test('renders empty list', () => {
    render(<CommentsList comments={[]} />);

    expect(screen.getByRole("heading")).toHaveTextContent(/No comments here/);
  });

  test('renders list', () => {
    const comments = [
      {
        id: "1",
        created: "1663755650",
        author: "author",
        body_html: "<p>body</p>"
      },
      {
        id: "2",
        created: "1632219645",
        author: "name",
        body_html: "<p>body 2</p>"
      }
    ];

    render(<CommentsList comments={comments} />);

    expect(screen.getByRole("heading")).toHaveTextContent(/Comments/);
    expect(screen.getByText(dayjs.unix(comments[0].created).format('DD.MM.YYYY'))).toBeInTheDocument();
  });
});