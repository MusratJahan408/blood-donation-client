const Featured = () => {
  const features = [
    {
      title: "Smart Donor Search",
      desc: "Easily find donors by blood group, district and upazila.",
      icon: "🔍",
    },
    {
      title: "Emergency Requests",
      desc: "Post emergency blood requests and notify nearby donors.",
      icon: "🚨",
    },
    {
      title: "Verified Donors",
      desc: "Only active & verified donors appear in search.",
      icon: "✔️",
    },
    {
      title: "Location Based Match",
      desc: "Get donors matched based on your nearest area.",
      icon: "📍",
    },
  ];

  return (
    <div className="my-10 md:my-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Featured Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="card bg-base-200 p-6 shadow-md text-center">
            <div className="text-5xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
