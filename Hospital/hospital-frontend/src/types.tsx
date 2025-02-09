export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  fees: number;
  availableSlots: { 
    date: string; 
    slots: string[] 
  }[];
}

export interface Departments {
  name: string;
}

export interface Services {
  name: string;
  imageUrl: string;
}

export interface Feedback {
  feedback: string;
  rating: number;
}

export interface Appointments {
  gender: string;
  bloodgroup: string;
}