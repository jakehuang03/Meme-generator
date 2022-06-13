import React from 'react'

const Meme = () => {
    const [meme, setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg"
        
        })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    const getMemeImg = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(previousMeme => {
            return (
                {
                ...previousMeme,
                randomImage: allMemes[randomNumber].url
                }
            )
        })
    }
    const handleChange = (event) => {
        const {name, value} = event.target
        setMeme(previousMeme => {
            return (
                {
                    ...previousMeme,
                    [name]: value
                }
            )
        })
    }
    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form--input"
                    placeholder="Top text"
                    value={meme.topText}
                    name="topText"
                    onChange={handleChange}
                />
                
                <input 
                    type="text" 
                    className="form--input"
                    placeholder="Bottom text"
                    vlaue={meme.bottomText}
                    name="bottomText"
                    onChange={handleChange}
                />
                <button onClick={getMemeImg} className="form--button">
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme