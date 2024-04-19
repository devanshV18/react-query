// import React from 'react'
import {useQuery, useMutation, QueryClient, useQueryClient} from '@tanstack/react-query'
import { addPost, fetchPosts, fetchTags } from '../api/api'


const PostList = () => {

   

    const {data:postData,isError,isLoading,error} = useQuery({
        queryKey:["posts"],
        queryFn: fetchPosts 
    })

    const{data:tagsData} = useQuery({
      queryKey: ["tags"],
      queryFn: fetchTags
    })

   const queryClient = useQueryClient()

    const {mutate,isError:isPostError,isPending,error:postError,reset} = useMutation({
      mutationFn: addPost,
      onMutate: () => {
        return{id:1}
      },
      onSuccess: (data,variables,context) =>{
        queryClient.invalidateQueries({
          queryKey: ["posts"]
        })
      }

    })

    const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const title = formData.get("title")
      const tags = Array.from(formData.keys()).filter((key) => formData.get(key)==="on")

      if(!title || !tags) return

      mutate({id:postData.lenght+1,title,tags})

      //form reset
      e.target.reset()
    }


  return (
    <div className='container'>

        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder='Enter your post'
          className='postbox'
          name='title'
          />

          <div className="tags">
            {tagsData?.map((tag) => {
              return(
                <div key={tag}>
                  <input name={tag} id={tag} type='checkbox' />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              )
            })}
          </div>
            <button>Post</button>
        </form>





      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}

        {postData?.map((post) => {
            return(
                <div key={post.id} className='post'>
                    <div>{post.title}</div>
                    {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            )
        })}
      
    </div>
  )
}

export default PostList
