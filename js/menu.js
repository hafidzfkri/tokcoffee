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


// MENU
// filter button dan menu item
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Filtering berdasarkan kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === "all" || itemCategory === category) {
                    item.classList.remove("hidden");
                    item.classList.add("appear");
                    item.style.display = "block";
                } else {
                    item.classList.add("hidden");
                    item.classList.remove("appear");
                    item.style.display = "none";
                }
            });
        });
    });

    // SCROLL ANIMATION BERULANG UNTUK MENU ITEM
    const scrollObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear');
                entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.2
    });

    // Apply ke semua menu item
    menuItems.forEach(item => {
        item.classList.add('hidden'); // supaya animasi aktif dari awal
        scrollObserver.observe(item);
    });
});

// title
// Target menu title
const menuTitle = document.querySelector('.menu-title');

function checkTitleInView() {
    const rect = menuTitle.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        menuTitle.classList.add('visible');
    } else {
        menuTitle.classList.remove('visible'); // agar animasi bisa muncul ulang
    }
}

// Event listener scroll
window.addEventListener('scroll', checkTitleInView);
window.addEventListener('load', checkTitleInView); // saat awal load







