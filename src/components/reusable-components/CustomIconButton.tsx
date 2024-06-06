import { Button, SxProps, Theme, IconButton } from '@mui/material';
import React from 'react';
import useWindowDimensions from '../custom-hooks/GetWindowDimesions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface CustomIconButtonProps {
    onClick: (() => Promise<void>) | (() => void),
    text: string,
    sx?: SxProps<Theme>,
    icon: React.ReactNode
}



const CustomIconButton = (props: CustomIconButtonProps) => {

    const { height, width } = useWindowDimensions();
    console.log(height, width)

    const isMobileView: boolean = (width<600)
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

    if (isMobileView)
        return (
            <IconButton onClick={handleClick}>
                {icon}
            </IconButton>)


    return (
        <Button variant="contained" onClick={handleClick} startIcon={icon} sx={sx||{backgroundColor:"green"}}>
                {text}
        </Button>
    );
};

export default CustomIconButton;
