import React from 'react';
import {Box, List, ListItem, Typography} from '@mui/material';

const About: React.FC = () => {
    return (
        <Box sx={{margin: '1em', maxWidth: '50em'}}>
            <Typography variant="body1">
                Fan-created organization of <a href="https://www.slowboring.com/">Slow Boring</a> articles using OpenAI tech. Notably:
            </Typography>

            <List sx={{listStyleType: 'disc', pl: 3}}>
                <ListItem sx={{display: 'list-item'}}>
                    Uses semantic vectors to quantify the similarity of different articles
                </ListItem>
                <ListItem sx={{display: 'list-item'}}>
                    Uses ChatGPT-4o API to summarize similar articles from the same category
                </ListItem>
            </List>
            <Typography variant="body1">
                Very much a work-in-progress.
                You can contribute, or just create your own UI variant, by forking the
                GitHub repository at &nbsp;
                <a href="https://github.com/matthagy/sb_article_categories">
                    github.com/matthagy/sb_article_categories
                </a>
                .
                Even if you&#39;ve never done any programming, you&#39;d likely be quite surprised at
                how easily an AI assistant like ChatGPT (or Anthropic Claude) can guide you through
                substantial changes by just changing a few lines.
            </Typography>
            <Typography variant="h5" sx={{marginTop: '1em'}}>
                User Guide
            </Typography>
            <List sx={{listStyleType: 'disc', pl: 3}}>
                <ListItem sx={{display: 'list-item'}}>
                    Articles table supports sorting and filtering
                </ListItem>
            </List>
            <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/II5UQwxYvmk?autoplay=1&loop=1&playlist=II5UQwxYvmk&si=VzKIUHaY4uvbeNZ4"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </Box>
    );
};

export default About;
