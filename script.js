// DAFTAR BUKU LENGKAP (PELAJARAN & NOVEL)
const books = [
    // --- KATEGORI: PELAJARAN WAJIB ---
    { id: 1, title: "Matematika Volume 1", author: "Kemdikbud", type: "Pelajaran", status: "Tersedia", img:"assets/matematika.jpg" },
    { id: 2, title: "Informatika & Logika", author: "Andi Offset", type: "Pelajaran", status: "Tersedia", img: "assets/informatika.jpg" },
    { id: 3, title: "Dasar-Dasar PPLG (Coding)", author: "Tim PPLG", type: "Pelajaran", status: "Tersedia", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400" },
    { id: 4, title: "Pendidikan Agama Islam", author: "Kemdikbud", type: "Pelajaran", status: "Tersedia", img: "assets/pai.jpg" },
    { id: 5, title: "Pendidikan Pancasila (PPKn)", author: "Kemdikbud", type: "Pelajaran", status: "Tersedia", img: "assets/ppkn.jpg" },
    { id: 6, title: "Bahasa Indonesia", author: "Erlangga", type: "Pelajaran", status: "Tersedia", img: "assets/indonesia.jpg" },
    { id: 7, title: "Bahasa Inggris: English for Life", author: "Cambridge", type: "Pelajaran", status: "Tersedia", img: "assets/inggris.jpg" },
    { id: 8, title: "Sejarah Indonesia", author: "Kemdikbud", type: "Pelajaran", status: "Tersedia", img: "assets/sejarah.jpg" },
    { id: 9, title: "Pamekar Basa Sunda", author: "Dinas Pendidikan", type: "Pelajaran", status: "Tersedia", img: "assets/sunda.jpg" },
    { id: 10, title: "Seni Budaya", author: "Kurniawan", type: "Pelajaran", status: "Tersedia", img: "assets/seni rupa.jpg" },
    { id: 11, title: "PJOK (Olahraga)", author: "Sumaryoto", type: "Pelajaran", status: "Tersedia", img: "assets/pjok.jpg" },

    // --- KATEGORI: NOVEL & BACAAN ---
    { id: 12, title: "Laskar Pelangi", author: "Andrea Hirata", type: "Novel", status: "Tersedia", img: "assets/laskar pelangi.jpg" },
    { id: 13, title: "Bumi (Dunia Paralel)", author: "Tere Liye", type: "Novel", status: "Tersedia", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
    { id: 14, title: "Perahu Kertas", author: "Dee Lestari", type: "Novel", status: "Tersedia", img: "assets/perahu kertas.jpg" },
    { id: 15, title: "Dilan 1990", author: "Pidi Baiq", type: "Novel", status: "Tersedia", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400" },
    { id: 16, title: "Negeri 5 Menara", author: "A. Fuadi", type: "Novel", status: "Tersedia", img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400" },
    { id: 17, title: "Atomic Habits", author: "James Clear", type: "Non-Fiksi", status: "Tersedia", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
];

let riwayat = [];

// FUNGSI MENAMPILKAN DAFTAR BUKU
function renderBooks() {
    const container = document.getElementById('book-container');
    container.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author} • <b>${book.type}</b></p>
            <button onclick="${book.status === 'Tersedia' ? `openModal(${book.id}, '${book.title}')` : `kembalikanBuku(${book.id})`}" 
                class="${book.status === 'Tersedia' ? 'btn-available' : 'btn-return'}">
                ${book.status === 'Tersedia' ? 'Pinjam Sekarang' : 'Kembalikan Buku'}
            </button>
        `;
        container.appendChild(card);
    });
}

// FUNGSI KONTROL MODAL (POPUP BIODATA)
function openModal(id, title) {
    document.getElementById('modalPinjam').style.display = 'flex';
    document.getElementById('bookId').value = id;
    document.getElementById('bookTitle').value = title;
}

function closeModal() {
    document.getElementById('modalPinjam').style.display = 'none';
}

// LOGIKA SAAT TOMBOL KONFIRMASI PINJAM DIKLIK
document.getElementById('formPinjam').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('bookId').value);
    const bookIndex = books.findIndex(b => b.id === id);

    // Ubah status buku di daftar utama
    books[bookIndex].status = "Dipinjam";
    
    // Simpan ke riwayat (unshift agar data terbaru ada di paling atas)
    riwayat.unshift({
        nama: document.getElementById('namaSiswa').value,
        kelas: document.getElementById('kelasSiswa').value,
        buku: books[bookIndex].title,
        tglPinjam: new Date().toLocaleDateString('id-ID'),
        tglKembali: document.getElementById('tglKembali').value,
        status: "Dipinjam",
        id: id
    });

    renderBooks();
    renderRiwayat();
    closeModal();
    this.reset();
});

// LOGIKA PENGEMBALIAN BUKU DENGAN KONFIRMASI
function kembalikanBuku(id) {
    const bookIndex = books.findIndex(b => b.id === id);
    const judulBuku = books[bookIndex].title;

    // Munculkan konfirmasi sebelum mengembalikan
    const yakin = confirm(`Apakah Anda yakin ingin mengembalikan buku "${judulBuku}"?`);

    if (yakin) {
        // Balikkan status buku menjadi Tersedia
        books[bookIndex].status = "Tersedia";
        
        // Update status di riwayat
        const rIndex = riwayat.findIndex(r => r.id === id && r.status === "Dipinjam");
        if(rIndex !== -1) {
            riwayat[rIndex].status = "Sudah Dikembalikan";
        }

        renderBooks();
        renderRiwayat();
        alert(`Buku "${judulBuku}" berhasil dikembalikan. Terima kasih!`);
    }
}

// FUNGSI MENAMPILKAN TABEL RIWAYAT
function renderRiwayat() {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = riwayat.map(r => `
        <tr>
            <td><b>${r.nama}</b><br><small>${r.kelas}</small></td>
            <td>${r.buku}</td>
            <td>${r.tglPinjam}</td>
            <td>${r.tglKembali}</td>
            <td>
                <span class="status-badge ${r.status === 'Dipinjam' ? 'status-pinjam' : 'status-kembali'}">
                    ${r.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// Inisialisasi awal saat halaman dimuat
renderBooks();