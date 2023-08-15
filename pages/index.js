import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
export default function Home() {
  const [items, setItems] = useState([
    //  { name: "Coffee", price: 40 },
    //  { name: "Movie", price: 140 },
    //  { name: "Pizza", price: 200 }
  ]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);
  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      //setItems({...items, newItem});
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      // Reset netItem after adding to the database
      setNewItem({ name: "", price: "" });
    }
  };
  // Read item from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from ItemArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);
  // delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-red-50`}
    >
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              className="col-span-3 p-3 border font-normal "
              type="text"
              placeholder="Enter Item"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              onClick={addItem}
              className="text-white bg-blue-400 hover:bg-blue-500 p-3 text-xl"
              type="submit"
            >
              Add
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-blue-400"
              >
                <div className="p-4 w-full flex justify-between font-bold text-white">
                  <span className="capitalize ">{item.name}</span>
                  <span>Rs {item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 font-bold text-white border-blue-900 hover:bg-blue-500 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3 font-bold text-white">
              <span>Total </span>
              <span>Rs {total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
