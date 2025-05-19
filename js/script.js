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


// BEST MENU
document.addEventListener("DOMContentLoaded", () => {
    // menucontent h1
    const title = document.querySelector(".menucontent h1");
    
    // menuitem dan h3 di dalamnya
    const menuItems = document.querySelectorAll(".menuitem");
    const itemTitles = document.querySelectorAll(".menuitem h3");

    // Fungsi bantu: cek apakah elemen terlihat di viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 50 && rect.bottom > 50;
    }

    // Fungsi scroll animation untuk semua elemen
    function handleScrollAnimations() {
        // Animasi untuk judul utama
        if (isInViewport(title)) {
            title.classList.add("visible");
        } else {
            title.classList.remove("visible");
        }

        // Animasi untuk setiap menu item
        menuItems.forEach((item, index) => {
            if (isInViewport(item)) {
                setTimeout(() => {
                    item.classList.add("visible");
                }, index * 150);
            } else {
                item.classList.remove("visible");
            }
        });

        // Animasi teks h3 di dalam menu item
        itemTitles.forEach((h3, index) => {
            if (isInViewport(h3)) {
                setTimeout(() => {
                    h3.classList.add("text-visible");
                }, index * 150);
            } else {
                h3.classList.remove("text-visible");
            }
        });
    }

    // Hover effect: Glow putih saat mouse masuk
    menuItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.boxShadow = "0 12px 24px #6E7F80";
        });

        item.addEventListener("mouseleave", () => {
            item.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4)";
        });

        // Klik efek: Sedikit berputar dan membesar saat diklik
        item.addEventListener("click", () => {
            item.style.transform = "rotate(5deg) scale(1.05)";
            setTimeout(() => {
                item.style.transform = "rotate(0) scale(1)";
            }, 200);
        });
    });

    // Jalankan saat load & scroll
    handleScrollAnimations();
    window.addEventListener("scroll", handleScrollAnimations);
});
// BEST MENU selesai


// Highlight menu
// menu
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".carousel-container");
    const images = container.querySelectorAll("img");
    const imgWidth = images[0].offsetWidth + 40;
    let currentIndex = 0;

    // Gandakan gambar untuk efek looping
    container.innerHTML += container.innerHTML;

    // Fungsi untuk menggeser gambar otomatis
    let autoScroll = setInterval(() => {
        currentIndex++;
        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = `translateX(-${currentIndex * imgWidth}px)`;

        if (currentIndex >= images.length) {
            setTimeout(() => {
                container.style.transition = "none";
                container.style.transform = "translateX(0)";
                currentIndex = 0;
            }, 500);
        }
    }, 5000);

    // Fungsi untuk menggeser gambar manual ke kiri
    window.prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
    };

    // Fungsi untuk menggeser gambar manual ke kanan
    window.nextImage = () => {
        currentIndex++;
        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = `translateX(-${currentIndex * imgWidth}px)`;

        if (currentIndex >= images.length) {
            setTimeout(() => {
                container.style.transition = "none";
                container.style.transform = "translateX(0)";
                currentIndex = 0;
            }, 500);
        }
    };

    // Menampilkan gambar dengan efek fade-in dan scale
    container.querySelectorAll("img").forEach((img, i) => {
        setTimeout(() => {
            img.style.opacity = 1;
            img.style.transform = "scale(1)";
        }, 300 + i * 150);
    });
});





