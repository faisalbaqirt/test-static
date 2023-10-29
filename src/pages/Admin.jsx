import React, { useState } from 'react';
import ProductList from '../components/ProductList'; // Impor komponen ProductList
import OrderList from '../components/OrderList'; // Impor komponen OrderList


function Admin() {
  const [selectedTab, setSelectedTab] = useState('product'); // State untuk melacak tab yang dipilih

  return (
    <div className="admin-page">
      <div className="sidebar">
        <ul>
          <li
            className={selectedTab === 'product' ? 'active' : ''}
            onClick={() => setSelectedTab('product')}
          >
            Product List
          </li>
          <li
            className={selectedTab === 'order' ? 'active' : ''}
            onClick={() => setSelectedTab('order')}
          >
            Order List
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedTab === 'product' && <ProductList />}
        {selectedTab === 'order' && <OrderList />}
      </div>
    </div>
  );
}

export default Admin;
