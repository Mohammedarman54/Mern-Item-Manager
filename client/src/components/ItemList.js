// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchItems = async () => {
    const response = await axios.get('/api/items');
    setItems(response.data);
  };

  const addItem = async () => {
    if (itemName.trim()) {
      const response = await axios.post('/api/items', { name: itemName });
      setItems([...items, response.data]);
      setItemName('');
    }
  };

  const editItem = async () => {
    if (editName.trim()) {
      const response = await axios.put(`/api/items/${editId}`, { name: editName });
      setItems(items.map(item => (item._id === editId ? response.data : item)));
      setEditId(null);
      setEditName('');
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Item Manager</h1>

      {/* Add Item Input */}
      <div className="input-group">
        <input
          className="input-field"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
        />
        <button className="btn add-btn" onClick={addItem}>Add</button>
      </div>

      {/* Edit Item Input */}
      {editId && (
        <div className="input-group">
          <input
            className="input-field"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Edit name"
          />
          <button className="btn update-btn" onClick={editItem}>Update</button>
          <button className="btn cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
        </div>
      )}

      {/* Items List */}
      <ul className="items-list">
        {items.map(item => (
          <li className="item" key={item._id}>
            <span>{item.name}</span>
            <div className="button-group">
              <button
                className="btn edit-btn"
                onClick={() => {
                  setEditId(item._id);
                  setEditName(item.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
