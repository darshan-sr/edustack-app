"use client";
import { useState, useEffect } from "react";
import { Select, Button } from "antd";
import { BsStack } from "react-icons/bs";
import { useRouter } from "next/navigation";

const { Option } = Select;

interface Institution {
  name: string;
  url: string;
}

const institutions: Institution[] = [
  {
    name: "RV Institute of Technology and Management",
    url: "https://rvitm.edu-stack.com",
  },
  // Add more institutions if needed
];

const Home = () => {
  const router = useRouter();
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  const handleContinue = () => {
    if (selectedInstitution) {
      // Save the selected institution to localStorage
      localStorage.setItem(
        "selectedInstitution",
        JSON.stringify(selectedInstitution)
      );

      // Redirect to the selected institution's URL
      router.push(selectedInstitution.url);
    }
  };

  if (typeof window !== "undefined") {
    const storedInstitution = localStorage.getItem("selectedInstitution");

    if (!storedInstitution) {
      return (
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
          <div className="w-11/12 max-w-md flex flex-col items-center justify-center text-center bg-white rounded-xl border border-solid border-gray-200 p-4">
            <h4 className="font-poppins flex flex-row  my-4 font-semibold  text-[25px] text-gray-700 mt-3">
              <BsStack className="w-10 h-10 text-blue-600 pr-2" /> Edustack
            </h4>
            <p>Welcome, Please select your Institution to Continue!</p>
            <Select
              placeholder="Select your institution"
              size="large"
              style={{ width: "100%", marginBottom: 30, marginTop: 30 }}
              onChange={(value) =>
                setSelectedInstitution(
                  institutions.find(
                    (inst) => inst.name === value
                  ) as Institution
                )
              }
            >
              {institutions.map((inst) => (
                <Option key={inst.name} value={inst.name}>
                  {inst.name}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              className="bg-blue-600"
              size="large"
              block
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      );
    } else {
      const url = JSON.parse(storedInstitution);
      return router.push(url.url);
    }
  } else {
    return <></>;
  }
};

export default Home;
