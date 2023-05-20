import { Configuration, OpenAIApi } from "openai"
import { useEffect, useState } from "react"
import '../css/chatgpt.css'
import config from '../../env.json'

function ChatGPT() {
    const [response,setResponse] = useState("");
    const [answer,setAnswer] = useState("");
    async function getCompletion() {
        const quest = sessionStorage.getItem('response')
        const ans = sessionStorage.getItem('answer')
        if (quest) {
            setResponse(JSON.parse(quest))
            setAnswer(JSON.parse(ans))
        }
        else {
            const configuration = new Configuration({
                organization: config.ORG_ID,
                apiKey: config.OPEN_AI_KEY
            })
            
            const openai = new OpenAIApi(configuration)
            
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: "Give me a random middle difficulty Linear Algebra question, Question should be Q: and then answers should be written A:"}
                ]
            })
            let ai_response = completion.data.choices[0].message.content
            let question = ai_response.split("A:")[0]
            let answer1 = ai_response.split("A:")[1]
            
            console.log(ai_response,answer1);
            sessionStorage.setItem('response', JSON.stringify(question))
            sessionStorage.setItem('answer', JSON.stringify(answer1))
    
            setResponse(question);
            setAnswer(answer1)

        }
    }
    useEffect(() => {
        getCompletion();
    },[])
    function handleClick() {
        document.getElementById('answer').style.display = 'block';
    }
    return (
        <div className="chatbot">
            <h2>Chat</h2>
            <div>
                <p>{ response } </p>
                <p>Check answer: </p>
                <p id="answer">{ answer }</p>
                <button onClick={handleClick}>Here</button>
            </div>
        </div>
    )
}

export default ChatGPT;