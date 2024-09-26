import React from 'react';

//created with help from Claud AI
const InventoryCounts = ({ inventory = [], facts = [] }) => {
  const countMap = inventory.reduce((count, item) => {
    count[item] = (count[item] || 0) + 1;
    return count;
  }, {});

  return (
    <div className="inventory-counts">
      {/* inventory items */}
      {inventory.length > 0 && (
        <div className="inventory-items">
          {/* <h3>Inventory:</h3> */}
          <ul>
            {Object.entries(countMap).map(([item, count]) => (  //AI was used for this line Object.entries()
              <li key={item}>
                {item} x{count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* collected facts */}
      {facts.length > 0 && (
        <div className="collected-facts">
          <h3>Collected Facts:</h3>
          <ul>
            {facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryCounts;
