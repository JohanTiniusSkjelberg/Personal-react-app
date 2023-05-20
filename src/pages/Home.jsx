import News from "../components/newsItem"
import YouTubeVideo from "../components/YouTubeVideo"
import ChatGPT from "../components/chatGpt";


function Home() {
  return (
    <div className="home">
      <YouTubeVideo/>
      <News />
      <ChatGPT />
    </div>
  )
}

export default Home;