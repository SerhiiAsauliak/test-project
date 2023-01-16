// import { BASE_URL } from "../config"
// import { useHttp } from "../hooks/useHttp"
// import { selectSearchValue } from "../store/filters/filterSelector"

// const filterArticles = async () => {
//   const mapWithMatches = new Map()
//   const {request} = useHttp()
//   const searchValue = useAppSelector(selectSearchValue)
//   const splitSearchValue = searchValue.split(' ')
  
//   const fetchSearchItems = async() => {
//     for (const item of splitSearchValue) {
//       let data = await request(`${BASE_URL}?search=${item}`)
//       data.map(el => {
//         if(!mapWithMatches.has(el.id)) {
//           mapWithMatches.set(el.id, {content: el, matches: 1})
//         } else {
//           mapWithMatches.get(el.id).matches++
//         }
//         return mapWithMatches
//       })

//     console.log(data)
//     }
//     return mapWithMatches 
//   }

//   // const matchData = await fetchSearchItems()
// }

// nasa Starlink effects
// nasa talks Mars Warming 