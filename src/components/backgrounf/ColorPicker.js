import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogContent } from '@mui/material';
import { CirclePicker } from 'react-color';
import { ColorLens as ColorLensIcon } from '@mui/icons-material';

const ColorPicker = ({ onColorChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#fff');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleColor = (color) => {
    setSelectedColor(color.hex);
    onColorChange(color.hex);
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <ColorLensIcon style={{ color: selectedColor }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <CirclePicker color={selectedColor} onChange={handleColor} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ColorPicker;
