export default function SortAndOrder({setSortBy, setOrderBy, sortBy, orderBy}){

//need to make buttons to do the sorting functionality - change state by drop-down//
const handleSortBy = (e) => {
   setSortBy(e.target.value)
}

const handleOrderBy = (e) => {
    setOrderBy(e.target.value)
}


const sortByOptions = [
    { label: 'Date', value: "created_at" },   
    { label: 'Comment Count', value: "comment_count" },
    { label: 'Votes', value: "votes" },
  ]

const orderByOptions = [
   { label: 'Ascending', value: "asc" },   
   { label: 'Descending', value: "desc"},
]

const sortByList = sortByOptions.map(option=>
    <option key = {option.value} value = {option.value} >{option.label}</option>
)

const orderByList = orderByOptions.map(option=>
    <option key = {option.value} value = {option.value} >{option.label}</option> 
)

return (

<section id="dropdowns">
<label>sort by: &nbsp;
    <select onChange={handleSortBy} value ={sortBy}>
    {sortByList}
    </select>
</label>
<label> order: &nbsp;
    <select  onChange={handleOrderBy} value ={orderBy}>
    {orderByList}
    </select>
</label>
</section>

)

}