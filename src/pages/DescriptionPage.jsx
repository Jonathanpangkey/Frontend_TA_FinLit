import React from "react";
import Navbar from "../components/Navbar";

const DescriptionPage = () => {
  return (
    <>
      <Navbar />
      <div className='description-page container'>
        <h3 style={{textAlign: "center"}}>Deskripsi singkat</h3>
        <h2 className='judul-tentang' style={{textAlign: "center", marginTop: "3rem", fontStyle: "italic"}}>
          Financial Literacy
        </h2>
        <p>Tujuan dari aplikasi ini adalah untuk:</p>
        <ul>
          <li>Meningkatkan literasi keuangan masyarakat.</li>
          <li>Membantu pengguna memahami konsep-konsep keuangan dasar dan lanjutan.</li>
          <li>Menyediakan materi yang disajikan dengan mudah dipahami dan ramah pengguna.</li>
          <li>Mendorong pengguna untuk mengambil kontrol lebih besar atas keuangan pribadi mereka.</li>
        </ul>

        <h4>Apa yang Akan Dipelajari</h4>
        <p>
          Aplikasi ini menyediakan berbagai materi pembelajaran yang berkaitan dengan literasi keuangan. Pengguna akan mempelajari konsep-konsep dasar
          keuangan, termasuk pengelolaan uang, investasi, perbankan dan perencanaan keuangan pribadi. Setiap materi dilengkapi dengan kuis untuk
          menguji pemahaman pengguna, latihan mandiri serta UAS untuk evaluasi akhir.
        </p>

        <h4>Buku yang Digunakan</h4>
        <p>
          Materi dalam aplikasi ini diadaptasi dari buku-buku dan sumber terpercaya dari <strong>Otoritas Jasa Keuangan (OJK)</strong>. Buku-buku ini
          mencakup panduan dan pengetahuan terbaru tentang literasi keuangan yang penting bagi masyarakat.
        </p>

        <h4>Konten Belajar</h4>
        <ul>
          <li>
            <strong>Pengelolaan Keuangan:</strong> Mempelajari cara membuat anggaran, menabung, mengelola pengeluaran, serta memahami pentingnya dan
            manfaat investasi sedini mungkin.
          </li>
          <li>
            <strong>Perbankan:</strong> Memahami layanan perbankan dasar, manajemen rekening, serta produk dan layanan perbankan lainnya yang
            mendukung pengelolaan keuangan pribadi.
          </li>
        </ul>
      </div>
    </>
  );
};

export default DescriptionPage;
