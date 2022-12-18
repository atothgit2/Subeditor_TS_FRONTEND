import { fetchFileList, uploadFile, deleteFile, updateFile } from "./interactions/api.js";
import { createUploadSection, createTextBox, createNewTableRow } from "./interactions/html.js";

const baseUrl = "http://localhost:6060";

const main = async () => {                // be kell burkolni az await-et egy asyncbe, mert csak azon belül működik
  /* ------------------------ FILE LIST ------------------------ */
  let promise = fetchFileList(baseUrl);   // ez kb egy task v todo, "ezt kell csinálni"
  let fileList = await promise;           // az await indítja a munkát és meg is várja az eredményt, az async kód sync lesz
  let fileListArray = fileList.match(/[[a-zA-Z0-9]+\.srt*/gm);
  
  if (fileListArray != null) {
    for (let i = 0; i < fileListArray.length; i++) {
      createNewTableRow(baseUrl, "files-table", fileListArray[i]);
    }
  } else {
    let table = document.getElementById("files-table");
    let body = table.getElementsByTagName("tbody")[0];
    let row = body.insertRow(-1);
    let cell = row.insertCell(0);
    cell.colSpan = table.rows[0].cells.length;
    cell.innerText = "No data!";
    cell.style.textAlign = "center";
  }

  /* ------------------------ UPLOAD ------------------------ */
  const uploadField = document.getElementById("file-upload-field");
  uploadField.addEventListener("change", () => {
    if (document.getElementById("file-submit-button")) {
      document.getElementById("file-submit-button").remove();
    }

    let form = new FormData();
    form.append("file", uploadField.files[0], "filename");
    /* TODO: ezeket elmenteni json-ba */    
    form.append("title", "this is title");
    form.append("imdbscore", 5.5);
    // for (const pair of form.entries()) {
      // console.log(`${pair[0]}, ${pair[1]}`);
    // }

    createUploadSection("file-upload-field");
    let uploadButton = document.getElementById("file-submit-button");

    uploadButton.onclick = () => {
      uploadFile(baseUrl, form);
    };
  });
};

main();