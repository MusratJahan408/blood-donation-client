import { useEffect, useState } from "react";

const useLocationData = () => {
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistrict(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazila(data));
  }, []);

  return { district, upazila };
};

export default useLocationData;
