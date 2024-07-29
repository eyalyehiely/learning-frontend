import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCodeBlocks from '../functions/codeBlocks/fetchAllCodeBlocks';
import 'bootstrap/dist/css/bootstrap.min.css';

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    getCodeBlocks(setCodeBlocks);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Choose a Code Block</h1>
      <div className="row">
        {codeBlocks.map((block) => (
          <div key={block.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">{block.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{block.code || 'No description available'}</p>
              </div>
              <div className="card-footer">
                <Link to={`/codeblock/${block.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;