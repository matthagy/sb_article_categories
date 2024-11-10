import React, {useMemo, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {articles, categories} from "./articles";
import {columns} from "./constants";
import {Box, Tab, Tabs, Typography} from '@mui/material';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article, AugmentedArticle} from "@/app/ArticlesTable/types";
import {CategoryCountTable} from "@/app/ArticlesTable/CategoryCountTable";
import About from "@/app/ArticlesTable/About";

export const ArticlesTable: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const augmentedColumns = useMemo(() => columns.map(augmentColumn), []);
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
        </Box>
    )
}

const augmentTitleColumn = (colDef: GridColDef<AugmentedArticle>): GridColDef<AugmentedArticle> => {
    return {
        ...colDef,
        renderCell: (params) => (
            <a href={params.row.canonical_url} target="_blank" rel="noreferrer">
                {params.value}
            </a>
        )
    }
}

const augmentColumn = (colDef: GridColDef<AugmentedArticle>): GridColDef<AugmentedArticle> => {
    switch (colDef.field) {
        case 'title':
            return augmentTitleColumn(colDef);
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
