import { fetchFileList, fetchFileContent, uploadFile, deleteFile, updateFile } from "./functions/call-api.js";
import { createUploadSection, createTextBox, createNewTableRow as createRowsFromFileData } from "./functions/expand-html.js";

const baseUrl = "http://localhost:6060";

const main = async () => {                // be kell burkolni az await-et egy asyncbe, mert csak azon belül működik
  /* ------------------------ FILE TABLE ------------------------ */
  let promise = fetchFileList(baseUrl);   // ez kb egy task v todo, "ezt kell csinálni"
  let fileList = await promise;           // az await indítja a munkát és meg is várja az eredményt, az async kód sync lesz
  let fileListArray = fileList.match(/[[a-zA-Z0-9]+\.srt*/gm);
  
  createRowsFromFileData("files-table", fileListArray);

  

  /* ------------------------ UPLOAD SECTION ------------------------ */
  // const form = document.getElementById("upload-form");

  // const fileNameLabel = document.createElement("label");
  //   Object.assign(fileNameLabel, {
  //     className: "form-element",
  //     innerText: "Filename",
  //     id: "",
  //     // onclick: function () {}
  //   });
  // const fileNameTextBox = document.createElement("input");
  //   Object.assign(fileNameTextBox, {
  //     className: "form-element",
  //     type: "text",
  //     id: "filename-upload-field"
  //   });
  // const titleLabel = document.createElement("label");
  //   Object.assign(titleLabel, {
  //     className: "form-element",
  //     innerText: "Title",
  //     id: "",
  //   });
  // const titleTextBox = document.createElement("input");
  //   Object.assign(titleTextBox, {
  //     className: "form-element",
  //     type: "text",
  //     id: ""
  //   });
  // const imdbLabel = document.createElement("label");
  //   Object.assign(imdbLabel, {
  //     className: "form-element",
  //     innerText: "Imdb",
  //     id: "",
  //   });
  // const imdbTextBox = document.createElement("text");
  //   Object.assign(imdbTextBox, {
  //     type: "text",
  //     className: "form-element",
  //     id: "",
  //   });
  // const fileUploadField = document.createElement("file");
  //   Object.assign(fileUploadField, {
  //     className: "form-element",
  //     accept: ".srt",
  //     id: "file-upload-field"
  //   });
  // const fileuploadButton = document.createElement("submit");
  //   Object.assign(fileuploadButton, {
  //     type: "submit",
  //     className: "form-element",
  //     id: ""
  //   });
    
  // form.appendChild(fileNameLabel)
  // form.appendChild(fileNameTextBox)
  // form.appendChild(titleLabel)
  // form.appendChild(titleTextBox)
  // form.appendChild(imdbLabel)
  // form.appendChild(imdbTextBox)
  // form.appendChild(fileUploadField)
  // form.appendChild(fileuploadButton)

  
  const uploadField = document.getElementById("file-upload-field");
  
  // uploadField.addEventListener("change", () => {
    if (document.getElementById("file-submit-button")) {
      document.getElementById("file-submit-button").remove();
    }
    
    createUploadSection("upload-form");
    let uploadButton = document.getElementById("file-submit-button");

    // let form = new FormData();
    // form.append("file", uploadField.files[0], "filename");
    // /* TODO: ezeket elmenteni json-ba */    
    // form.append("title", "this is title");
    // form.append("imdbscore", 5.5);
    // // for (const pair of form.entries()) {
    //   // console.log(`${pair[0]}, ${pair[1]}`);
    // // }

    uploadButton.onclick = () => {
      uploadFile(baseUrl, form);
    };
  // });
};

main();