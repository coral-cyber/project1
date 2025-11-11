import React, { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [pass, setPass] = useState("");

  const passGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "1234567890";
    if (charAllow) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numAllow, charAllow, setPass]);

  //useRef part1
  const PassRef = useRef(null);

  //useRef part3
  const copy = useCallback(() => {
    PassRef.current?.select();

    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passGenerater();
  }, [length, numAllow, charAllow, setPass]);

  return (
    <div
      className=" w-full flex-auto max-w-md mx-auto  shadow-md rounded-lg px-4 bg-gray-500
  "
    >
      <h1 className=" text-4xl  text-amber-300">PASSWORD GENERATER</h1>
      <>
        <input
          type="text"
          placeholder="type"
          value={pass}
          className="outline-2 bg-amber-700 w-3/4 px-3 my-2"
          readOnly
          //useRef part2
          ref={PassRef}
        />
        <button
          className="bg-amber-300 w-1/4 hover:text-blue-900 font-semibold cursor-pointer"
          onClick={copy}
        >
          COPY
        </button>
      </>
      <div>
        <input
          type="range"
          value={length}
          min={6}
          max={100}
          onChange={(e) => setLength(e.target.value)}
          className="cursor-pointer"
        ></input>
        <label>Length : {length}</label>

        <input
          type="checkbox"
          className=" gap-3 m-3 p-3 "
          defaultChecked={setNumAllow}
          id="NumberInput"
          onChange={(e) => setNumAllow((prev) => !prev)}
        ></input>
        <label htmlFor="NumberInput">Numbers</label>

        <input
          type="checkbox"
          className=" gap-3 m-3 p-3 "
          defaultChecked={setCharAllow}
          id="CharInput"
          onChange={(e) => setCharAllow((prev) => !prev)}
        ></input>
        <label htmlFor="CharInput">Charectors</label>
      </div>
    </div>
  );
}

export default App;
