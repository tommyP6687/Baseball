console.log("✅ script.js loaded");
let previousTrackmanFiles = [];
let previousTruMediaFile = null;

function updateFileDisplay(id) {
  const input = document.getElementById(id);
  const display = document.getElementById(`${id}-name`);
  const newFiles = Array.from(input.files);
  const hadPrevious = id === 'trackman' ? previousTrackmanFiles.length > 0 : previousTruMediaFile !== null;

  // Preserve old files if nothing selected
  if (!newFiles.length && hadPrevious) {
    if (id === 'trackman') {
      renderFileEntries(previousTrackmanFiles, display, id);
      addPlusButton(display, id);
    } else {
      renderFileEntries([previousTruMediaFile], display, id);
    }
    return;
  }

  // Save and update
  if (id === 'trackman') {
    previousTrackmanFiles = newFiles;
  } else if (id === 'trumedia') {
    previousTruMediaFile = newFiles[0] || null;
  }

  display.innerHTML = '';
  if (!newFiles.length) {
    const empty = document.createElement('div');
    empty.className = 'file-label-entry';
    empty.innerHTML = `<span class="file-name">${id === 'trackman' ? 'No files selected' : 'No file selected'}</span>`;
    display.appendChild(empty);
    return;
  }

  renderFileEntries(newFiles, display, id);
  if (id === 'trackman') addPlusButton(display, id);
}

function renderFileEntries(files, display, id) {
  display.innerHTML = '';
  files.forEach((file, index) => {
    const entry = document.createElement('div');
    entry.className = 'file-label-entry';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'file-name';
    nameSpan.textContent = file.name;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-file-btn';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => removeSingleFile(id, index);

    entry.appendChild(nameSpan);
    entry.appendChild(removeBtn);
    display.appendChild(entry);
  });
}

function addPlusButton(display, id) {
  const addEntry = document.createElement('div');
  addEntry.className = 'file-label-entry';
  addEntry.innerHTML = `
    <span class="file-name"></span>
    <button type="button" class="add-file-btn" onclick="triggerAddFile('${id}')">+</button>
  `;
  display.appendChild(addEntry);
}

function triggerAddFile(id) {
  const input = document.getElementById(id);
  const tempInput = document.createElement('input');
  tempInput.type = 'file';
  tempInput.accept = '.csv';
  tempInput.multiple = true;
  tempInput.style.display = 'none';

  document.body.appendChild(tempInput);

  tempInput.addEventListener('change', () => {
    const newFiles = Array.from(tempInput.files);
    if (newFiles.length) {
      previousTrackmanFiles = previousTrackmanFiles.concat(newFiles);
      const dt = new DataTransfer();
      previousTrackmanFiles.forEach(f => dt.items.add(f));
      input.files = dt.files;
      updateFileDisplay(id);
    } else {
      updateFileDisplay(id); // preserve display if canceled
    }
    tempInput.remove();
  });

  tempInput.click();
}

function removeSingleFile(id, indexToRemove) {
  const input = document.getElementById(id);
  const dt = new DataTransfer();
  let sourceFiles;

  if (id === 'trackman') {
    sourceFiles = previousTrackmanFiles;
  } else {
    sourceFiles = previousTruMediaFile ? [previousTruMediaFile] : [];
  }

  sourceFiles.forEach((file, i) => {
    if (i !== indexToRemove) dt.items.add(file);
  });

  input.files = dt.files;

  if (id === 'trackman') {
    previousTrackmanFiles = Array.from(dt.files);
    updateFileDisplay(id);
  } else {
    previousTruMediaFile = dt.files[0] || null;
    updateFileDisplay(id);
  }
}

function clearTrackmanFiles() {
  const input = document.getElementById("trackman");
  const dt = new DataTransfer(); // Empty data
  input.files = dt.files;

  // Clear previous tracking array if needed
  previousTrackmanFiles = [];

  updateFileDisplay('trackman');
}

function handleComputeClick() {
  if (validateForm()) {
    document.querySelector("form").submit();  // only submits if validation passed
  }
}

function validateForm() {
  const trumediaInput = document.getElementById("trumedia");
  const trackmanInput = document.getElementById("trackman");

  const hasTrumedia = trumediaInput && [...trumediaInput.files].some(file => file.name.trim() !== "");
  const hasTrackman = trackmanInput && [...trackmanInput.files].some(file => file.name.trim() !== "");

  if (!hasTrumedia && !hasTrackman) {
    alert("⚠️ Please upload both TruMedia and Trackman files.");
    return false;
  }

  if (!hasTrumedia) {
    alert("⚠️ Please upload a TruMedia file.");
    return false;
  }

  if (!hasTrackman) {
    alert("⚠️ Please upload at least one Trackman file.");
    return false;
  }

  alert("✅ Your files are being uploaded and processed...");
  return true;
}
