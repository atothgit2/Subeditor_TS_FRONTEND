const baseUrl = "http://localhost:6060";

/* ............................ API INTERACTIONS ............................ */
const fetchFileList = async (url) => {
  let promise = axios
    .get(url + "/file", { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

// TODO: Ezt a main function hívja meg! Kiszervezni!
const fetchFileContent = async (url, id) => {
  let promise = axios
    .get(url + "/file/" + id, { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

const uploadFile = async (url, formData) => {
  axios.post(url + "/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

const deleteFile = async (url, id) => {
  let promise = axios
    .delete(url + "/file/" + id, { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

/* ......................... INDEX PAGE INTERACTIONS ......................... */
const createUploadButton = (parentId) => {
  const uploadField = document.getElementById(parentId);
  const inputButton = document.createElement("input");
  inputButton.type = "submit";
  inputButton.value = "Upload!";
  inputButton.id = "file-submit";
  inputButton.for = "file";
  inputButton.class = "submit-button";
  uploadField.after(document.createElement("br"), inputButton);
};

const createTextBox = (text) => {
  let form = document.getElementById("upload-form");
  if (document.getElementById("content-box")) {
    let element = document.getElementById("content-box");
    element.remove();
  }
  let textbox = form.appendChild(document.createElement("textarea"));
  textbox.id = "content-box";
  textbox.class = "form-element textbox";
  textbox.value = text;
};

const createNewTableRow = (tableId, filename) => {
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
      button_view.class = "submit-button";
      button_view.value = "View";
      button_view.id = `get-file-content-submit-${filename}`;
      
      document.getElementById(`get-file-content-submit-${filename}`).onclick =
        async () => {
          let content = await fetchFileContent(baseUrl, filename);
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
            await deleteFile(baseUrl, filename);
          }
        };  
    } else {
      cell.className = "tg-cell";
      cell.innerHTML += "data";
    }
  }
};

/* .............................. MAIN .............................. */
const main = async () => {                // be kell burkolni az await-et egy asyncbe, mert csak azon belül működik
  let promise = fetchFileList(baseUrl);   // ez kb egy task v todo, "ezt kell csinálni"
  let fileList = await promise;           // az await indítja a munkát és meg is várja az eredményt, az async kód sync lesz
  let fileListArray = fileList.match(/[[a-zA-Z0-9]+\.srt*/gm);

  if (fileListArray != null) {
    for (let i = 0; i < fileListArray.length; i++) {
      createNewTableRow("files-table", fileListArray[i]);
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

  const uploadField = document.getElementById("file-upload-field");
  uploadField.addEventListener("change", () => {
    if (document.getElementById("file-submit")) {
      document.getElementById("file-submit").remove();
    }

    let form = new FormData();
    form.append("file", uploadField.files[0], "filename");
    form.append("title", "this is title");
    form.append("imdbscore", 5.5);
    for (const pair of form.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    createUploadButton("file-upload-field");
    let uploadButton = document.getElementById("file-submit");

    uploadButton.onclick = () => {
      uploadFile(baseUrl, form);
    };
  });
};

main();