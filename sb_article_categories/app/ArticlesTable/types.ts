export interface Article {
    id: number
    title: string
    subtitle: string
    date: string
    audience: string
    canonical_url: string
    authors: string
    word_count: number
    comment_count: number
    likes: number
    category: string
    summary: string
}

export interface AugmentedArticle extends Omit<Article, 'date'> {
    date: Date
}


export interface Category {
    label: number,
    name: string,
    key_words: string[],
    key_points: string[],
    summary: string
}

export interface CategoryCount extends Category {
    articles: number
}
