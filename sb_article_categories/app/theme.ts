import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark', depending on your preference
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#ffffff',
            paper: '#f4f4f4',
        },
        text: {
            primary: '#000000',
            secondary: '#333333',
        },
    },
});

export default theme;
