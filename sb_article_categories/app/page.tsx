"use client";

import {ArticlesTable} from "@/app/ArticlesTable/ArticlesTable";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import theme from './theme';

const queryClient = new QueryClient();


export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ArticlesTable/>
            </ThemeProvider>
        </QueryClientProvider>

    );
}
