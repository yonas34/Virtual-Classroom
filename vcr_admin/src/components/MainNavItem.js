import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import React from 'react';

const MainNavItem = ({
  href,
  icon: Icon,
  title,
  onClickHandler,
  expanded
  ,
  ...rest
}) => {
  const location = useLocation();
console.log(typeof(onClickHandler));
  const active = href ? !!matchPath({
    path: href,
    end: false
  }, location.pathname) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
       to={href}
        onClick={onClickHandler}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

MainNavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  onClickHandler:PropTypes.func,
  expanded:PropTypes.bool

};

export default MainNavItem;
