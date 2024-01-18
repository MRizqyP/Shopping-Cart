"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import Image from "next/image";
import {
  increment,
  decrement,
  incrementByAmount,
  totalAmount,
  removeItem,
} from "../lib/features/cart/cartSlice";

export default function Home() {
  //useSelector gets the state from store
  const data = useAppSelector((state) => state.cart); // Access the counter state

  const [total, setTotal] = useState(
    data.items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0)
  );

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useAppDispatch();

  // console.log(sum);

  return (
    <div>
      <div className=" text-center mb-6 mt-6">
        <span className="text-3xl">Shopping Cart</span>
      </div>
      <div className="grid grid-cols-3 gap-4" style={{ padding: 10 }}>
        <div className="row-span-3 col-span-2 bg-white p-6 border-2 shadow-xl rounded-lg">
          <p>Cart ({data.items.length} Items)</p>
          {data.items.map((datas, idx) => {
            return (
              <>
                <div className="flex flex-row">
                  <img
                    src={datas.imageUrl}
                    className="h-auto max-w-full"
                    alt="baju"
                  />
                  <div className="pl-6 basis-1/2">
                    <p>{datas.name}</p>
                    <p>{datas.typeData}</p>
                    <p>Color : {datas.color}</p>
                    <p>Size : {datas.size}</p>
                    <div className="flex">
                      <div
                        className="flex flex-row items-center"
                        onClick={() => {
                          dispatch(removeItem(datas.id));
                        }}
                      >
                        <img
                          src={"/trash-can.png"}
                          className="h-4 w-4 mr-2"
                          alt="baju"
                        />
                        <p>Remove Item</p>
                      </div>
                      <div className="flex flex-row items-center ml-2">
                        <img
                          src={"/wishlist.png"}
                          className="h-4 w-4 mr-2"
                          alt="baju"
                        />
                        <p>Move To Whislist</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-stretch w-32">
                    <div className="flex flex-row h-10 w-full rounded-lg relative mt-1 bg-green-500">
                      <button
                        onClick={() => dispatch(decrement(idx))}
                        className="bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      >
                        <span className="m-auto text-2xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        className="outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                        name="custom-input-number"
                        value={datas.count}
                      />
                      <button
                        onClick={() => {
                          dispatch(increment(idx));
                          setTotal(
                            data.items.reduce((accumulator, currentItem) => {
                              return accumulator + currentItem.price;
                            }, 0)
                          );
                        }}
                        className="bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                      >
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                    <div className="flex self-end">
                      <p>${datas.price * datas.count}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 my-4"></div>
              </>
            );
          })}
        </div>
        <div className=" bg-white p-4 rounded-lg shadow-xl border-2">
          <span>The total amount of</span>
          <div className="flex justify-between">
            <span>Temporary Amount</span>
            <span>${data.totalPayment}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Gratis</span>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between">
            <span className="flex-1">The total amount of (including VAT)</span>
            <span className="flex-1 text-right">Gratis</span>
          </div>
          <button className="bg-blue-500 p-4 w-full mt-4 ">
            GO TO CHECKOUT
          </button>
        </div>
        <div className=" bg-white p-4 rounded-lg shadow-xl border-2">
          <span>The total amount of</span>
          <div className="flex justify-between">
            <span>Temporary Amount</span>
            <span>$53.90</span>
          </div>
        </div>
      </div>
    </div>
  );
}
