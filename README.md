# 🔐 Pixel Manipulation for Image Encryption Tool(Web GUI)

## 🧠 Task 02 – Prodigy InfoTech Cyber Security Internship

This is a web-based GUI implementation of **Pixel Manipulation for Image Encryption**, designed to simulate encryption and decryption of images directly in the browser using pixel shuffling techniques.

> This interactive website allows users to upload an image, encrypt it by shuffling its pixels, decrypt it back using the stored key, and download the results—all without any server-side processing.

---

## 🌐 Live Demo

> 📌 *(Optional)* Add a GitHub Pages or Netlify/Vercel deployment link here.

---

## 🚀 Features

- 📤 Upload any image (PNG/JPG)
- 🖼️ View and process the image on a canvas
- 🔐 Encrypt image pixels using a randomized key
- 🔓 Decrypt using the uploaded encryption key
- 📥 Download encrypted image and encryption key separately
- 📥 Download decrypted image after restoration
- 📊 Real-time visual progress bar and status updates
- 🎨 Responsive, modern, and interactive UI (landscape layout)

---

## 📸 Screenshot

> ![PRODIGY_CS_03_preview](https://github.com/user-attachments/assets/98ea642c-a43f-4882-9f18-9f122aaee4e6)

---

## 📁 Project Structure

```text
PRODIGY_CS_02/
├── README.md            # Project documentation
├── index.html           # Main HTML structure
├── style.css            # Visual styling
├── script.js            # Image encryption/decryption logic
└── assets/              # Preview images
```



---

## 🔧 How It Works

### 🔐 Encryption
- Upload an image in the "Encrypt Image" section.
- Pixels are shuffled using a randomly generated permutation key.
- Encrypted image is displayed on canvas.
- You can download:
  - The encrypted image
  - The encryption key (`.json` format)

### 🔓 Decryption
- Upload the previously encrypted image and the associated key file.
- The pixel order is restored using the key.
- Original image is displayed after decryption.
- You can download the decrypted image.

---

## 📦 Getting Started

### ▶️ Run Locally

1. Clone the repository:
```bash
   git clone https://github.com/aksgithub250502/PRODIGY_CS_02.git
```
## ▶️ How to Use
2. Open your terminal and navigate to the project directory:

```bash
   cd PRODIGY_CS_02
```
3. Open `index.html` in your browser.

> 💡 No installations or backend setup needed!

---

## 📸 Supported Formats

* ✅ PNG (Recommended for lossless processing)
* ✅ JPG / JPEG (May cause slight pixel shifts due to compression)

---

## ✨ UI Highlights

* 🖥️ Landscape-oriented two-panel layout (Encrypt & Decrypt side-by-side)
* 🔘 Clearly separated buttons for each action (Encrypt, Download Image, Download Key)
* 📊 Central progress bar always visible at bottom
* 📱 Fully responsive and optimized for all screen sizes

---

## ⚠️ Limitations

* 🧠 Key is stored only in memory unless explicitly downloaded
* 🔁 Key must be uploaded manually to decrypt the image
* 🔐 This is a simulation tool; not intended for real-world secure encryption
* 🌐 Best viewed in modern browsers like Chrome, Edge, Firefox

---

## 👨‍💻 Developed by

**AMAN KUMAR SINGH**
* Cyber Security Intern – Prodigy InfoTech
* GitHub: [@aksgithub250502]**(https://github.com/aksgithub250502/)**
* Email - [aman.aks1402@gmail.com]
---

## 📄 License

This project is developed under the **Cyber Security Internship** program by **Prodigy InfoTech**.
It is intended solely for **educational and learning purposes**.

---

## ✅ Internship Task Completed

This project fulfills **Task 02: Pixel Manipulation for Image Encryption** of the **Prodigy InfoTech Cyber Security Internship**.
