import { GET_ALL_SERVICES } from "../graphql/queries";

export const mockServicesData = {
  request: {
    query: GET_ALL_SERVICES,
  },
  result: {
    data: {
      getAllServices: [
        { name: "Cardiology", imageUrl: "/images/cardiology.png" },
        { name: "Dermatology", imageUrl: "/images/dermatology.png" },
      ],
    },
  },
};
