const baseUrl = "http://localhost:6060";

const fetchFileList = (url) => {
  let promise = axios
    .get(url + "/file", { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

const fetchFileContent = (url, id) => {
  let promise = axios
    .get(url + "/file/" + id, { responseType: "text" })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
  return promise;
};

const createTextBox = (text) => {
  let form = document.getElementById("upload-form");
  let children = form.getElementsByTagName("*");
  console.log(children.length);

  if (children.length > 4) {
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

//MAIN #1
const createFileListTable = async () => {
  // be kell burkolni az await-et egy asyncbe, mert csak azon belül működik
  let promise = fetchFileList(baseUrl); // ez kb egy task v todo, "ezt kell csinálni"
  let fileList = await promise; // az await indítja a munkát és meg is várja az eredményt, az async kód sync lesz
  let fileListArray = fileList.match(/[[a-zA-Z0-9]+\.srt*/gm);

  for (let i = 0; i < fileListArray.length; i++) {
    createNewTableRow("files-table", fileListArray[i]);
  }
};

createFileListTable();
// createTextBox(
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac magna ligula. Fusce vel fringilla augue, in sagittis elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In non sem in mauris molestie accumsan. In consectetur dapibus libero non euismod. Suspendisse aliquam nisl suscipit, iaculis ipsum ut, hendrerit risus. Morbi mattis quam arcu, a aliquam diam consectetur eu. Quisque pharetra odio sed elit faucibus, rhoncus sagittis erat tristique. Proin sit amet tortor nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce imperdiet nisi id nibh scelerisque mollis. In ut felis vel ante efficitur euismod. Nunc posuere velit nec ligula malesuada tempor. Quisque sit amet lacus est. Nulla eget nunc ut nibh malesuada eleifend vel quis tellus."
// );
