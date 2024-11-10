import React, {useMemo} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {articles, categories} from "./articles";
import {columns} from "./constants";
import {Box, Typography} from '@mui/material';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article, AugmentedArticle} from "@/app/ArticlesTable/types";
import {CategoryCountTable} from "@/app/ArticlesTable/CategoryCountTable";


export const ArticlesTable: React.FC = () => {
    const augmentedColumns = useMemo(() => columns.map(augmentColumn), []);
    const augmentedArticles = useMemo(() => articles.map(augmentArticle), []);
    const categoriesCount = useMemo(() => categories.map((category) => ({
        ...category,
        articles: augmentedArticles.reduce((count, article) => count + (article.category === category.name ? 1 : 0), 0)
    })), [augmentedArticles]);
    return (
        <Box sx={{marginTop: '0.5em', marginLeft: '1em'}}>
            <Typography variant="h4" gutterBottom>
                AI Categorization of Slow Boring Articles
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                You can browser articles in the sortable and filterable table.
                Below that you&#39;ll find a list of article categories with a brief summary of each.
            </Typography>
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
            <Typography variant="h4" gutterBottom sx={{marginTop: '1em'}}>
                Categories
            </Typography>
            <CategoryCountTable categories={categoriesCount}/>
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
