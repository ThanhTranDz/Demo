import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import './Remover.css';

const UploadBox = styled(Box)(({ theme, isUpload }) => ({
  border: '2px dashed #a855f7',
  borderRadius: '12px',
  textAlign: 'center',
  color: '#9ca3af',
  position: 'relative',
  width: '455px',
  height: '280px',
  overflow: 'hidden',
  backgroundColor: isUpload ? '#767676' : 'white',
}));

const Sidebar = styled(Box)({
  width: '200px',
  padding: '20px',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  // boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Image = styled('img')(({ theme, backgroundColor }) => ({
  maxHeight: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: backgroundColor,
}));

const Loader = styled(CircularProgress)({
  position: 'absolute',
  top: '40%',
  left: '45%',
  transform: 'translate(-50%, -50%)',
  height: '60px',
  color: 'white',
});

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7B1FA2',
  color: 'white',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#920792',
  },

  height: '30px',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  padding: 0,
  color: '#4F555E',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: '#F4F5F6',
  },
  height: '30px',
  boxShadow: 'none'
}));

const Remover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [finalUrl, setFinalUrl] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [viewOriginal, setViewOriginal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [img, setImg] = useState(null)
  const [bg, setBg] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isBgUpload, setIsBgUpload] = useState(false);


  const handleFileInputChange = (e) => {
    let image = e.target.files?.[0];
    setSelectedFile(image || null);
    setImage(image);
    setImg(image)
    if (image) {
      handleFileUpload(image);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const bg = e.target.files?.[0];
    setBackgroundImage(bg)
    console.log("bgdafasf",backgroundImage)
    if (bg) {
      handeBgUpload(bg);
    }
    const url = URL.createObjectURL(bg);
    setBg(url);
    
  };

  const handleFileUpload = async (image) => {
    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    const api_key = '3KkeAm5M2hRQGdcFxqQCqTya';
    setIsUpload(true);

    try {
      const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: {
          "X-Api-Key": api_key,
        },
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setFinalUrl(url);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUpload(false);
    }
  };

  const handeBgUpload = async (backgroundImage) => {
    console.log("DSDAD")
    const formData = new FormData();
    formData.append("image", img);
    console.log(img)
    formData.append("background_image", backgroundImage);
    console.log("bg", backgroundImage)

    const api_key = 'APY0zCqf2WqgUgfnyujtsNfLp3UBjfoDYhHnZiFYiJ0Osn8GtFsupHiwVrmmXcgafcT4VwfTjxR';

    try {
      const response = await axios.post("https://api.apyhub.com/processor/image/change-background/file", formData, {
        headers: {
          'apy-token': api_key,
          'content-type': 'multipart/form-data',
        },
        responseType: 'blob', // Specify the response type as blob
        params: { output: 'test-sample.png' },
      });
      console.log("adfafasf")

      const url = URL.createObjectURL(response.data);
      setFinalUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUpload(false);
    }
  }

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'processed_image_with_background.png';
      link.click();
    };
    img.src = finalUrl;
  };

  const handleClose = () => {
    setFinalUrl(null);
    setBackgroundColor('transparent')
    setBackgroundImage(null)
    setBg(null)
  };

  const toggleView = () => {
    setViewOriginal(!viewOriginal);
  };

  const handleColorChange = (color) => {
    setBackgroundColor(color);
  };



  const colors = [
    'transparent', 'white', 'black', 'gray', 'red', 'pink', 'orange',
    'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'rainbow'
  ];

  const ColorPicker = ({ onChange }) => (
    <Box display="flex" justifyContent="center" mt={2}>
      {colors.map((color, index) => (
        <Box
          key={index}
          onClick={() => onChange(color)}
          sx={{
            width: 24,
            height: 24,
            bgcolor: color === 'rainbow' ? 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' : color,
            borderRadius: '50%',
            margin: '0 4px',
            border: color === backgroundColor ? '2px solid blue' : '2px solid transparent',
            cursor: 'pointer',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#f3f4f6">
      <div className='box' style={{ display: 'flex' }}>
        <UploadBox isUpload={isUpload} backgroundColor={backgroundColor}>
          {selectedFile && (
            <Image src={URL.createObjectURL(selectedFile)} alt="Original" />
          )}
          {isUpload && (
            <>
              <Loader style={{ height: '60px', width: '60px' }} />
              <Typography variant="h5" style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontWeight: '600', width: '100%' }}>
                Removing the background
              </Typography>
            </>
          )}
          {!selectedFile && !finalUrl && (
            <>
              <UploadFileIcon style={{ fontSize: '3.5em', paddingTop: '40px' }} />
              <Typography variant="h5" gutterBottom style={{ paddingTop: '40px', paddingBottom: '30px', fontWeight: '600', color: 'black' }}>
                Pick an image to remove
              </Typography>
              <input type="file" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} id="file-input" />
              <label htmlFor="file-input">
                <Button variant="contained" color="secondary" component="span" style={{ borderRadius: '25px', width: '195px' }} startIcon={<UploadFileIcon />}>
                  Select a file
                </Button>
              </label>
            </>
          )}
          {finalUrl && (
            <>
              <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>

              <IconButton style={{ position: 'absolute', top: 10, left: 10 }} onClick={toggleView}>
                <VisibilityIcon />
              </IconButton>

              <Image backgroundColor={backgroundColor} src={viewOriginal ? URL.createObjectURL(image) : finalUrl} />
            </>
          )}

        </UploadBox>

        {finalUrl && (
          <Sidebar>
            {/* <OptionButton variant="contained" onClick = {handleBackgroundImageChange} startIcon={<UploadFileIcon />}>Change Background</OptionButton> */}
            {/* <input type="file" accept="image/*" onChange={handleBackgroundImageChange} style={{ display: 'none' }} id="file-input" />
            <label htmlFor="file-input">
              <OptionButton variant="contained" startIcon={<UploadFileIcon />}>
                Change Background
              </OptionButton>
            </label> */}

            <input type="file" accept="image/*" onChange={handleBackgroundImageChange} style={{ display: 'none' }} id="file-input" />
            <label htmlFor="file-input">
              <OptionButton variant="contained" color="secondary" component="span" style={{ borderRadius: '25px', width: '195px' }} startIcon={<UploadFileIcon />}>
                Select a file
              </OptionButton>
            </label>

            <img src={bg} style={{ width: '50%', paddingTop: '10px' }}></img>
            <CustomButton variant="contained" color="primary" onClick={handleDownload} startIcon={<DownloadIcon />} style={{ marginTop: '20px' }}>
              Download
            </CustomButton>
          </Sidebar>
        )}
      </div>

      {finalUrl && (
        <ColorPicker onChange={handleColorChange} />

      )}
      <div className='selection'>
        {!finalUrl && (
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
            By uploading a file, you agree to{' '}
            <a href="https://picsart.com/terms-of-use" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="https://picsart.com/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            of Picsart.
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default Remover;
