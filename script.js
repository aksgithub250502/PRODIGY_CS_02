let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let originalImageData;
let encryptedImageData;
let key = [];

let decryptedCanvas = document.getElementById('decryptedCanvas');
let decryptedCtx = decryptedCanvas.getContext('2d');
let uploadedEncryptedImageData;
let uploadedKey = [];

const statusMessage = document.getElementById("statusMessage");
const progressBar = document.getElementById("progress");

// Load image for encryption
document.getElementById('imageUploader').addEventListener('change', function (e) {
  resetProgress();
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      let scale = Math.min(500 / img.width, 350 / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setStatus("Image Loaded. Ready to Encrypt.");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Load encrypted image for decryption
document.getElementById('encryptedUploader').addEventListener('change', function (e) {
  resetProgress();
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      let scale = Math.min(500 / img.width, 350 / img.height);
      decryptedCanvas.width = img.width * scale;
      decryptedCanvas.height = img.height * scale;
      decryptedCtx.drawImage(img, 0, 0, decryptedCanvas.width, decryptedCanvas.height);
      uploadedEncryptedImageData = decryptedCtx.getImageData(0, 0, decryptedCanvas.width, decryptedCanvas.height);
      setStatus("Encrypted Image Loaded. Upload Key File.");
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Load encryption key for decryption
document.getElementById('keyUploader').addEventListener('change', function (e) {
  let reader = new FileReader();
  reader.onload = function (event) {
    try {
      uploadedKey = JSON.parse(event.target.result);
      if (!Array.isArray(uploadedKey)) throw "Invalid key format";
      setStatus("Key Loaded. Ready to Decrypt.");
    } catch (err) {
      alert("Invalid key file. Must be a .json key from encryption.");
    }
  };
  reader.readAsText(e.target.files[0]);
});

// Encrypt image only (no download)
function encryptImage() {
  if (!originalImageData) return alert("Please upload an image to encrypt.");

  setStatus("Encrypting image...", 20);

  setTimeout(() => {
    let data = new Uint8ClampedArray(originalImageData.data);
    let length = data.length;

    key = [...Array(length).keys()];
    key.sort(() => Math.random() - 0.5);

    let encrypted = new Uint8ClampedArray(length);
    for (let i = 0; i < length; i++) {
      encrypted[i] = data[key[i]];
    }

    encryptedImageData = new ImageData(encrypted, originalImageData.width, originalImageData.height);
    ctx.putImageData(encryptedImageData, 0, 0);

    setStatus("Encryption complete ✅", 100);
  }, 500);
}

// Save encrypted image with file picker
async function downloadEncryptedImage() {
  if (!canvas.width || !encryptedImageData) {
    return alert("Encrypt the image first before downloading.");
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: "encrypted_image.png",
      types: [{ description: "PNG Image", accept: { "image/png": [".png"] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    setStatus("Encrypted image downloaded ✅", 0);
  } catch {
    fallbackDownload(blob, "encrypted_image.png");
  }
}

// Save encryption key with file picker
async function downloadEncryptionKey() {
  if (!key.length) {
    return alert("No encryption key available. Encrypt an image first.");
  }

  const blob = new Blob([JSON.stringify(key)], { type: "application/json" });

  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: "encryption_key.json",
      types: [{ description: "JSON File", accept: { "application/json": [".json"] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    setStatus("Encryption key downloaded ✅", 0);
  } catch {
    fallbackDownload(blob, "encryption_key.json");
  }
}

// Decrypt uploaded image with uploaded key
function decryptUploadedImage() {
  if (!uploadedEncryptedImageData || uploadedKey.length === 0) {
    return alert("Please upload both encrypted image and key file.");
  }

  setStatus("Decrypting uploaded image...", 20);

  setTimeout(() => {
    let encrypted = new Uint8ClampedArray(uploadedEncryptedImageData.data);
    let decrypted = new Uint8ClampedArray(encrypted.length);

    for (let i = 0; i < uploadedKey.length; i++) {
      decrypted[uploadedKey[i]] = encrypted[i];
    }

    let decryptedImage = new ImageData(decrypted, uploadedEncryptedImageData.width, uploadedEncryptedImageData.height);
    decryptedCtx.putImageData(decryptedImage, 0, 0);

    setStatus("Decryption complete ✅", 100);
  }, 500);
}

// Save decrypted image with file picker
async function downloadDecryptedImage() {
  if (!decryptedCanvas.width) {
    return alert("Nothing to download. Decrypt an image first.");
  }

  const blob = await new Promise(resolve => decryptedCanvas.toBlob(resolve, 'image/png'));

  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: "decrypted_image.png",
      types: [{ description: "PNG Image", accept: { "image/png": [".png"] } }]
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    setStatus("Decrypted image downloaded ✅", 0);
  } catch {
    fallbackDownload(blob, "decrypted_image.png");
  }
}

// Fallback download (auto-trigger)
function fallbackDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Status UI
function setStatus(message, progress = 0) {
  statusMessage.textContent = message;
  progressBar.style.width = progress + "%";
}

function resetProgress() {
  setStatus("Awaiting Action...", 0);
}
