// Tangkap elemen navbar
const navbar = document.querySelector(".navbar");

// Tambahkan event listener untuk mendeteksi scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Tambahkan kelas saat di-scroll
    } else {
        navbar.classList.remove("scrolled"); // Hapus kelas jika kembali ke atas
    }
});
// navbar selesai

// menu toggle dan dropdown
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Mencegah event bubbling
        this.classList.toggle("active"); // Toggle efek tombol X
        dropdownMenu.classList.toggle("show"); // Tampilkan/hilangkan dropdown

        // Ubah ikon tombol
        this.innerHTML = this.classList.contains("active") ? "✖" : "☰";
    });

    // Klik di luar dropdown untuk menutup
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.innerHTML = "☰"; // Kembali ke garis tiga
        }
    });
});
// menu toggle dan dropdown selesai


// gambar tangan
// Ambil elemen tangan
const hand = document.querySelector(".hero-hands");

// Cek apakah elemen ada di halaman
if (hand) {
    let targetX = 0;  // Posisi target berdasarkan kursor
    let currentX = 0; // Posisi saat ini (untuk animasi smooth)
    const speed = 0.06; // Kecepatan transisi gerakan tangan

    // Set posisi awal tangan agar berada di tengah layar
    function setInitialPosition() {
        const screenWidth = window.innerWidth;
        const handWidth = hand.getBoundingClientRect().width;

        // Hitung posisi awal dalam vw agar fleksibel
        currentX = (screenWidth / 2 - handWidth / 2) / screenWidth * 100;
        targetX = currentX;

        // Terapkan transform awal
        hand.style.transform = `translateX(${currentX}vw) translateY(-5%)`;
    }

    // Tangkap pergerakan kursor untuk menentukan target posisi X
    document.addEventListener("mousemove", (event) => {
        const screenWidth = window.innerWidth;
        const mouseX = event.clientX;

        // Hitung target X dalam vw, lalu batasi agar tidak terlalu jauh
        let newTargetX = ((mouseX / screenWidth) * 100) - 50;
        targetX = Math.max(-50, Math.min(15, newTargetX));
    });

    // Animasi smooth untuk menggerakkan tangan dari currentX ke targetX
    function animate() {
        currentX += (targetX - currentX) * speed;
        hand.style.transform = `translateX(${currentX}vw) translateY(-5%)`;
        requestAnimationFrame(animate); // Jalankan animasi terus menerus
    }

    // Update posisi jika ukuran layar berubah
    window.addEventListener("resize", setInitialPosition);

    // Inisialisasi posisi dan mulai animasi
    setInitialPosition();
    animate();
}
// gambar tangan selesai


// contact us
// Fungsi untuk form dummy (Kemitraan & Investor)
  function submitForm(event) {
    event.preventDefault();
    alert("Pesan Anda telah dikirim!");
    return false;
  }

  // Navigasi tab
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(content => {
        content.classList.toggle("active", content.id === target);
      });
    });
  });

  // Kirim Form ke Formspree (khusus form Pertanyaan, Kemitraan, Investor)
  document.querySelectorAll("form[action^='https://formspree.io']").forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.innerText = "Pesan berhasil dikirim. Terima kasih!";
        form.reset();
      } else {
        status.innerText = "Gagal mengirim. Silakan coba lagi.";
      }
    });
  });
