import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    id: uuidv4() // Generate a unique ID for the meme
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [createdMemes, setCreatedMemes] = React.useState([]);

  // Fetch memes from the API
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  // Update meme image with a random image from the API
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  // Handle input changes for top and bottom text
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  }

  // Save the created meme to the list of created memes
  function addCreatedMeme() {
    setCreatedMemes(prevMemes => [...prevMemes, meme]);
    setMeme({
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      id: uuidv4() // Generate a unique ID for the new meme
    });
  }

  // Delete a meme from the list of created memes
  function deleteMeme(id) {
    setCreatedMemes(prevMemes => prevMemes.filter(meme => meme.id !== id));
  }

  // Edit a meme from the list of created memes
  function editMeme(id) {
    const memeToEdit = createdMemes.find(meme => meme.id === id);
    if (memeToEdit) {
      setMeme({
        topText: memeToEdit.topText,
        bottomText: memeToEdit.bottomText,
        randomImage: memeToEdit.randomImage,
        id: memeToEdit.id
      });
      deleteMeme(id);
    }
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="form--button" onClick={addCreatedMeme}>
          Add meme to list
        </button>
      </div>
      <div className="meme">
  <img src={meme.randomImage} className="meme--image" />
  <h2 className="meme--text top">{meme.topText}</h2>
  <h2 className="meme--text bottom">{meme.bottomText}</h2>
</div>
<div className="created">
  <h2 className="created--title">Created Memes</h2>
  {createdMemes.map(meme => (
    <div key={meme.id} className="created--meme">
      <img src={meme.randomImage} className="created--meme--image" />
      <h3 className="created--meme--text top">{meme.topText}</h3>
      <h3 className="created--meme--text bottom">{meme.bottomText}</h3>
      <div className="created--meme--actions">
        <button onClick={() => deleteMeme(meme.id)}>Delete</button>
        <button onClick={() => setMeme(meme)}>Edit</button>
      </div>
    </div>
  ))}
</div>
<div className="form">
  <input
    type="text"
    placeholder="Top text"
    className="form--input"
    name="topText"
    value={meme.topText}
    onChange={handleChange}
  />
  <input
    type="text"
    placeholder="Bottom text"
    className="form--input"
    name="bottomText"
    value={meme.bottomText}
    onChange={handleChange}
  />
  <button className="form--button" onClick={getMemeImage}>
    Get a new meme image 🖼
  </button>
  <button className="form--button" onClick={addCreatedMeme}>
    {meme.id ? "Save edited meme" : "Add meme to list"}
  </button>
</div>

</main>

);
}
