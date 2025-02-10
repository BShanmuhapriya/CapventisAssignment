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
          specialization: "Cardiologist",
          fees: 200,
          availableSlots: [{ date: "2024-02-15", slots: ["10:00 AM", "2:00 PM"] }],
        },
        {
          id: "2",
          name: "Dr. Jane Smith",
          specialization: "Dermatologist",
          fees: 250,
          availableSlots: [{ date: "2024-02-16", slots: ["11:00 AM", "3:00 PM"] }],
        },
      ],
    },
  },
};
