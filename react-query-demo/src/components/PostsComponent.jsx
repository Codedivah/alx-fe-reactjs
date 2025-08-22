import { useQuery } from "@tanstack/react-query"


// Define a fetch function that can be used to fetch data from an API
const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
    throw new Error("Network response was not ok")
  }
    return res.json();
};

const PostsComponent= () => {
    // Use the useQuery hook to handle data fetching and caching
    const { data, isError, error, isLoading, refetch, isFetching } = useQuery(
    ["posts"], 
    fetchPosts
    )

    // Handle loading state
    if (isLoading) return <div>Loading post...</div>;
    // Handle error state
    if (error) return <div>Error loading post {error.message}</div>;

    // Render the fetched data
    return (
        <div>
      <button 
        onClick={() => refetch()} 
        {isFetching ? "Refreshing..." : "Refetch Posts"}>
      </button>
    
   </div>
  )
}

export default PostsComponent;