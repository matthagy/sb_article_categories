import React, {useMemo} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {articles} from "./articles";
import {columns} from "./constants";
import {Box, Typography} from '@mui/material';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article} from "@/app/ArticlesTable/types";


export const ArticlesTable: React.FC = () => {
    const augmentedColumns = useMemo(() => columns.map(augmentColumn), []);
    return (
        <Box sx={{marginTop: '0.5em', marginLeft: '1em'}}>
            <Typography variant="h4" gutterBottom>
                AI Categorization of Slow Boring Articles
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                You can browser articles in the sortable, filterable, and searchable table.
                Below that you&#39;ll find a list of article categories with a brief summary of each.
            </Typography>
            <DataGrid
                columns={augmentedColumns}
                rows={articles}
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
        </Box>
    )
}

const augmentTitleColumn = (colDef: GridColDef<Article>): GridColDef<Article> => {
    return {
        ...colDef,
        renderCell: (params) => (
            <a href={params.row.canonical_url} target="_blank" rel="noreferrer">
                {params.value}
            </a>
        )
    }
}

const augmentColumn = (colDef: GridColDef<Article>): GridColDef<Article> => {
    switch (colDef.field) {
        case 'title':
            return augmentTitleColumn(colDef);
        default:
            return colDef;
    }
}