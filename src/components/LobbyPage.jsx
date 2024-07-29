import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCodeBlocks from '../functions/codeBlocks/fetchAllCodeBlocks';

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    getCodeBlocks(setCodeBlocks);
  }, []);

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            <Link to={`/codeblock/${block.id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
