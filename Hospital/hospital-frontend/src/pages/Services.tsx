import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_SERVICES } from '../graphql/queries';
import { Services } from '../types';
import { Box, Card, Typography, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServicesComponent: React.FC = () => {
  const { loading, error, data } = useQuery<{ getAllServices: Services[] }>(GET_ALL_SERVICES);
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const handleChooseService = (serviceName: string) => {
    navigate(`/${serviceName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-gray-100">
      <Typography variant="h4" align="center" gutterBottom>
        Services Offered
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Our Services for Your Health
      </Typography>

      <Box className="grid grid-cols-2 gap-x-8 gap-y-8 justify-items-center p-4">
        {data?.getAllServices?.map((service: Services, index: number) => (
          <Card 
            key={index} 
            sx={{ width: 300, padding: 2, textAlign: 'center', cursor: 'pointer' }} 
            onClick={() => handleChooseService(service.name)}
          >
            {/* Display Icon from Image URL */}
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
              <img
                src={service.imageUrl}
                alt={service.name}
                style={{ width: '40px', height: '40px' }}
                onError={(e) => (e.currentTarget.src = 'https://api.iconify.design/heroicons-outline:question-mark-circle.svg')}
              />
              <Typography variant="h5">{service.name}</Typography>
            </Stack>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ServicesComponent;
