import { fetchFileContent, deleteFile } from "./api.js";

const createUploadSection = (parentId) => {
  const uploadField = document.getElementById(parentId);

  const uploadButton = document.createElement("input");
  uploadButton.type = "submit";
  uploadButton.value = "Upload";
  uploadButton.id = "file-submit-button";
  uploadButton.for = "file";
  uploadButton.class = "submit-button";
  uploadField.after(document.createElement("br"), uploadButton);
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
  textbox.class = "form-element textbox";
  textbox.value = text;

  let updateButton = form.appendChild(document.createElement("input"));
  updateButton.type = "submit";
  updateButton.id = "update-button";
  updateButton.class = "form-element updateButton";
  updateButton.value = "Update";
};

const createNewTableRow = (url, tableId, filename, deletefunction) => {
  let table = document.getElementById(tableId);
  let body = table.getElementsByTagName("tbody")[0];
  let row = body.insertRow(-1);

  for (let i = 0; i < table.rows[0].cells.length; i++) {
    let cell = row.insertCell(i);
    if (i == 0) {
      cell.className = "tg-cell filename";
      cell.innerHTML += filename;
    } else if (i == 4) {
      cell.className = "tg-cell actions";

      const button_view = cell.appendChild(document.createElement("input"));
      button_view.type = "button";
      button_view.class = "updateButton";
      button_view.value = "View";
      button_view.id = `get-file-content-submit-${filename}`;

      document.getElementById(`get-file-content-submit-${filename}`).onclick =
        async () => {
          let content = await fetchFileContent(url, filename);
          createTextBox(content);
        };

      const button_delete = cell.appendChild(document.createElement("input"));
      button_delete.type = "button";
      button_delete.class = "submit-button";
      button_delete.value = "Delete";
      button_delete.id = `delete-file-submit-${filename}`;

      document.getElementById(`delete-file-submit-${filename}`).onclick =
        async () => {
          if (confirm("Are you sure?") == true) {
            await deleteFile(url, filename);
          }
        };
    } else {
      cell.className = "tg-cell";
/* TODO: felolvasni az adatokat json-ból */
      cell.innerHTML += "data1";
    }
  }
};

export { createUploadSection, createTextBox, createNewTableRow };
