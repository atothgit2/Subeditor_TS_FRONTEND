const baseUrl = "http://localhost:6060";

// API INTERACTIONS
const fetchFileList = (url) => {
  let promise = axios
    .get(url + "/file", { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

// TODO: Ezt a main function hívja meg! Kiszervezni!
const fetchFileContent = (url, id) => {
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

// INDEX PAGE INTERACTIONS
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
      const button = cell.appendChild(document.createElement("input"));
      button.type = "button";
      button.class = "submit-button";
      button.value = "Get content";
      button.id = `get-file-content-submit-${filename}`;
      document.getElementById(`get-file-content-submit-${filename}`).onclick =
        async () => {
          let content = await fetchFileContent(baseUrl, filename);
          createTextBox(content);
        };
    } else {
      cell.className = "tg-cell";
      cell.innerHTML += "data";
    }
  }
};

//MAIN
const createFileListTable = async () => {
  // be kell burkolni az await-et egy asyncbe, mert csak azon belül működik
  let promise = fetchFileList(baseUrl); // ez kb egy task v todo, "ezt kell csinálni"
  let fileList = await promise; // az await indítja a munkát és meg is várja az eredményt, az async kód sync lesz
  let fileListArray = fileList.match(/[[a-zA-Z0-9]+\.srt*/gm);

  for (let i = 0; i < fileListArray.length; i++) {
    createNewTableRow("files-table", fileListArray[i]);
  }

  const uploadField = document.getElementById("file-upload-field");
  uploadField.addEventListener("change", () => {
    if (document.getElementById("file-submit")) {
      document.getElementById("file-submit").remove();
    }
    
    let form = new FormData
    form.append('file', uploadField.files[0], 'filename');
    form.append('title', 'this is title');
    form.append('imdbscore', 5.5);
    // for (const pair of form.entries()) {console.log(`${pair[0]}, ${pair[1]}`);}

    createUploadButton("file-upload-field");
    let uploadButton = document.getElementById("file-submit");

    uploadButton.onclick = () => {
      uploadFile(baseUrl, form)
    }
  });
};

createFileListTable();