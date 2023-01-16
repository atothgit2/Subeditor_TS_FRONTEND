import { fetchFileList, fetchFileContent, uploadFile, deleteFile, updateFile } from "./call-api.js";
const url = "http://localhost:6060";

const createUploadSection = (parentId) => {
  const uploadField = document.getElementById(parentId);

  const uploadButton = document.createElement("input");
  uploadButton.type = "submit";
  uploadButton.value = "Upload";
  uploadButton.id = "file-submit-button";
  uploadButton.for = "file";
  uploadButton.className = "submit-button";
  uploadField.after(document.createElement("br"), uploadButton);

  uploadField.appendChild(uploadButton)
};

const createTextBox = (text) => {
  let form = document.getElementById("upload-form");
  if (
    document.getElementById("content-box") ||
    document.getElementById("update-button")
  ) {
    let textFieldElement = document.getElementById("content-box");
    let updateButtonElement = document.getElementById("update-button");
    textFieldElement.remove();
    updateButtonElement.remove();
  }
  let textbox = form.appendChild(document.createElement("textarea"));
  textbox.id = "content-box";
  textbox.className = "form-element textbox";
  textbox.value = text;

  let updateButton = form.appendChild(document.createElement("input"));
  updateButton.type = "submit";
  updateButton.id = "update-button";
  updateButton.className = "form-element submit-button";
  updateButton.value = "Update";
};

const createNewTableRow = (tableId, fileListArray) => {
  if (fileListArray != null) {
    for (let i = 0; i < fileListArray.length; i++) {
      let table = document.getElementById(tableId);
      let body = table.getElementsByTagName("tbody")[0];
      let row = body.insertRow(-1);
      let filename = fileListArray[i]
      
      for (let j = 0; j < table.rows[0].cells.length; j++) {
        let cell = row.insertCell(j);
        let columnHeader = document.querySelectorAll(".table-header")[j].id;

        switch (columnHeader) {
          case "filename":
            cell.className = "tg-cell filename " + filename;
            cell.innerHTML += filename;
            break;
          case "id":
            cell.className = "tg-cell id " + filename.slice(0, -4);
            cell.innerHTML += "id";
            break;
          case "title":
            cell.className = "tg-cell title " + filename.slice(0, -4);
            cell.innerHTML += "title";
            break;
          case "imdb":
            cell.className = "tg-cell imdb " + filename.slice(0, -4);
            cell.innerHTML += "imdb";
            break;
          case "actions":
            cell.className = "tg-cell actions " + filename.slice(0, -4);

            const button_view = cell.appendChild(
              document.createElement("input")
            );
            button_view.type = "button";
            button_view.className =
              "submit-button view " + filename.slice(0, -4);
            button_view.value = "View";
            button_view.id = "view-button";
            button_view.onclick =
              async () => {
                console.log(filename);
                let content = await fetchFileContent(url, filename.slice(0, -4), "srt"); // TODO: .slice() kell?
                createTextBox(content);
              };
            
            const button_delete = cell.appendChild(
              document.createElement("input")
            );
            button_delete.type = "button";
            button_delete.className =
              "submit-button delete " + filename.slice(0, -4);
            button_delete.value = "Delete";
            button_delete.id = "delete-button";
            button_delete.onclick =
            async () => {
              return filename;
            };
            
              
            //   document.getElementById(`delete-file-submit-${filename}`).onclick =
            //     async () => {
            //       if (confirm("Are you sure?") == true) {
            //         await deleteFile(url, filename);
            //       }
            //     };
            
              break;


        }
      }
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
};

export { createUploadSection, createTextBox, createNewTableRow };