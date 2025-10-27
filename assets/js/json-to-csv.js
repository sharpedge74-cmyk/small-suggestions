// =============================
// JSON → CSV Converter Logic
// =============================

// Elements
const jsonInputEditor = document.getElementById("jsonInputEditor");
const jsonPreviewArea = $("#jsonPreviewArea");
const convertBtnJson = document.getElementById("convertBtnJson");
const outputArea = document.getElementById("outputArea");
const copyOutputBtn = document.getElementById("copyOutputBtn");
const exportOutputBtn = document.getElementById("exportOutputBtn");
const toastJson = document.getElementById("toastJson");
const fileInputJson = document.getElementById("fileInputJson");

let parsedJson = null;

// ========== JSON Validation & Live Preview ==========
function updateJsonPreview() {
  const text = jsonInputEditor.value.trim();

  if (!text) {
    jsonPreviewArea.JSONView({});
    convertBtnJson.disabled = true;
    parsedJson = null;
    return;
  }

  try {
    parsedJson = JSON.parse(text);
    jsonPreviewArea.JSONView(parsedJson, { collapsed: false });
    convertBtnJson.disabled = false;
  } catch (e) {
    jsonPreviewArea.html('<div class="jsonx-error">❌ Invalid JSON</div>');
    convertBtnJson.disabled = true;
    parsedJson = null;
  }
}

// Live update as user types
jsonInputEditor.addEventListener("input", updateJsonPreview);

// ========== Upload JSON File ==========
fileInputJson.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    jsonInputEditor.value = event.target.result;
    updateJsonPreview();
  };
  reader.readAsText(file);
});

// ========== Convert JSON → CSV ==========
convertBtnJson.addEventListener("click", () => {
  if (!parsedJson) return;

  const csv = jsonToCsv(parsedJson);

  outputArea.readOnly = false;
  outputArea.value = csv;
  outputArea.readOnly = true;

  showToast("✅ Conversion Successful!");
  document.getElementById("convertedFile").scrollIntoView({ behavior: "smooth" });
});

// ========== Copy Output ==========
copyOutputBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputArea.value);
  showToast("📋 Copied to Clipboard!");
});

// ========== Export as .csv ==========
exportOutputBtn.addEventListener("click", () => {
  const blob = new Blob([outputArea.value], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "converted.csv";
  a.click();
  URL.revokeObjectURL(a.href);
});

// ========== Helper: Show Toast ==========
function showToast(message) {
  toastJson.textContent = message;
  toastJson.classList.add("show");
  setTimeout(() => toastJson.classList.remove("show"), 2000);
}

// ========== Helper: JSON → CSV Converter ==========
function jsonToCsv(jsonInput) {
  let data;
  try {
    data = typeof jsonInput === "string" ? JSON.parse(jsonInput) : jsonInput;
  } catch (e) {
    return "Invalid JSON";
  }

  if (!data) return "Empty JSON";

  const tables = {};
  let tableCounter = 1;

  function processNode(node, tableName = "root", parentIdKey = null, parentId = null) {
    if (!Array.isArray(node)) node = [node];
    const rows = [];

    for (let i = 0; i < node.length; i++) {
      const row = {};
      for (const [key, value] of Object.entries(node[i])) {
        if (Array.isArray(value)) {
          const childTableName = `${key}`;
          const refKey = `${tableName}_id`;

          processNode(value, childTableName, refKey, i + 1);
        } else if (value && typeof value === "object") {
          const childTableName = `${key}`;
          const refKey = `${tableName}_id`;

          processNode([value], childTableName, refKey, i + 1);
        } else {
          row[key] = value;
        }
      }
      if (parentIdKey && parentId != null) {
        row[parentIdKey] = parentId;
      }
      rows.push(row);
    }

    if (!tables[tableName]) tables[tableName] = [];
    tables[tableName].push(...rows);
  }

  function toCsv(rows) {
    if (!rows.length) return "";
    const headers = new Set();
    rows.forEach(r => Object.keys(r).forEach(k => headers.add(k)));
    const headerArray = Array.from(headers);
    const csv = [
      headerArray.join(","),
      ...rows.map(r => headerArray.map(h => (r[h] != null ? `"${String(r[h]).replace(/"/g, '""')}"` : "")).join(","))
    ];
    return csv.join("\n");
  }

  // Start processing
  processNode(data);

  // Convert each table to CSV string
  let result = "";
  for (const [tableName, rows] of Object.entries(tables)) {
    result += `\n\n=== ${tableName.toUpperCase()} TABLE ===\n`;
    result += toCsv(rows);
  }

  return result.trim();
}

// Initialize empty preview
updateJsonPreview();
