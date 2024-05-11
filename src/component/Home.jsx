// components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import classNames from 'classnames';
import NightAndDay from '../component/nightday/NightDayToggle'
import commenticon from '/comment.png'
import likeicon from '/like.png'
import nopost from '/nopost.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Card, message, Spin } from 'antd';
import { setPosts } from '../store/postSlice';
import { selectUser } from '../store/userSlice';
import Marquee from 'react-fast-marquee';
import {  useNavigate } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const datapost = [
  {
    Username: "User Name",
    Userheader: `User Headline   `,
    usering:"https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=2048x2048&w=is&k=20&c=4kYlrBEQrLWS--wVUBYiNnMCX6psXAFLuTnARiJotiM=",
    userpostimg:"https://media.istockphoto.com/id/1501243033/photo/chatbot-or-assistant-robot-chat-with-speech-bubble.jpg?s=2048x2048&w=is&k=20&c=Z-9vOZFkrbQRvemzBn4-AkKJCD5i0MubuRfrTSZjZ38=",
    Domain: "Domain",
    Content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                praesentium molestiae qui ullam at sequi, est expedita vel explicabo
                magni quasi.`,
  },
  
];
const { Meta } = Card;

// const backgroundColor = getComputedStyle(body).backgroundColor;


const Home = () => {
  const body = document.body;




  const [pageNumber, setPageNumber] = useState(0);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showNext, setShowNext] = useState(true);
const [Darkmode, setDarkMode] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPrevious, setShowPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const posts = useSelector((state) => state.posts.posts);
  const allPosts = useSelector((state) => state.posts.allPosts);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${BASE_URL}/api/v1/auth/home`, {
          params: {
            pageNumber,
          },
        });

        dispatch(setPosts(response.data));

        // Show "Previous" button if we are not on the first page
        setShowPrevious(pageNumber > 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        // Ensure loading is set to false after the data is received
        setLoading(false);
      }
    };

    // Fetch data
    fetchData();
  }, [dispatch, pageNumber, BASE_URL,NightAndDay]);
  const showCommentModal = (post) => {
    setSelectedPost(post);
    setCommentModalVisible(true);
  };

  const handleLike = async (postId) => {
    try {
      if (!user) {
        // User not logged in, navigate to login page
        // You can replace '/login' with the actual login page route
        return navigate('/login');
      }


      const response = await axios.post(`${BASE_URL}/api/v1/posts/like/${postId}`);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.error("Error liking post:", error);
      message.error("Error liking post");
    }
  };

  const handleComment = async () => {
    try {
      if (!user) {
        // User not logged in, navigate to login page
        // You can replace '/login' with the actual login page route
        return navigate('/login');
      }

      const response = await axios.post(
        `${BASE_URL}/api/v1/posts/comment/${selectedPost._id}`,
        { text: comment, userId: user.userId }
      );

      // Update the posts data in the state
      const updatedPosts = posts.map((post) =>
        post._id === selectedPost._id ? response.data : post
      );
      dispatch(setPosts(updatedPosts));

      // Close the comment modal
      setCommentModalVisible(false);
      setComment(""); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Error adding comment");
    }
  };

  const handleDarkMode = ()=>{
    if ( !Darkmode) {
      setDarkMode(true);
    
    } else {
      setDarkMode(false);
 
      
    }

    console.log(Darkmode);
  };

  const [paginationList, setPaginationList] = useState([]);

  return <>
  


<div className='container overflow-x-hidden'>
<div className="flex justify-start"  onClick = {handleDarkMode}>
  <NightAndDay/>
</div>


</div>
    
    <div className="container mx-auto overflow-x-hidden ">

      

{loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <Spin size="large" />
        </div>
      )}




      <h1 style={{ wordWrap: "break-word" }}>
      Welcome to the SUBSPACE Forum! Engage in thoughtful discussions and ensure your contributions are relevant and organized within our community. </h1>

      <Marquee>
        <div className={` mt-1 md:mt-4 xl:mt-6 text-transparent bg-gradient-to-tr  ${Darkmode ? 'from-red-400 to-blue-400 bg-clip-text' : 'from-red-900 to-blue-900 bg-clip-text'}`}>
        Subspace is the first layer-one blockchain that is resolving the blockchain trilemma.
        </div>
      </Marquee>


    
          {datapost.length === 0 ? (
        <div>
          <img
            src={nopost}
            alt=""
            className="object-contain h-60 xl:h-96 w-full  sm:px-10 md:px-20"
          />
          <div style={{ WebkitTextFillColor: "#4F51C0" }}>
            <p className="font-semibold text-xl xl:text-3xl text-center sm:mt-6 md:mt-8 xl:mt-12 ">
              No Posts Yet
            </p>
          </div>
        </div>
        
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 md:mt-8 xl:mt-16'>

        
        
      {  posts?.map((post) => (
        
            
              <Card
       
              key={post._id}
              hoverable
  
              style={{ width: "100%", margin: "auto", height:"min-content" ,
            
              
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0.1) 90%)",}}
                
                 
                className={Darkmode ? 'mb-4 flex h-42  flex-col md:flex-row text-white' : 'mb-4  flex   h-42 flex-col md:flex-row'}

                
              
                  
            
            >
      
              <div className='container' key={post.author}>

              <div className={classNames("pt-4 text-inherit", {"text-black" : !Darkmode }, {"text-white" : Darkmode })}>
        </div>       
      

{post?.pictures.length > 0 ? (
              <div className="container mx-auto md:w-80 md:border-r-2 ">
                <img
                  className="object-cover h-48 w-full rounded-md"
                  key={post.pictures[0].public_id}
                  src={post.pictures[0].image}
                  alt="Post Image"
                />
              </div>

            ) : (
              <div className="md:w-80 md:border-r-2">
                <img
                         className="object-cover h-48 w-full rounded-md"
                   src="/no-image.jpeg"
                  alt="Placeholder Image"
                />
              </div>
            )
            
            
            }
            
                   

                  <div className="mt-2">
                    <div className="mt-4 flex  items-center gap-2  text-xs ">
                      <div className="inline-flex shrink-0 items-center gap-3 ">
                        <a href="" className="flex-none object-cover ">
                          <img
                            src={datapost.usering}
                            className="h-14 w-14  rounded-full"
                            alt=""
                          />
                        </a>

                        <div className="mt-1.5 sm:mt-0 grid grid-cols-2">
                          <p className=" text-lg font-semibold leading-normal ">
                          {post.author}
                          </p>

                          <p className="font-normal text-base leading-none -mt-4">
                          {datapost.Userheader}
                          </p>
                        </div>
                        {/* <div className=" flex flex-row-reverse p-1 pr-5 font-light text-lg  self-start flex-none w-[130px] lg:w-[190px]">
                          <p>{datapost.Domain}</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <dl
                    className="mt-3 flex items-center 
      overflow-hidden  "
                  >
                    {/* <div className="   text-base font-light px-2 text-left "> */}
                    <div className="md:flex-1 ">
              <Meta
              
                title={
                  <h4
                    style={{ wordWrap: "break-word" }}
                    className={`content font-bold text-2xl h-auto m-0 my-1 ${Darkmode ? 'text-white' : 'text-black'}`}
                  >
                    {post.title.substring(0, 20) +
                      (post.content.length > 20 ? "..." : "")}
                  </h4>
                }
                description={
                  <p  className={`break-words content-home h-20 text-base font-light px-1 text-left ${Darkmode ? 'text-white' : 'text-black'}`}>
                    {post.content.substring(0, 100) +
                      (post.content.length > 100 ? "..." : "")}
                  </p>
                }
              />
              

                    </div>
                  </dl>
                  <div className="mt-4 flex justify-between items-center">
                  <Link to={`/post/${post._id}`}>Read more</Link>
                <div className='grid grid-flow-col gap-x-2 justify-center'>
                
                  <Button onClick={() => showCommentModal(post)}>
                    <div className='flex '>
                    <img height={20} src={commenticon} alt="" className='pr-2 ' />
                    <span >  Comment</span>
                    </div>
                  
                  
                  
                  </Button>
                  <Button onClick={() => handleLike(post._id)}> 
                  <div className='flex '>
                    <img height={20} src={likeicon} alt="" className='pr-2 ' />
                    <span >  Like</span>
                    <span className='ml-2'>{likeCount}</span>
                    </div>
                  </Button>
                  
                </div>
              </div>
              </div>
              </Card>
           ))}
           </div>
          
            )}
               



      <Modal
        title="Add Comment"
        open={commentModalVisible}
        onOk={handleComment}
        onCancel={() => setCommentModalVisible(false)}
      >
        <Input
          placeholder="Type your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal>

      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 items-center justify-center p-3 w-full bg-red-50 rounded-md shadow-md hover:scale-105"
        style={{ maxWidth: "600px" }}
      >
        {showPrevious && (
          <Button onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
        )}

<Button onClick={() => setPageNumber(pageNumber + 1)} disabled={!showNext}>
  Next
</Button>

      </div>
    </div>
    </>

};

export default Home;