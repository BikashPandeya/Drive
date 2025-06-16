# 🚀 CloudDrive – Your Secure Cloud Storage

CloudDrive is a modern, secure, and user-friendly cloud storage web application. Upload, preview, and download your files from anywhere, anytime. Built with Node.js, Express, MongoDB, Cloudinary, and EJS, styled with Tailwind CSS.

---

## 🌐 [Live Demo](https://drive-z4ox.onrender.com/user/login)

---

## ✨ Features

- 🔒 **User Authentication** (Register/Login)
- ☁️ **Upload Files** (Images, Documents, etc.)
- 🖼️ **Preview Uploaded Files**
- 📥 **Download Files**
- 🗑️ **Delete Files**
- 🧑‍💻 **Responsive UI** (Mobile & Desktop)
- ☁️ **Cloud Storage with Cloudinary**
- 🛡️ **Secure Password Hashing (bcrypt)**
- 🗂️ **MongoDB for File Metadata & Users**

---

## 📸 Screenshots

![Login Page](https://i.imgur.com/5Qw5Qw5.png)
![Home Page](https://i.imgur.com/9Qw9Qw9.png)

---

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/clouddrive.git
cd clouddrive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the app

```bash
npm start
```

Visit [http://localhost:3000/user/login](http://localhost:3000/user/login)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Tailwind CSS, Flowbite, Remixicon
- **Database:** MongoDB Atlas
- **Cloud Storage:** Cloudinary
- **Authentication:** JWT, bcrypt

---

## 📂 Folder Structure

```
├── config/
├── controllers/
├── middlewares/
├── models/
├── public/
├── routes/
├── views/
│   ├── partials/
│   └── ...
├── .env
├── app.js
└── package.json
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---