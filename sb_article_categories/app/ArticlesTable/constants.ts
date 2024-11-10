import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {AugmentedArticle} from "./types";


export const columns: GridColDef<AugmentedArticle>[] = [
    {
        field: 'category',
        headerName: 'Category',
        width: 450
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 350
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 125,
        type: 'date'
    },
    {
        field: 'authors',
        headerName: 'Author(s)',
        width: 150
    },
    {
        field: 'likes',
        headerName: 'Likes',
        width: 70,
        type: 'number'
    },
    {
        field: 'comment_count',
        headerName: 'Comments',
        width: 90,
        type: 'number'
    },
    {
        field: 'word_count',
        headerName: 'Words',
        width: 80,
        type: 'number'
    }
]