import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import type { ButtonProps } from 'antd';
import type { LinkProps } from 'antd/es/typography/Link';

import queryString from 'query-string';
import type { ParsedQuery } from 'query-string';

type ALinkProps = LinkProps & {
  to?: { pathname?: string; search?: string; query?: ParsedQuery };
  state?: any;
  button?: ButtonProps | false;
};

const ALink: React.FC<ALinkProps> = ({ children, to, button, ...other }) => {
  const { pathname, search, query } = to || {};

  const childElem = button ? (
    <Button {...button} disabled={other?.disabled}>
      {children}
    </Button>
  ) : (
    children
  );

  return to && !other.disabled ? (
    <Link
      to={{
        pathname,

        search: [search, queryString.stringify(query || {})]
          .filter((c) => c)
          .join('&'),
      }}
      // component={Typography.Link}
      {...other}
    >
      {childElem}
    </Link>
  ) : (
    <Typography.Link {...other}> {childElem}</Typography.Link>
  );
};

export default ALink;
