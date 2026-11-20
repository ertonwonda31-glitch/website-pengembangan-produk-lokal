
// TAHUN OTOMATIS
document.getElementById("year").textContent =
  new Date().getFullYear();

// MENU HP
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

// ADMIN WEBSITE
const adminModal = document.getElementById("adminModal");

document.getElementById("adminOpen").addEventListener("click", () => {
  adminModal.classList.add("show");
});

document.getElementById("adminClose").addEventListener("click", () => {
  adminModal.classList.remove("show");
});

adminModal.addEventListener("click", event => {
  if (event.target === adminModal) {
    adminModal.classList.remove("show");
  }
});

// LOGIN DEMO
// Ganti kredensial ini hanya untuk demonstrasi.
// Login ini bukan keamanan untuk website publik.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "PuncakJaya123";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  const username = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value;

  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {
    document.getElementById("loginArea").hidden = true;
    document.getElementById("adminPanel").hidden = false;
    document.getElementById("loginError").textContent = "";
  } else {
    document.getElementById("loginError").textContent =
      "Username atau password salah!";
  }
});

// BERITA YANG DISIMPAN DI BROWSER
function getNews() {
  return JSON.parse(localStorage.getItem("puncakJayaNews") || "[]");
}

function showNews() {
  const newsList = document.getElementById("newsList");
  const news = getNews();

  news.forEach(item => {
    const article = document.createElement("article");
    article.className = "news-card";

    const category = document.createElement("span");
    category.className = "tag";
    category.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const body = document.createElement("p");
    body.textContent = item.body;

    const date = document.createElement("small");
    date.textContent = item.date;

    article.append(category, title, body, date);
    newsList.prepend(article);
  });
}

showNews();

// TAMBAH BERITA DARI ADMIN
document.getElementById("newsForm").addEventListener("submit", event => {
  event.preventDefault();

  const item = {
    title: document.getElementById("newsTitle").value.trim(),
    category: document.getElementById("newsCategory").value.trim(),
    body: document.getElementById("newsBody").value.trim(),
    date: new Date().toLocaleDateString("id-ID")
  };

  const news = getNews();
  news.unshift(item);

  localStorage.setItem("puncakJayaNews", JSON.stringify(news));

  const article = document.createElement("article");
  article.className = "news-card";

  const category = document.createElement("span");
  category.className = "tag";
  category.textContent = item.category;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const body = document.createElement("p");
  body.textContent = item.body;

  const date = document.createElement("small");
  date.textContent = item.date;

  article.append(category, title, body, date);

  document.getElementById("newsList").prepend(article);

  event.target.reset();

  alert("Berita berhasil ditambahkan di browser ini!");
});

// LOGOUT ADMIN
document.getElementById("logout").addEventListener("click", () => {
  document.getElementById("adminPanel").hidden = true;
  document.getElementById("loginArea").hidden = false;

  loginForm.reset();
  adminModal.classList.remove("show");
});

// FORMULIR KONTAK MELALUI EMAIL
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  // GANTI dengan email resmi pengelola website.
  const destination = "emailanda@example.com";

  const subject = encodeURIComponent(
    "Pesan Website Produk Lokal Puncak Jaya"
  );

  const body = encodeURIComponent(
    "Nama: " + name +
    "\nEmail: " + email +
    "\n\nPesan:\n" + message
  );

  window.location.href =
    "mailto:" + destination +
    "?subject=" + subject +
    "&body=" + body;
});
