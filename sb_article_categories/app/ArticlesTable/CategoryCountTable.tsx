import React, {useMemo} from 'react';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import VerticalAlignTopIcon from '@mui/icons-material/ArrowUpward';
import {CategoryCount} from './types';


interface CategoryTableProps {
    categories: CategoryCount[];
}

export const CategoryCountTable: React.FC<CategoryTableProps> = ({categories}) => {
    const sortedCategories = useMemo(() => [...categories].sort((a, b) => b.articles - a.articles),
        [categories]);

    const handleScroll = (e: React.MouseEvent<unknown>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <Box>
            <TableContainer sx={{marginBottom: 4}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Articles</Typography></TableCell>
                            <TableCell><Typography variant="h6">Category Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Key Words</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCategories.map((categoryCount) => (
                            <TableRow key={categoryCount.label}>
                                <TableCell>{categoryCount.articles}</TableCell>
                                <TableCell>
                                    <a href={`#${categoryId(categoryCount)}`}
                                       onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, categoryId(categoryCount))}>
                                        {categoryCount.name}
                                    </a>
                                </TableCell>
                                <TableCell>{categoryCount.key_words.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Sections for each Category */}
            {sortedCategories.map((categoryCount) => (
                <Box key={categoryCount.label} sx={{marginBottom: 4}}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5" sx={{marginBottom: 1}} id={categoryId(categoryCount)}>
                            {categoryCount.name}
                        </Typography>
                        <IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleScroll(e, 'top')} sx={{padding: 0, marginLeft: 1}}>
                            <VerticalAlignTopIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <ul>
                        {categoryCount.key_points.map((point, index) => (
                            <li key={index}>
                                <Typography variant="body1">{point}</Typography>
                            </li>
                        ))}
                    </ul>
                    <Typography variant="body1" sx={{maxWidth: '50em'}}>{categoryCount.summary}</Typography>
                </Box>
            ))}
        </Box>
    );
};

const categoryId = (category: CategoryCount): string => {
    return category.name.toLowerCase().replace(/\s+/g, '-');
}

