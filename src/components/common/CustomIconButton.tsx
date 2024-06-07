import { Button, SxProps, Theme, IconButton } from '@mui/material';
import React from 'react';
import useWindowDimensions from '../../custom-hooks/GetWindowDimesions';

interface CustomIconButtonProps {
    onClick: (() => Promise<void>) | (() => void),
    text: string,
    sx?: SxProps<Theme>,
    icon: React.ReactNode
}



const CustomIconButton = (props: CustomIconButtonProps) => {

    // hook to retrieve device dimensions
    const { height, width } = useWindowDimensions();
    console.log(height, width)

    const isMobileView: boolean = (width<600)
    const { onClick, text, sx, icon } = props;

    // error catching
    const handleClick = async () => {
        if (typeof onClick === 'function') {
            try {
                await onClick();
            } catch (error) {
                console.error('Error during onClick:', error);
            }
        }
    };

    // if mobile view, rtn just the icon into the button
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
