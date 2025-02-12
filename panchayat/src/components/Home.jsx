import { FaUsers, FaBuilding, FaLeaf, FaBriefcase, FaHandsHelping } from "react-icons/fa";
import Navbar from "./Navbar";
import { Card, CardContent, CardMedia, Typography, Container, Grid, Box, Link } from "@mui/material";

function Home() {
  const services = [
    {
      title: "Community Events",
      description: "Engage in events that strengthen community bonds.",
      icon: <FaUsers style={{ fontSize: "2rem", color: "#00796b" }} />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAb6TnuyX-qvuFsHXzO0Neo6bzCK3yXraGw32nuHpsTTFMWdguCY9RUb_hPjD7WTMbpk&usqp=CAU",
    },
    {
      title: "Public Services",
      description: "Access essential government services with ease.",
      icon: <FaHandsHelping style={{ fontSize: "2rem", color: "#00796b" }} />,
      image: "https://static.vecteezy.com/system/resources/thumbnails/054/211/144/small_2x/a-serene-landscape-featuring-rolling-hills-and-a-small-village-under-a-bright-sky-photo.jpg",
    },
    {
      title: "Infrastructure Development",
      description: "Building a better future with strong infrastructure.",
      icon: <FaBuilding style={{ fontSize: "2rem", color: "#00796b" }} />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLUqp794mBgbuaW8z0Qf0xVaO333loBi9D-JUX08ps28PUl8yC31vCM2Tlthd-LX0gkg&usqp=CAU",
    },
    {
      title: "Employment Opportunities",
      description: "Discover job openings and career development programs.",
      icon: <FaBriefcase style={{ fontSize: "2rem", color: "#00796b" }} />,
      image: "https://news.microsoft.com/source/asia/wp-content/uploads/2024/02/Karya-hero-scaled.jpg",
    },
    {
      title: "Environmental Initiatives",
      description: "Promoting sustainable practices for a greener future.",
      icon: <FaLeaf style={{ fontSize: "2rem", color: "#00796b" }} />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_EMGVTX9ZspP0kSOLigRt8-nP5vdICcO09Q&s",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ backgroundColor: "#00796b", color: "white", py: 6, textAlign: "center" }}>
        <Typography variant="h2" fontWeight="bold">
          Welcome to Our Panchayat
        </Typography>
        <Typography variant="h6" mt={2}>
          Empowering Communities with Access, Information, and Development.
        </Typography>
      </Box>

      {/* Services Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.title}
                  sx={{ height: 200, objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  {service.icon}
                  <Typography variant="h5" mt={2} fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: "#333", color: "white", py: 4, textAlign: "center" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          &copy; {new Date().getFullYear()} Digital Panchayat. All rights reserved.
        </Typography>
        <Typography variant="body2" mt={1}>
         <Link href="mailto:info@panchayat.gov" color="#00796b" underline="hover">info@panchayat.gov</Link> | 1800-123-456
        </Typography>
        <Box mt={2}>
          <Link href="#" color="#00796b" underline="hover" mx={1}>
            Privacy Policy
          </Link>
          <Link href="#" color="#00796b" underline="hover" mx={1}>
            Terms of Service
          </Link>
          <Link href="#" color="#00796b" underline="hover" mx={1}>
            Help
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
