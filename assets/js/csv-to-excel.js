function parseCSV(text){
  // robust CSV parser that handles quoted fields and newlines
  const rows = [];
  let cur = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++){
    const ch = text[i];
    const next = text[i+1];
    if (ch === '"'){
      if (inQuotes && next === '"'){
        // escaped quote
        cur += '"'; i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes){
      row.push(cur); cur = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes){
      // handle CRLF
      // if CRLF, skip the LF after CR
      if (ch === '\r' && next === '\n'){
        // skip and consume next
      }
      row.push(cur); cur = '';
      // only push non-empty row OR allow empty rows
      rows.push(row);
      row = [];
      // if CRLF skip next char
      if (ch === '\r' && next === '\n') i++;
    } else {
      cur += ch;
    }
  }
  // push last
  if (cur !== '' || inQuotes || row.length > 0){
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

function createTableFromArray(array){
  if (!array || array.length === 0) return null;
  const table = document.createElement('table');
  table.className = 'sheet';
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  // header - use first row as header
  const headerRow = document.createElement('tr');
  const headerCells = array[0];
  for (let c = 0; c < headerCells.length; c++){
    const th = document.createElement('th');
    th.textContent = headerCells[c] || ('Column ' + (c+1));
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  // body
  for (let r = 1; r < array.length; r++){
    const tr = document.createElement('tr');
    const row = array[r];
    for (let c = 0; c < headerCells.length; c++){
      const td = document.createElement('td');
      td.textContent = (row && row[c] !== undefined) ? row[c] : '';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function workbookFromArray(array){
  const ws = XLSX.utils.aoa_to_sheet(array);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  return wb;
}

function downloadWorkbook(wb, filename, bookType){
  // bookType: 'xlsx' or 'biff8' (xls)
  if (bookType === 'xls'){
    // biff8
    const wbout = XLSX.write(wb, {bookType:'biff8', type:'array'});
    const blob = new Blob([wbout], {type: 'application/vnd.ms-excel'});
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
  } else {
    const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
    const blob = new Blob([wbout], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
  }
}
function triggerDownload(url, filename){
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 5000);
}

// ------------------ DOM + Logic ------------------
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const convertBtn = document.getElementById('convertBtn');
const csvPreview = document.getElementById('csvPreview');
const excelPanel = document.getElementById('excelPanel');
const excelPreview = document.getElementById('excelPreview');
const exportXlsBtn = document.getElementById('exportXlsBtn');
const exportXlsxBtn = document.getElementById('exportXlsxBtn');
const toast = document.getElementById('toast');

let parsedArray = null;
let workbook = null;
let currentFilename = 'converted';


fileInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if (!file) return;
  currentFilename = file.name.replace(/\.[^/.]+$/, '') || currentFilename;
  const reader = new FileReader();
  reader.onload = function(ev){
    const text = ev.target.result;
    parsedArray = parseCSV(text);
    renderCsvPreview(parsedArray);
    convertBtn.disabled = false;
    // hide excel panel if previously visible
    excelPanel.classList.remove('visible');
  };
  reader.readAsText(file);
});

function renderCsvPreview(array){
  csvPreview.innerHTML = '';
  if (!array || array.length === 0){
    csvPreview.innerHTML = '<div class="small">CSV empty or failed to parse.</div>';
    return;
  }
  const table = createTableFromArray(array);
  csvPreview.appendChild(table);
  // scroll to top of preview
  csvPreview.scrollTop = 0;
}

convertBtn.addEventListener('click', () => {
  const table = csvPreview.querySelector('table');
  if (!table) return;

  // read current table content
  const array = Array.from(table.rows).map(row =>
    Array.from(row.cells).map(cell => cell.textContent)
  );

  workbook = workbookFromArray(array); // use current table data

  // render excel preview (reusing table UI)
  excelPreview.innerHTML = '';
  const previewTable = createTableFromArray(array);
  excelPreview.appendChild(previewTable);

  // show panel
  excelPanel.classList.add('visible');

  // show toast
  showToast('✅ Conversion Successful!');
});


exportXlsxBtn.addEventListener('click', ()=>{
  if (!workbook) return;
  const filename = currentFilename + '.xlsx';
  downloadWorkbook(workbook, filename, 'xlsx');
});
exportXlsBtn.addEventListener('click', ()=>{
  if (!workbook) return;
  const filename = currentFilename + '.xls';
  downloadWorkbook(workbook, filename, 'xls');
});

function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  // after 3 seconds hide and scroll
  setTimeout(()=>{
    toast.classList.remove('show');
    // smooth scroll to excel panel
    const rect = excelPanel.getBoundingClientRect();
    // only scroll if visible
    if (excelPanel.classList.contains('visible')){
      // window scroll to bring excelPanel into view smoothly
      const top = window.scrollY + rect.top - 20;
      window.scrollTo({top, behavior:'smooth'});
    }
  }, 3000);
}
