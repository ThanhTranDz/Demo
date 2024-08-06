import React, { useRef, useState } from 'react'
import './ImageGeneratorLogIn.css'
import axios from 'axios'
const ImageGeneratorLogIn = () => {

  const [style, setStyle] = useState(`photorealism`)
  const [ratio, setRatio] = useState(`1:1`)
  const [imageUrl, setImageUrl] = useState([]);
  const [imageNumber, setImageNumber] = useState(1)

  const handleChange = (event) => {
    setStyle(event.target.value);
    console.log('Selected value:', event.target.value);
  };

  const handleChangeRatio = (event) => {
    setRatio(event.target.value);
    console.log('Selected Ratio:', event.target.value);
  };

  const handleImageNumber = (num) => {
    setImageNumber(num)
  }

  let inputRef = useRef(null);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    // const options = {
    //   method: 'POST',
    //   url: 'https://api.getimg.ai/v1/essential-v2/text-to-image',
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     authorization: 'Bearer key-15JfRvtmAo6oP5XDCIIDFGWIev6YJW6i50Mbdy6zLXbsKwtp4YDPy2XvUOifj6VruV9nDRCZRVTdEhZ5vON29bT00IjFpru5'
    //   },
    //   data: { style: style, prompt: `${inputRef.current.value}`, aspect_ratio: ratio, response_format: 'url' }
    // };

    // console.log(options)

    // axios
    //   .request(options)
    //   .then(function (response) {
        
    //     console.log(response.data);

    //     let image_create = response.data.url
    //     setImageUrl(image_create);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    const requests = [];
    for (let i = 0; i < imageNumber; i++) {

      const options = {
        method: 'POST',
        url: 'https://api.getimg.ai/v1/essential-v2/text-to-image',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer key-4iVTZj9JxaOyAOssQZ4HSAQdI2mHv9WfhCLaMJsRQBKbu5ChURKmo084LWrSmEjcWmWFqNm5aXhoVGM7g38rG7f7ajk30DZb'
        },
        data: { style: style, prompt: `${inputRef.current.value}`, aspect_ratio: ratio, response_format: 'url' }
      };
      requests.push(axios.request(options))
      console.log(options)
    }

    try {
      const responses = await Promise.all(requests);
      const urls = responses.map(response => response.data.url);
      setImageUrl(urls)
    } catch (error){
      console.log(error)
    }

    console.log(imageUrl)

  }
  return (
    <div className="main">
      <div className="header"></div>
      <div className="body flex">

        <div className="prompt">

          <div className="selection flex gap_18">
            <p>Essential</p>
            <p>Advanced</p>
          </div>

          <div className="input_prompt">
            <input type="text" ref={inputRef} placeholder="Describle your image. Get creative..." />

            <select className="style-select" value={style} onChange={handleChange}>
              <option value="photorealism">Photorealism</option>
              <option value="artistic">Artistic</option>
              <option value="anime">Anime</option>
            </select>
          </div>


          <div className="select-ratio">

            <p>Aspect ratio</p>
            <select className="aspect-ratio" value={ratio} onChange={handleChangeRatio}>
              <option value="1:1">1:1 <span>1536px x 1536px</span></option>
              <option value="4:5">4:5 <span>1152px x 1440px</span></option>
              <option value="5:4">5:4 <span>1440px x 1152px</span></option>
              <option value="2:3">2:3 <span>1152px x 1728px</span></option>
              <option value="3:2">3:2 <span>1728px x 1152pxpx</span></option>
              <option value="4:7">9:16 <span>1080px x 1920px</span></option>
              <option value="7:4">16:9 <span>1920px x 1080px</span></option>
            </select>

          </div>

          <div className="number-image">

            <p>Number of images</p>
            <div className="number flex">

              <div className="box" onClick={() => {handleImageNumber(1)}}>1</div>
              <div className="box" onClick={() => {handleImageNumber(2)}}>2</div>
              <div className="box" onClick={() => {handleImageNumber(4)}}>4</div>
              <div className="box">6</div>
              <div className="box">8</div>
              <div className="box">10</div>

            </div>
          </div>

          <div className="upgrade">
            <div>Upgrade <span>to create up to 10 images stimultaneously</span></div>
          </div>

          <div className="generate">
            <div className="credit">{imageNumber} credits</div>

            <div className="create-button" onClick={() => { imageGenerator() }}>
              Create {imageNumber} images
            </div>

            <div className="account">

            </div>
          </div>
        </div>

        <div className="image_generate">
          {imageUrl.map((url, index) => (
              <img key = {index} src= {url} alt="" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageGeneratorLogIn
