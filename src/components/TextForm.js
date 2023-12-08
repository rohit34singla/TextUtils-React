// import React, { useState } from "react";

// export default function TextForm(props) {
//   const handleUpClick = () => {
//     let newText = text.toUpperCase();
//     setText(newText);
//   };

//   const handleLoClick = () => {
//     let newText = text.toLowerCase();
//     setText(newText);
//   };

//   const handleClearClick = () => {
//     let newText = " ";
//     setText(newText);
//   };

//   const handleOnChange = (event) => {
//     setText(event.target.value);
//   };

//   const handleDownloadClick = () => {
//     const blob = new Blob([text], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "text.txt";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleCopyClick = () =>{
//     console.log("I am copy")
//     var text = document.getElementById("myBox")
//     text.select();
//     navigator.clipboard.writeText(text.value);
//   }

//   const [text, setText] = useState(" ");

//   const wordCount = text.split(" ").filter((word) => word !== "").length;

//   return (
//     <>
//       <div className="container">
//         <h1>{props.heading} </h1>
//         <div className="mb-3">
//           <textarea
//             className="form-control"
//             value={text}
//             onChange={handleOnChange}
//             id="myBox"
//             rows="8"
//           ></textarea>
//         </div>
//         <button className="btn btn-primary mx-1" onClick={handleUpClick}>
//           Convert to Uppercase
//         </button>
//         <button className="btn btn-primary mx-1" onClick={handleLoClick}>
//           Convert to Lowercase
//         </button>
//         <button className="btn btn-primary mx-1" onClick={handleClearClick}>
//           Clear Text
//         </button>
//         <button className="btn btn-primary mx-1" onClick={handleDownloadClick}>
//           Download Text
//         </button>
//         <button className="btn btn-primary mx-1" onClick={handleCopyClick}>
//           Copy Text
//         </button>
//       </div>
//       <div className="container my-3">
//         <h2>Your text summary</h2>
//         <p>
//           {wordCount} words and {text.length} characters
//         </p>
//         <p>{0.008 * wordCount} Minutes read</p>
//         <h2>Preview</h2>
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }
// or

import React, { useState } from "react";

export default function TextForm(props) {
  
  const [text, setText] = useState("");
  const [notification, setNotification] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "Success")
    setNotification("Text converted to uppercase!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase", "Success")
    setNotification("Text converted to lowercase!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleClearClick = () => {
    let newText = " ";
    setText(newText);
    props.showAlert("Text Cleared", "Success")
    setNotification("Text cleared!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleDownloadClick = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    props.showAlert("Text Downloaded", "Success")
    setNotification("Text downloaded!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleCopyClick = () => {
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Text Copied", "Success")
    setNotification("Text copied to clipboard!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleRemoveSpacesClick = () => {
    let newText = text.replace(/\s+/g, " "); // Replace consecutive spaces with a single space
    setText(newText);
    props.showAlert("Removed Extra Spaces", "Success")
    setNotification("Extra spaces removed!");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.split(/\s+/).filter((word) => word !== "").length;
  // or 
  // const wordCount = text.split(" ").filter((element) => {return element.length!==0}).length}

  return (
    <>
      <div className="container" style={{backgroundColor: props.mode==='dark'?'white':'grey'}}>
        <h1 className="my-2">{props.heading} </h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{backgroundColor: props.mode==='dark'?'#adb5bd':'white', color: props.mode==='dark'?'white':'black'}}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>
          Clear Text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleDownloadClick}>
          Download Text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>
          Copy Text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleRemoveSpacesClick}>
          Remove Extra Spaces
        </button>
      </div>
      <div className="container my-3" style={{backgroundColor: props.mode==='dark'?'white':'grey'}}>
        <h2>Your text summary</h2>
        <p>
          {wordCount} words and {text.length} characters
        </p>
        <p>{0.008 * wordCount} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to Preview."}</p>
        <div className="notification">{notification}</div>
      </div>
    </>
  );
}