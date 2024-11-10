import React, {useMemo} from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {CategoryCount} from './types';


interface CategoryTableProps {
    categories: CategoryCount[];
}

export const CategoryCountTable: React.FC<CategoryTableProps> = ({categories}) => {
    const sortedCategories = useMemo(() => [...categories].sort((a, b) => b.articles - a.articles),
        [categories]);

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
                                    <a href={`#${categoryId(categoryCount)}`}>
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
                    <Typography variant="h5" sx={{marginBottom: 1}} id={categoryId(categoryCount)}>
                        {categoryCount.name}
                    </Typography>
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

