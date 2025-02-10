import { gql } from '@apollo/client';

export const GET_ALL_DOCTORS = gql`
  query GetAllDoctors {
    getAllDoctors {
      name
      specialization
      fees
      availableSlots {
        date
        slots
      }
    }
  }
`;

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    getAllDepartments{
      name
    }
  }
`;


export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    getAllServices{
      name,
      imageUrl
    }
  }
`;

export const GET_ALL_FEEDBACK = gql`
  query GetAllFeedback {
    getAllFeedback {
      feedback
      rating
    }
  }
`;

export const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointments {
    getAllAppointments {
      id
      gender
      bloodgroup
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $gender: String!,
    $bloodgroup: String!,
    $reason: String!
  ) {
    createAppointment(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      gender: $gender,
      bloodgroup: $bloodgroup,
      reason: $reason
    ) {
      id
      firstName
      lastName
      email
      gender
      bloodgroup
      reason
    }
  }
`;
