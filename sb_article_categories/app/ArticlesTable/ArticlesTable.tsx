import React, {useMemo, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {articles, categories} from "./articles";
import {columns} from "./constants";
import {Box, Tab, Tabs, Typography, IconButton, Modal} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article, AugmentedArticle} from "@/app/ArticlesTable/types";
import {CategoryCountTable} from "@/app/ArticlesTable/CategoryCountTable";
import About from "@/app/ArticlesTable/About";
import ReactMarkdown from 'react-markdown';

export const ArticlesTable: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentSummary, setCurrentSummary] = useState<AugmentedArticle | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleCloseModal = () => {
        setCurrentSummary(null);
    };

    const augmentedColumns = useMemo(() => columns.map((col) => augmentColumn(col, setCurrentSummary)), []);
    const augmentedArticles = useMemo(() => articles.map(augmentArticle), []);
    const categoriesCount = useMemo(() => categories.map((category) => ({
        ...category,
        articles: augmentedArticles.reduce((count, article) => count + (article.category === category.name ? 1 : 0), 0)
    })), [augmentedArticles]);

    return (
        <Box sx={{margin: '1em'}} id={'top'}>
            <Typography variant="h4" gutterBottom>
                AI Categorization of Slow Boring Articles
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{maxWidth: '50em'}}>
                You can browse <a href="https://www.slowboring.com/">Slow Boring</a> articles in the sortable and
                filterable table.
                You can also explore the categories, including key words and a summary for each, in the Categories tab.
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange}
                  sx={{marginBottom: '1em', borderBottom: '1px solid', borderColor: 'divider'}}>
                <Tab label="Articles" value={0}/>
                <Tab label="Categories" value={1}/>
                <Tab label="About" value={2}/>
            </Tabs>
            {selectedTab === 0 && (
                <DataGrid
                    columns={augmentedColumns}
                    rows={augmentedArticles}
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 10}},
                        columns: {
                            columnVisibilityModel: {
                                title: true,
                                category: true,
                                date: true,
                                authors: true,
                                likes: true,
                                comment_count: true,
                            },
                        },
                        sorting: {
                            sortModel: [{field: 'date', sort: 'desc'}],
                        },
                    }}
                />
            )}
            {selectedTab === 1 && (
                <CategoryCountTable categories={categoriesCount}/>
            )}
            {selectedTab === 2 && (
                <About/>
            )}
            <Modal
                open={currentSummary !== null}
                onClose={handleCloseModal}
                aria-labelledby="article-summary-title"
                aria-describedby="article-summary-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '30em',
                    maxWidth: '50em',
                    width: 'calc(100vw - 2em)',
                    minHeight: '50%',
                    maxHeight: '90%',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 2
                }}>
                    {currentSummary && (
                        <>
                            <Typography id="article-summary-title" variant="h6" component="h2">
                                Summary of &quot;{currentSummary.title}&quot;
                            </Typography>
                            <ReactMarkdown>{currentSummary.summary}</ReactMarkdown>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    )
}

const augmentTitleColumn = (colDef: GridColDef<AugmentedArticle>, setCurrentSummary: React.Dispatch<AugmentedArticle | null>): GridColDef<AugmentedArticle> => {
    return {
        ...colDef,
        renderCell: (params) => (
            <Box display="flex" alignItems="center">
                <a href={params.row.canonical_url} target="_blank" rel="noreferrer">
                    {params.value}
                </a>
                <IconButton
                    aria-label="view summary"
                    onClick={() => setCurrentSummary(params.row)}
                    sx={{marginLeft: '0.5em'}}
                >
                    <SummarizeIcon/>
                </IconButton>
            </Box>
        )
    }
}

const augmentColumn = (colDef: GridColDef<AugmentedArticle>, setCurrentSummary: React.Dispatch<AugmentedArticle | null>): GridColDef<AugmentedArticle> => {
    switch (colDef.field) {
        case 'title':
            return augmentTitleColumn(colDef, setCurrentSummary);
        default:
            return colDef;
    }
}

const augmentArticle = (article: Article): AugmentedArticle => {
    return {
        ...article,
        date: new Date(article.date)
    }
}
