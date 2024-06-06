import { Button, SxProps, Theme } from '@mui/material';
import React from 'react';

interface IconButtonProps {
    onClick: (() => Promise<void>) | (() => void),
    text: string,
    sx?: SxProps<Theme>,
    icon: React.ReactNode
}

const IconButton = (props: IconButtonProps) => {
    const { onClick, text, sx, icon } = props;

    const handleClick = async () => {
        if (typeof onClick === 'function') {
            try {
                await onClick();
            } catch (error) {
                console.error('Error during onClick:', error);
            }
        }
    };

    return (
        <Button variant="contained" onClick={handleClick} startIcon={icon} sx={sx||{backgroundColor:"green"}}>
                {text}
        </Button>
    );
};

export default IconButton;
