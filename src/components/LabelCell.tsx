import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  label: string;
}

const LabelCell: React.FC<Props> = ({ label }) => {
  return (
    <Box
      width="100px"
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth="1px"
      borderColor="gray.300"
      backgroundColor="gray.100"
      fontWeight="semibold"
      fontSize="sm"
      userSelect="none"
    >
      {label}
    </Box>
  );
};

export default LabelCell;
