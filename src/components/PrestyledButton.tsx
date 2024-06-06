import React from 'react'
import { Button, SxProps, Theme } from '@mui/material'

interface ButtonProps{
    onClick: (()=>Promise<void>) | (()=>void),
    text: string,
    sx?: SxProps<Theme>
}


const PrestyledButton = (props: ButtonProps) => {
    let { onClick, text, sx } = props;
    const handleClick = async () => {
        if (typeof onClick === 'function') {
            try {
                await onClick();
            } catch (error) {
                console.error('Error during onClick:', error);
            }
        }
    };
    
    if (!sx){
        sx = {backgroundColor:"green"}
    }
  return (
    <Button variant="contained" onClick={()=>{handleClick}} sx={sx}>{text}</Button>
  )
}

export default PrestyledButton