import { Link } from "react-router";
import bannerImg from "../../assets/blood-doner.jpg";

const Banner = () => {
  return (
   <div
  className="hero min-h-screen"
  style={{
        backgroundImage: `url(${bannerImg})`,
      }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="text-center">
      <h1 className="mb-5 text-5xl font-bold">Donate Blood, Keep the World Beating</h1>
      <p className="mb-5">
        Join as a donor and help someone in need, or search available donors.
      </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="btn bg-[#b71b1c] border-0 text-white">
            Join as a Donor
          </Link>
          <Link to="/search-donors" className="btn btn-outline text-white border-[#b71b1c]">
            Search Donors
          </Link>
        </div>
    </div>
  </div>
</div>
  );
};

export default Banner;
