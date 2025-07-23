export interface Category {
    name: string,
    desc?: string,
    color: string,
    subcategories?: Subcategory[],
    sections?: Section[],
    slug?: string,
    icon: string,
    metaDataSEO?: {
        metaTitle: string,
        metaDescription: string,
        metaImage: any,
        urlCanonical: string,
        index: boolean,
        slug: string
    } | null
}

export interface Subcategory {
    name: string,
    desc: string,
    slug: string,
    sections: Section[],
    metaDataSEO?: {
        metaTitle: string,
        metaDescription: string,
        metaImage: any,
        urlCanonical: string,
        index: boolean,
        slug: string
    } | null
} 

export interface Section {
    name: string,
    url: string,
    articles?: Article[]
}

export interface Article {
    name: string,
    slug: string
}


export interface SearchResult {
    entryId: string,
    title: string,
    description: string,
    slug: string,
    category: any,
    miniatura: string
}
