import { useState, useEffect } from 'react'

const Main = () => {
    const [data, setData] = useState([])
    const [memes, setMemes] = useState({
        topText: '',
        bottomText: '',
        memeImage: 'https://i.imgflip.com/3pnmg.jpg'
    })
    const url = 'https://api.imgflip.com/get_memes'

    useEffect (() => {
        const loadMemes = async() => {
            try {
                const res = await fetch(url)
                const dataList = await res.json()
                setData (dataList.data.memes)

            } catch (error) {
                console.error(error)
            }
        }

        loadMemes()
    }, [url])

    const handleUpdateText = (e) => {
        const {name, value} = e.target
        return(
            setMemes(preMeme => ({
            ...preMeme,
            [name]: value
            }))
        )
    }

    const randomMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * data.length)
        setMemes(preMeme => ({
            ...preMeme,
            memeImage: data[randomNumber].url
        }))
    }
    

    return ( 
        <div className='main'>
            <div className='form'>
                <input
                    className='input'
                    type='text'
                    placeholder='Top Text'
                    name='topText'
                    value={memes.topText}
                    onChange={handleUpdateText}
                />
                <input
                    className='input'
                    type='text'
                    placeholder='Bottom Text'
                    name='bottomText'
                    value={memes.bottomText}
                    onChange={handleUpdateText}
                />
                <button className='image--button' onClick={randomMemeImage}>Random Meme</button>
            </div>
            <div className='image--meme--container'>
                <h2 className='text top--text'>{memes.topText}</h2>
                <h2 className='text bottom--text'>{memes.bottomText}</h2>
                <img className='img--meme' src={memes.memeImage} alt='meme' />
            </div>
        </div>
    );
}
 
export default Main;