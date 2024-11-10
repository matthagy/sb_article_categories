import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Article} from "./types";


export const columns: GridColDef<Article>[] = [
    {
        field: 'category',
        headerName: 'Category',
        width: 200
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 350
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 125
    },
    {
        field: 'authors',
        headerName: 'Authors',
        width: 150
    },
    {
        field: 'likes',
        headerName: 'Likes',
        width: 70
    },
    {
        field: 'comment_count',
        headerName: 'Comments',
        width: 90
    },
    {
        field: 'word_count',
        headerName: 'Words',
        width: 80
    }
]