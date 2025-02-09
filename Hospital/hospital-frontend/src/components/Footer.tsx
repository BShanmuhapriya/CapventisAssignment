import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  return (
    <Box className="bg-gray-700 text-white py-8 px-12 flex justify-between flex-wrap">
      {/* Company Section */}
      <Box className="w-1/3 min-w-[200px]">
        <Typography variant="h6" className="mb-2">Company</Typography>
        <ul className="space-y-1">
          <li><Link href="#" className="!no-underline !text-white">Home</Link></li>
          <li><Link href="#" className="!no-underline !text-white">About Us</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Services</Link></li>
          <li><Link href="#" className="t!no-underline !text-white">Clinical Care</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Resources</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Reviews</Link></li>
          <li><Link href="#" className="!no-underline !text-white">FAQ's</Link></li>
        </ul>
      </Box>
      
      {/* Our Services Section */}
      <Box className="w-1/3 min-w-[200px]">
        <Typography variant="h6" className="mb-2">Our Services</Typography>
        <ul className="space-y-1">
          <li><Link href="#" className="!no-underline !text-white">Annual Checkup</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Ambulance Services</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Blood Bank Services</Link></li>
          <li><Link href="#" className="!no-underline !text-white">Laboratory Services</Link></li>
        </ul>
      </Box>
      
      {/* Contact Information Section */}
      <Box className="w-1/3 min-w-[200px]">
        <Typography variant="h6" className="mb-2">Contact Information</Typography>
        <ul className="space-y-2">
          <li className="flex items-center text-white"><LocationOnIcon className="mr-2 text-blue-300"/> 1901 Thornridge Cir, Hawaii 81063</li>
          <li className="flex items-center text-white"><LocationOnIcon className="mr-2 text-blue-300"/> 12+ Locations</li>
          <li className="flex items-center text-white"><EmailIcon className="mr-2 text-blue-300"/> contact@medisync.com</li>
          <li className="flex items-center text-white"><Link href="#" className="!no-underline !text-white">medisync.com</Link></li>
          <li className="flex items-center text-white"><PhoneIcon className="mr-2 text-blue-300"/> (907) 555-0101</li>
        </ul>
      </Box>
    </Box>
  );
}
