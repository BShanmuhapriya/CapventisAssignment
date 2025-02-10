import { GET_ALL_DOCTORS } from "../graphql/queries";

export const mockDoctorsData = {
    request: {
      query: GET_ALL_DOCTORS,
    },
    result: {
      data: {
        getAllDoctors: [
          {
            id: "1",
            name: "Dr. John Doe",
            specialization: "General Physician",
            fees: 50,
          },
          {
            id: "2",
            name: "Dr. Jane Smith",
            specialization: "Pediatrician",
            fees: 60,
          },
        ],
      },
    },
  };