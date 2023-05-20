import axios from 'axios';
import { useEffect, useState } from "react";
import '../css/youtubeVideo.css'

function NewsItem({ url, headline, imageUrl }) {
    return (
        <div className="news-item">
            <a href={url}>
                <img src={imageUrl} alt="no" />
                <p>{headline}</p>
            </a>
        </div>
    );
}
function Iframe({ videoId }) {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
function YouTubeVideo() {
    const [videos,setVideos] = useState([]);
    const [articles, setArticles] = useState([]);
    async function fetchArticles() {
        const responseScience = await axios.get('https://www.reddit.com/r/EverythingScience/top.json?limit=10');
        const posts = responseScience.data.data.children;
        const articles = posts.map(post => ({ url: post.data.url, title: post.data.title, img: post.data.thumbnail }));
        setArticles(articles);
    }
    async function fetchVideos() {
        const check = sessionStorage.getItem('videos')
        if (check) {
            setVideos(JSON.parse(check));
        }
        else {
            const response = await axios.get('https://www.reddit.com/r/videos/top.json?limit=10');
            const posts = response.data.data.children;
            const videos = posts.map(post => ({ url: post.data.url, title: post.data.title }));
            sessionStorage.setItem('videos', JSON.stringify(videos))
            setVideos(videos);
        }
    }
    useEffect(() => {  
        fetchVideos();
    },[])
    useEffect(() => {
        fetchArticles();
    },[])
    const videoIds = videos.map(video => {
        const splitByV = video.url.split('v=');
        if (splitByV.length === 1) {
            return video.url.split('be/')[1];
        } else {
            return splitByV[1];
        }
    });
    return (
        <div className="youtube-video-container">
            {/* {videoIds.splice(0,2).map((videoId, index) => {
                return <Iframe key={ index } videoId={ videoId }/>
            })} */}
            {articles.splice(0,4).map((articles, index) => {
                return <NewsItem key={index} url={articles.url} headline={articles.title} imageUrl={articles.img} />

            })}
        </div>
    );
}
export default YouTubeVideo;