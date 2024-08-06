import React, { useState } from 'react'
import { Box, Slider, IconButton, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setScale } from '../redux/optionsSlice';

const ScaleSlider = () => {


    const dispatch = useDispatch(); // Sử dụng useDispatch
    const [value, setValue] = useState(7);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        // dispatch(setStepValue(value))
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        // dispatch(setStepValue(value))

    };

    dispatch(setScale(value))

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 20) {
            setValue(20);
        }
    };

    console.log(value)
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => {
                setValue(value > 0 ? value - 1 : 0)
                // dispatch(setStepValue(value))
            }
            }>
                <RemoveIcon />
            </IconButton>
            <Box flexGrow={1}>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    max={20}
                />
            </Box>
            <IconButton onClick={() => {
                setValue(value < 20 ? value + 1 : 20)
                // dispatch(setStepValue(value))
            }
            }>
                <AddIcon />
            </IconButton>
            <TextField
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    step: 1,
                    min: 0,
                    max: 20,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
                style={{ width: 50 }}
            />
            <Typography>Steps</Typography>
        </Box>
    )
}

export default ScaleSlider
