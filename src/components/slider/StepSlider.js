import React, { useState } from 'react'
import { Box, Slider, IconButton, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setStepValue } from '../redux/optionsSlice';


const StepSlider = () => {

    const dispatch = useDispatch(); // Sử dụng useDispatch
    const [value, setValue] = useState(25);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        // dispatch(setStepValue(value))
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        // dispatch(setStepValue(value))

    };

    dispatch(setStepValue(value))

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

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
                />
            </Box>
            <IconButton onClick={() => {
                setValue(value < 100 ? value + 1 : 100)
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
                inputProps={{style: { 
                    textAlign: 'right', 
                    display:'flex',
                    alignContent: 'center',
                    alignItems:'center'
                }}}
                style={{ width: 50, textAlign: 'right'}}
            />
            <Typography>Steps</Typography>
        </Box>
    )
}

export default StepSlider
