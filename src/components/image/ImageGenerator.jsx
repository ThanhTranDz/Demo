import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import axios from 'axios'
const ImageGenerator = () => {
  
  const STATUS = {
    INITIAL: null,
    LOADING: 'loading',
    LOADED: 'loaded',
  }

  const [imageUrl, setImageUrl] = useState("/");
  const [image, setImage] = useState(STATUS.INITIAL)
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  
  const imageGenerator = async() => {
    if (inputRef.current.value === ""){
      return 0;
    }

    setLoading(true)
    setImage(STATUS.LOADING)
    const options = {
      method: 'POST',
      url: 'https://api.getimg.ai/v1/stable-diffusion/text-to-image',

      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer key-CMh2LbC2eVr35PzWYyGB8EGDvvruVh86jSliV5mcbCgBwuMdPMPJ8uMofz5UymgGR2yV58d92EirqjXvkPNt0V7BnOfrCIr'
      },

      data: {
        model: 'stable-diffusion-v1-5',
        prompt: `${inputRef.current.value}`,
        negative_prompt: 'Disfigured, cartoon, blurry',
        width: 512,
        height: 512,
        steps: 25,
        guidance: 7.5,
        seed: 0,
        scheduler: 'dpmsolver++',
        output_format: 'jpeg',
        response_format: 'url'
      }
    };

    axios
    .request(options)
    .then(function (response) {
      let image_create =response.data.url
      console.log(image_create);
      setImage(STATUS.LOADED)
      setImageUrl(image_create)
      setLoading(false)
    })
    .catch(function (error) {
      console.error(error);
    });

    // let data = await response.json();
    // console.log(data)
    // let data_array = data.data
    // setImageUrl(data_array[0].url);
    // setLoading(false)
    

  }
  return (
    <div>
        {/* <div className="ai-image-generator">
            <div className="header">AI image <span>Generator</span></div>
            <div className="img-loading">
            
                <div className="image"><img src={imageUrl==="/"?default_image:imageUrl} alt="" /></div>
                <div className="loading">
                  <div className= {loading?"loading-bar-full":"loading-bar"}></div>
                  <div className= {loading?"loading-text":"display-none"}>Loading...</div>
                </div>
            </div>

            <div className="search-box">
              <input type="text" ref={inputRef} className="search-input" placeholder='Describle' />
              <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
            </div>
        </div> */}

      <div className="ai-image-generator">


        <div className="container">
          <div className="title">AI Image Generator</div>
          <div className="footer">Describe your image</div>
          <div className="input-container">
              <input type="text" ref={inputRef} placeholder="E.g. chocolate croissant on a plate in a bakery"/>
          </div>

          {image === STATUS.LOADING ? (
            <div className='center'>
              <div className='loader'></div>
            </div>
            
          ) :image === STATUS.LOADED ? (
            <div className='image_generate'><img src={imageUrl==="/"?null:imageUrl} alt="" /></div>
          ) :(
            <div/>
          )}

          <button className="button upgrade-button" onClick={() => {imageGenerator()}}>Quickly generate one image</button>
          <button className="button customize-button">
            <span>Customize and generate more images</span>
            <span ></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator
