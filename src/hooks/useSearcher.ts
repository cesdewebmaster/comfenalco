import { ChangeEvent, useRef, useState } from "react";
import getSearchResult from "../services/searcher.services";
import { SearchResult } from '../interfaces/Article.interface';

export const useSearcher = () => {
    const debounceRef = useRef<NodeJS.Timeout>();
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState<string>('');
    const [showLoader, setShowLoader] = useState<boolean>(true);

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShowLoader(true);
        setQuery(e.target.value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (e.target.value.length < 3) {
            setResults([]);
            setShowLoader(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            const newResults = await getSearchResult(e.target.value);
            setResults(newResults!);
            setShowLoader(false);
        }, 350);
    }

    return {
        onQueryChange,
        setQuery,
        results,
        query,
        showLoader
    }
}
