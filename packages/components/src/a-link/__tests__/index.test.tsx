import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import ALink from '../index';

describe('suite ALink', () => {
  // Default on import: runs it after each test.
  afterEach(() => {
    cleanup();
  });

  it('renders base', () => {
    const { container } = render(
      <ALink href="https://bizk.qhan.wang/">Click me!</ALink>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders click', () => {
    const { container } = render(
      <ALink onClick={() => console.log('Click!')}>Click me!</ALink>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders target', () => {
    const { container } = render(
      <ALink target="_blank" href="https://bizk.qhan.wang/">
        Click me!
      </ALink>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders to', () => {
    const { container } = render(
      <BrowserRouter>
        <ALink target="_blank" to={{ pathname: '/blank' }}>
          Click me!
        </ALink>
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders disabled ALink component', () => {
    const { container } = render(
      <ALink href="https://bizk.qhan.wang/" disabled>
        Click me!
      </ALink>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders Button ALink component', () => {
    const { container } = render(
      <ALink href="https://bizk.qhan.wang/" button={{ type: 'primary' }}>
        Click me!
      </ALink>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders ALink component', () => {
    render(<ALink href="https://bizk.qhan.wang/">Click me!</ALink>);

    expect(screen.getByText('Click me!')).toBeTruthy();
  });
});
