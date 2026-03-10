import { useState } from 'react'
import './App.css'

// const initialItems = [{id:1, description : "shirt", quantity: 2, packed: false}, {id:2, description : "charger", quantity: 1, packed: true}];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items)=> [...items, item]);
  }
  
  function handleClear(id) {
    setItems(()=> items.filter(item=> item.id!=id));
  }

  function handleToggleItem(id) {
    setItems(items=> items.map(item=> item.id===id? {...item, packed:!item.packed}: item));
  }
  return (
    <div className='app'>
      <Logo />
      <Form handleAddItems={handleAddItems}/> 
      <PackingList items={items} handleClear={handleClear} handleToggleItem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  )
}

export default App

function Logo() {
  return <h1 className='logo'>🌴Travel Packlist🧳</h1>
}

function Form({handleAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  function handleSubmit(e) {
    e.preventDefault();
    if(!description) return;
    const newItem = {id:Date.now(), description, quantity, packed:false};
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  
  return <form className='form' onSubmit={handleSubmit}>
    <span>Pack things for your travel </span>
    <input type='text' placeholder="items.." className='inputs' value={description} onChange={(e)=> setDescription(e.target.value)}/>
    <select className='inputs' value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
      {Array.from({length:10}, (_, i)=> i+1).map((cur,i)=> <option key={i}>{cur}</option>)}
    </select>
    <button className='inputs'>Add</button>
  </form>
}

function PackingList({items, handleClear, handleToggleItem}) {
  return <div className='list'>{items.map((item)=> <Item item={item} handleClear={handleClear} handleToggleItem={handleToggleItem} key={item.id}/>)}</div>
}

function Item({item, handleClear, handleToggleItem}) {
  return <div>
    <input type="checkbox" value={item.packed} onChange={()=> handleToggleItem(item.id)}/>
    <span style={item.packed? {textDecoration:"line-through"}:{}}> {item.quantity} {item.description}</span> <span onClick={()=>handleClear(item.id)}>❌</span>
  </div>
  
}

function Stats({items}) {
  const total = items.length;
  const packedItems = items.filter(item=> item.packed).length;

  return <footer className='stats'>
    {`You have ${total} items on your List and you already packed ${packedItems} items`}
  </footer>
}