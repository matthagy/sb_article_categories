import React, {useMemo, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useQuery} from '@tanstack/react-query';
import {columns} from "./constants";
import {Box, CircularProgress, IconButton, Modal, Tab, Tabs, Typography} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article, AugmentedArticle, Category} from "@/app/ArticlesTable/types";
import {CategoryCountTable} from "@/app/ArticlesTable/CategoryCountTable";
import About from "@/app/ArticlesTable/About";
import ReactMarkdown from 'react-markdown';

interface ArticlesJson {
    articles: Article[],
    categories: Category[]
}

const fetchArticles = async () => {
    const response = await fetch('./articles.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const json = await response.json();
    return json as ArticlesJson;
};

export const createSummary = (title: string, summary: string) => {
    const md = `# ${title}\n\n${summary}`;
    return (
        <ReactMarkdown
            components={{
                h1: ({...props }) => (
                    <h1 style={{ color: "orange"}} {...props} />
                ),
            }}
        >
            {md}
        </ReactMarkdown>
    );
};
export const ArticlesTable: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentSummary, setCurrentSummary] = useState<AugmentedArticle | null>(null);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles
    });
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleCloseModal = () => {
        setCurrentSummary(null);
    };

    const augmentedColumns = useMemo(() => columns.map((col) => augmentColumn(col, setCurrentSummary)), []);
    const augmentedArticles = useMemo(() => (data?.articles || []).map(augmentArticle), [data?.articles]);
    const categoriesCount = useMemo(() => (data?.categories || []).map((category) => ({
        ...category,
        articles: augmentedArticles.reduce((count, article) => count + (article.category === category.name ? 1 : 0), 0)
    })), [augmentedArticles, data?.categories]);

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
            {isError &&
                <Typography variant="body1" color="error">
                    Error loading articles. Please try again later.
                </Typography>}
            {selectedTab === 0 && (
                <DataGrid
                    loading={isLoading}
                    columns={augmentedColumns}
                    rows={augmentedArticles}
                    pageSizeOptions={[10, 25, 50, 100]}
                    slots={{
                        loadingOverlay: () => <CircularProgress size={60}/>,
                    }}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 25}},
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
                    {currentSummary && currentSummary.title &&
                        currentSummary.summary && createSummary(currentSummary.title, currentSummary.summary)}
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