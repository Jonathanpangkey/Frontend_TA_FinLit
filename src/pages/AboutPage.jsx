import React from "react";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className='about-page container'>
        <h3 style={{textAlign: "center"}}>Tentang Aplikasi</h3>
        <h2 className='judul-tentang' style={{textAlign: "center", marginTop: "3rem", fontStyle: "italic"}}>
          Financial Literacy
        </h2>
        <section>
          <p>
            Aplikasi ini dirancang untuk membantu pengguna dalam meningkatkan literasi keuangan mereka. Melalui berbagai materi, quiz, dan Ujian
            Akhir, aplikasi ini memberikan pengalaman belajar yang interaktif dan komprehensif. Tujuan utama dari aplikasi ini adalah untuk memudahkan
            akses ke informasi keuangan yang penting dan memberikan alat yang diperlukan bagi pengguna untuk membuat keputusan keuangan yang lebih
            baik.
          </p>
        </section>
        <section>
          <h4>Fitur Utama</h4>
          <ul>
            <li>
              <strong>Materi Pembelajaran:</strong> Beragam topik tentang literasi keuangan, termasuk pengelolaan uang, investasi, asuransi, dan
              perencanaan keuangan pribadi.
            </li>
            <li>
              <strong>Quiz Interaktif:</strong> Setiap topik dilengkapi dengan quiz untuk menguji pemahaman pengguna dan memberikan umpan balik secara
              langsung.
            </li>
            <li>
              <strong>Ujian Akhir Semester (UAS):</strong> Evaluasi komprehensif untuk menilai pengetahuan pengguna setelah menyelesaikan semua
              materi.
            </li>
            <li>
              <strong>Progress Tracking:</strong> Pengguna dapat melacak kemajuan mereka melalui setiap topik dan quiz.
            </li>
            <li>
              <strong>Latihan Mandiri:</strong> Pengguna dapat melakukan langkah-langkah praktis dalam mengelola keuangan, seperti mengatur anggaran,
              menilai pengeluaran, dan merencanakan tabungan atau investasi berdasarkan materi yang telah dipelajari.
            </li>
          </ul>
        </section>
        <section>
          <h4>Informasi Tambahan</h4>
          <p>
            <strong>Tahun:</strong> 2024
          </p>
          <p>
            <strong>Pembuat:</strong> Jonathan Pangkey
          </p>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
