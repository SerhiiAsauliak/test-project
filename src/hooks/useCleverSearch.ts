import { useHttp } from './useHttp';
import { BASE_URL } from "../config";
import { setArticles } from "../store/articles/slice";
import { ArticleItem } from '../@types/articles'
import { useAppDispatch } from '../store/redux-hooks';
import { fetchArticles } from '../store/articles/asyncActions';


export function useCleverSearch() {
    const { request } = useHttp()
    const dispatch = useAppDispatch();
    const mapWithMatches = new Map()
    
    const sortFetchedArticles = async (value: string[]) => {
    
        const findMatches = (text: string, wordToSearch: string) => {
            let contain = text.includes(wordToSearch)
            return contain ? 1 : 0
        }
        if(value.length === 0) {
            dispatch(fetchArticles())
        }
        const fetchInputItems = async () => {
            for (const item of value) {
                let data = await request(`${BASE_URL}?search=${item}`)
                console.log(mapWithMatches)
    
                data.map((el: ArticleItem) => {
                    if (!mapWithMatches.has(el.id)) {
                        mapWithMatches.set(el.id, {
                            content: el, matchesTitle: findMatches(el.title.toLowerCase(), item.toLowerCase()), matchesDescription: findMatches(el.summary.toLowerCase(), item.toLowerCase())
                        })
                    } else {
                        mapWithMatches.get(el.id).matchesTitle += findMatches(el.title.toLowerCase(), item.toLowerCase())
                        mapWithMatches.get(el.id).matchesDescription += findMatches(el.summary.toLowerCase(), item.toLowerCase())
                    }
                    return mapWithMatches
                })
    
            }
            const sortedTitle = new Map([...mapWithMatches].sort((a, b) => b[1].matchesTitle - a[1].matchesTitle))
            const sortedDescription = new Map([...mapWithMatches].sort((a, b) => b[1].matchesDescription - a[1].matchesDescription))
    
            const finalArr: any[] = []
            const uniqueArticles = new Set()
    
            sortedTitle.forEach(el => {
                finalArr.push(el.content)
                uniqueArticles.add(el.id)
            })
    
            sortedDescription.forEach(el => {
                if (!uniqueArticles.has(el.id)) {
                    finalArr.push(el.content)
                }
            })
            dispatch(setArticles(finalArr))
        }
        try {
            await fetchInputItems()
        } catch (error) {
            console.log(error);
        }
    }
   
    return {sortFetchedArticles}
  }



