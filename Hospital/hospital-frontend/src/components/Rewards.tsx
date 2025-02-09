import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const rewardsData = [
  {
    title: "Excellence in Patient Care",
    description:
      "Recognized for outstanding commitment to patient well-being and innovative medical care.",
    icon: <StarBorderIcon fontSize="large" className="text-yellow-500" />,
  },
  {
    title: "Prestigious Healthcare Awards",
    description:
      "Recipient of multiple national and international healthcare excellence awards.",
    icon: <EmojiEventsIcon fontSize="large" className="text-red-500" />,
  },
  {
    title: "Pioneering Medical Innovation",
    description:
      "Leading the way in cutting-edge medical research and breakthrough treatments.",
    icon: <LightbulbIcon fontSize="large" className="text-blue-500" />,
  },
];

const Rewards: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <Typography variant="h4" className="text-gray-800 font-bold mb-6">
        Our Achievements
      </Typography>
      <div className="space-y-6 w-full max-w-md">
        {rewardsData.map((reward, index) => (
          <Card
            key={index}
            className="shadow-lg rounded-2xl border border-gray-300 bg-white"
          >
            <CardHeader className="flex items-center gap-4 p-5 flex-row">
              {reward.icon}
              <Typography variant="h6" className="font-semibold text-gray-800">
                {reward.title}
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="body1" className="text-gray-600">
                {reward.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
