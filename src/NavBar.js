import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors";

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const NavBar = () => {
  const [padding, setPadding] = useState(15);

  return (
    <header
      role="link"
      tabIndex={0}
      onKeyPress={() => {}}
      onClick={() => setPadding(padding + 2)}
      css={css`
        background-color: ${colors.secondary};
        padding: ${padding}px;
        margin-bottom: 25px;
        border-radius: 5px;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        role="img"
        aria-label="logo"
        css={css`
          font-size: 50px;
          display: inline-block;
          animation: 3s ${spin} linear infinite;
          &:hover {
            animation: 3s ${spin} linear infinite reverse;
          }
        `}
      >
        🐶
      </span>
    </header>
  );
};

export default NavBar;
