import Navbar from "../components/Navbar";
import MaterialSection from "../components/MaterialSection";

function Home() {
  
  const materialGroups = [
    {
      sectionTitle: "Pengelolaan Keuangan",
      materials: [
        {title: "Dasar dasar finansial", completed: 0, total: 3},
        {title: "Dasar dasar finansial", completed: 0, total: 3},
      ],
    },
    {
      sectionTitle: "Pengelolaan Keuangan 2",
      materials: [
        {title: "Dasar dasar finansial", completed: 0, total: 3},
        {title: "Ujian Akhir", completed: 0, total: 3},
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className='container home-container'>
        <div className='top-home'>
          <h3>
            Halo, <span>Jonathan Pangkey</span>
          </h3>
          <p>Yuk mulai belajar ilmu finansial !!</p>
          <div className='progress-box'>
            <h2>PROGRESS KAMU SAAT INI</h2>
            <div className='circle'></div>
          </div>
        </div>

        {/* Material List Sections */}
        <>
          {materialGroups.map((group, index) => (
            <MaterialSection key={index} sectionTitle={group.sectionTitle} materials={group.materials} />
          ))}
        </>
      </div>
    </>
  );
}

export default Home;
