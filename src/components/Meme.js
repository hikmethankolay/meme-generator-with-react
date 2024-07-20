import React from "react";
import html2canvas from "html2canvas";

export default function Meme() {
    const [meme, setMeme] = React.useState(
        {
            topText : "",
            bottomText : "",
            randomImage : "http://i.imgflip.com/1bij.jpg"
        }
    )

    const [allMemesImages, setAllMemes] = React.useState({})

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(memesObject => setAllMemes(memesObject.data.memes))
    }, [])

    function getMemeImage(event){
        const randomNumber = Math.floor(Math.random() * allMemesImages.length)
        setMeme(previousMeme => {
            return {
                ...previousMeme,
                randomImage: allMemesImages[randomNumber].url
            }
        })
    }

    function handleChange(event){
        const {value, name} = event.target
        setMeme(previousMeme => {
            return {
                ...previousMeme,
                [name]: value,

            }
        })
    }

    function saveMemeAsImage() {
        const memeContainer = document.querySelector(".meme-container");
        html2canvas(memeContainer, { useCORS: true }).then(canvas => {
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }

    return(
        <div className="meme">
            <div className="input-container">
                <div className="top-text-container">
                    <label className="label" htmlFor="top-text">Top Text</label>
                    <input onChange={handleChange} id="top-text" className="input" type="text" placeholder="Shut up" value={meme.topText} name="topText"></input>
                </div>
                <div className="bottom-text-container">
                    <label className="label" htmlFor="bottom-text">Bottom Text</label>
                    <input onChange={handleChange} id="bottom-text" className="input" type="text" placeholder="And take my money" value={meme.bottomText} name="bottomText"></input>
                </div>
            </div>
            <div className="button-container">
                <button onClick={getMemeImage} className="new-image-button">Get a random meme image 🖼️</button>
                <button onClick={saveMemeAsImage} className="save-button">Save Meme as Image 💾</button>
            </div>
            <div className="meme-container">
                <img src={meme.randomImage} alt="meme" className="meme-image" ></img>
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    );
}