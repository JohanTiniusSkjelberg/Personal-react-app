import { useEffect, useState } from 'react';
import '../css/newsItem.css'
import axios from 'axios';
import config from '../../env.json'

function NewsItem({ url, headline, imageUrl }) {
    return (
        <div className="news-item">
            <a href={ url }>
                <img src={imageUrl} alt={headline} />
                <p>{headline}</p>
            </a>
        </div>
    );
}
function News() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchScienceArticles()
    },[])

    async function fetchScienceArticles() {
        const check = sessionStorage.getItem('articles')

        if (check) {
            setArticles(JSON.parse(check));
        }
        else{
            const section = 'home'
            const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
                params: {
                    'api-key': config.NY_AI_KEY
                }
            });
            sessionStorage.setItem('articles',JSON.stringify(response.data.results))
            setArticles(response.data.results)
        }
    }
    let newsData = articles.map(article => {
        return {
            url: article.url,
            headline: article.title,
            imageUrl: article.multimedia[1].url
        }
    })
    newsData = newsData.splice(0,8)
    return (
        <div>
            <h1>News</h1>
        <div className="news">
            {newsData.map((news, index) => (
                <NewsItem key={index} url={news.url} headline={news.headline} imageUrl={news.imageUrl} />
            ))}
        </div>
        </div>
    );
}

export default News;