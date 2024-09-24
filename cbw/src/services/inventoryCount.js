import React from 'react';
//created with help from Claud AI
const InventoryCounts = ({ inventory }) => {
  const countMap = inventory.reduce((count, item) => {
    count[item] = (count[item] || 0) + 1;
    return count;
  }, {});
  
  return (
    <ul>
      {Object.entries(countMap).map(([item, count]) => ( //AI was used for this line Object.entries()
        <li key={item}>
          {item} x{count}
        </li>
      ))}
    </ul>
  );
};

export default InventoryCounts;