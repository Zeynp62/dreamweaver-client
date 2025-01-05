import { useEffect, useState } from "react"
import axios from "axios"

const Quotes = ({user}) =>{
  if (!user) {
    return <h1>Loading...</h1>;
  }
  
  const QUOTE_API = "https://zenquotes.io/api/random/[key]?option1=value&option2=value"

  const [quote,setQuote] = useState('')
  const [author,setAuthor] = useState('')

  useEffect(()=>{
    const fetchQuote = async () => {
      try {
        const response = await axios.get(QUOTE_API)

        setQuote(response.data[0]?.q)
        setAuthor(response.data[0]?.a)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuote()
  },[])

    return(

    <div className="motivation">
      <blockquote className="quote" style={{fontSize:"2em", textAlign:"center"}}><i><b>"{quote}"</b></i>
        <br /><br />
        <footer className="author"><b>{author}</b></footer>
      </blockquote>
    </div>
  )
}
export default Quotes