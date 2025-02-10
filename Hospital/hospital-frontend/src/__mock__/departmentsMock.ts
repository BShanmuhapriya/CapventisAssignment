import { GET_ALL_DEPARTMENTS } from "../graphql/queries";

export const mockDepartmentsData = {
    request: {
      query: GET_ALL_DEPARTMENTS,
    },
    result: {
      data: {
        getAllDepartments: [
          { name: "Cardiology" },
          { name: "Neurology" },
          { name: "Pediatrics" },
        ],
      },
    },
  };