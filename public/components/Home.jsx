import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-yellow-500 text-white py-12 text-center">
        <h1 className="text-5xl font-extrabold">Welcome to Our Panchayat</h1>
        <p className="text-lg mt-4">
          Empowering Communities with Access, Information, and Development.
        </p>
      </header>

      {/* Carousel Section */}
      <section className="my-12">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className="mx-auto max-w-5xl shadow-lg rounded-lg"
        >
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAb6TnuyX-qvuFsHXzO0Neo6bzCK3yXraGw32nuHpsTTFMWdguCY9RUb_hPjD7WTMbpk&usqp=CAU"
              alt="Community Events"
            />
            <p className="legend text-lg font-medium">Community Events</p>
          </div>
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/054/211/144/small_2x/a-serene-landscape-featuring-rolling-hills-and-a-small-village-under-a-bright-sky-photo.jpg"
              alt="Public Services"
            />
            <p className="legend text-lg font-medium">Public Services</p>
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLUqp794mBgbuaW8z0Qf0xVaO333loBi9D-JUX08ps28PUl8yC31vCM2Tlthd-LX0gkg&usqp=CAU"
              alt="Infrastructure Development"
            />
            <p className="legend text-lg font-medium">Infrastructure Development</p>
          </div>
          <div>
            <img
              src="https://news.microsoft.com/source/asia/wp-content/uploads/2024/02/Karya-hero-scaled.jpg"
              alt="Employment Opportunities"
            />
            <p className="legend text-lg font-medium">Employment Opportunities</p>
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_EMGVTX9ZspP0kSOLigRt8-nP5vdICcO09Q&s"
              alt="Environmental Initiatives"
            />
            <p className="legend text-lg font-medium">Environmental Initiatives</p>
          </div>
        </Carousel>
      </section>

      {/* Information Section */}
      <section className="text-center py-12 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Empowering Our Community
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Explore essential services, stay updated on the latest announcements,
          and take advantage of resources to contribute to the growth and
          development of our Panchayat. Together, let us create a brighter
          future.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-4">
            &copy; {new Date().getFullYear()} Digital Panchayat. All rights reserved.
          </p>
          <p className="mb-4">
            Contact us:{" "}
            <a href="mailto:info@panchayat.gov" className="text-yellow-400 hover:underline">
              info@panchayat.gov
            </a>{" "}
            | Phone: 1800-123-456
          </p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-yellow-400 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-yellow-400 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-yellow-400 hover:underline">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
