"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([{ name: "", properties: [""] }]);
  const [errors, setErrors] = useState(Array(items.length).fill(""));

  const handleAddNewItem = () => {
    setItems([...items, { name: "", properties: [""] }]);
    setErrors([...errors, ""]);
  };

  const handleAddNewProperty = (itemIndex: number) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].properties.push("");
    setItems(updatedItems);
  };

  const handleItemPropertyChange = (
    itemIndex: number,
    propertyIndex: number,
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].properties[propertyIndex] = value;
    setItems(updatedItems);
  };

  const handleItemTextChange = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index].name = value;
    setItems(updatedItems);

    // remove the error if any item
    const newErrors: string[] = [...errors];
    newErrors[index] = value.trim() === "" ? "Please fill item name" : "";
    setErrors(newErrors);
  };

  const handleItemPropertyOnFocus = (itemIndex: number) => {
    console.log("focused");
    const value: string = items[itemIndex].name;
    const newErrors: string[] = [...errors];
    newErrors[itemIndex] = value.trim() === "" ? "Please fill item name" : "";
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    // Your submit logic here
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-16 text-4xl">Automated Item List Maker</h1>

      <div className="flex w-9/12 justify-between">
        <div className="flex flex-col mr-16 w-5/12 min-w-fit">
          <h2 className="mb-8 text-2xl">Place your input</h2>
          <>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border border-solid border-slate-400 p-4 mb-8"
              >
                <input
                  type="text"
                  placeholder="Item name"
                  className="p-2 mb-4"
                  value={item.name}
                  onChange={(e) => handleItemTextChange(index, e.target.value)}
                />
                {errors[index] && (
                  <p style={{ color: "red" }}>{errors[index]}</p>
                )}
                {item.properties.map((property, propertyIndex) => (
                  <input
                    key={propertyIndex}
                    type="text"
                    placeholder={`Item property ${propertyIndex + 1}`}
                    className="p-2 mb-2"
                    value={property}
                    onChange={(e) =>
                      handleItemPropertyChange(
                        index,
                        propertyIndex,
                        e.target.value
                      )
                    }
                    onFocus={() =>
                      propertyIndex === 0 && handleItemPropertyOnFocus(index)
                    }
                  />
                ))}
                <button
                  className="bg-white border-2 border-blue-900 text-blue-900 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-100 active:bg-blue-200"
                  onClick={() => handleAddNewProperty(index)}
                >
                  Add new property
                </button>
              </div>
            ))}
          </>
          <button
            className="bg-white border-2 border-blue-900 text-blue-900 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-100 active:bg-blue-200 mb-8"
            disabled={errors.some((error) => error !== "")}
            onClick={handleAddNewItem}
          >
            Add new item
          </button>
          {/* <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green-800"
            onClick={handleSubmit}
            disabled={errors.some((error) => error !== "")}
          >
            Submit
          </button> */}
        </div>
        <div className="w-7/12">
          <h2 className="mb-8 text-2xl">Generated List</h2>
          <div>
            {items.map((item, itemIdx) => (
              <div key={itemIdx}>
                {item.properties.map((prop, propIdx) => (
                  <div key={propIdx} className="flex">
                    <div className="mr-1">{item.name}</div>
                    <div>{prop && `(${prop})`}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
