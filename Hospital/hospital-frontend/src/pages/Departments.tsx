import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DEPARTMENTS } from '../graphql/queries';
import { Departments } from '../types';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const DepartmentsComponent: React.FC = () => {
  const { loading, error, data } = useQuery<{ getAllDepartments: Departments[] }>(GET_ALL_DEPARTMENTS);
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const handleChooseService = (departmentName: string) => {
    navigate(`/${departmentName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Services offered by us for you
        </Typography>
        <Box className="flex flex-wrap justify-evenly gap-3 mt-4">
          {data?.getAllDepartments?.map((department: Departments, index: number) => (
            <Card key={index} sx={{ width: 300, padding: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => handleChooseService(department.name)}>
              <Typography variant="h5">{department.name}</Typography>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer/>
    </div>
  );
};

export default DepartmentsComponent;
