"use client";

import {ArticlesTable} from "@/app/ArticlesTable/ArticlesTable";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './styles.css';

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <ArticlesTable/>
        </ThemeProvider>
    );
}



