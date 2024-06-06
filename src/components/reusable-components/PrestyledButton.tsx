import { Button, SxProps, Theme } from '@mui/material';
import useWindowDimensions from '../custom-hooks/GetWindowDimesions';

interface ButtonProps {
    onClick: (() => Promise<void>) | (() => void),
    text: string,
    sx?: SxProps<Theme>
}

const PrestyledButton = (props: ButtonProps) => {
    const { onClick, text, sx } = props;

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
        <Button variant="contained" onClick={handleClick} sx={sx || { backgroundColor: "green" }}>
                {text}
        </Button>
    )
};

export default PrestyledButton;
