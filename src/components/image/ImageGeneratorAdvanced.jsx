import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setShowMoreOptions } from '../redux/actions';
import './ImageGeneratorAdvanced.css'
import axios from 'axios'
import Model from '../model/Model'
import { toggleShowMoreOptions } from '../redux/optionsSlice';
import StepSlider from '../slider/StepSlider';
import ScaleSlider from '../slider/ScaleSlider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SamplerMenu from '../menu/SamplerMenu';


const ImageGeneratorAdvanced = () => {

    const dispatch = useDispatch();
    const showMoreOptions = useSelector((state) => state.options.showMoreOptions);
    const selectedModel = useSelector((state) => state.options.selectedModel); // Lấy mô hình được chọn từ Redux store
    const stepValue = useSelector((state) => state.options.stepValue)
    const scaleValue = useSelector((state) => state.options.setScale)
    const sampler = useSelector((state) => state.options.setSampler)


    console.log("FIrrst", showMoreOptions)
    console.log("value", stepValue)
    console.log("scale", scaleValue)
    console.log("sampler", sampler)
    console.log(selectedModel, "ssssssssssssssssss")

    const [model, setModel] = useState('juggernaut-xl-v10')
    const [randomSeed, setRandomSeed] = useState(0)
    const [ratio, setRatio] = useState([1024, 1024])
    const [imageUrl, setImageUrl] = useState('/');
    const [imageNumber, setImageNumber] = useState(1)


    // useEffect(() => {
    //     if (selectedModel) {
    //         setModel(selectedModel.title); // Cập nhật mô hình khi selectedModel thay đổi
    //         console.log("Mô hình hiện tại", model)
    //     }
    // }, [selectedModel]);

    const handleModelChange = (event) => {
        if (event.target.value === 'more-option') {
            dispatch(toggleShowMoreOptions(true));
        } else {
            setModel(event.target.value);
            dispatch(setShowMoreOptions(false));

        }
        console.log('Selected model:', event.target.value);
    };

    const handleChangeRatio = (event) => {
        setRatio(event.target.value);
        console.log("ratio", ratio)
    };

    const handleImageNumber = (num) => {
        setImageNumber(num)
    }

    let inputRef = useRef(null);
    let inputNegative = useRef('')
    let inputSeed = useRef(1)

    const generateRandomNumber = () => {
        const max = Math.pow(10, 10);
        const seed = inputSeed.current.value;
        console.log("seed", seed)
        let newRandomNumber = Math.floor(Math.random() * max);
        inputSeed.current.value = newRandomNumber;
        // if (seed) {
        //     console.log(1)
        //     newRandomNumber = parseInt(seed, 10);
        // } else {
        //      // Cập nhật giá trị của input
        // }

        setRandomSeed(newRandomNumber);
        console.log('Random number:', inputSeed.current.value);
    };

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }

        const options = {
            method: 'POST',
            url: 'https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer key-4iVTZj9JxaOyAOssQZ4HSAQdI2mHv9WfhCLaMJsRQBKbu5ChURKmo084LWrSmEjcWmWFqNm5aXhoVGM7g38rG7f7ajk30DZb'
            },
            data: {
                model: selectedModel ? selectedModel : model,
                prompt: `${inputRef.current.value}`,
                negative_prompt: `${inputNegative.current.value}`,
                width: ratio[0],
                height: ratio[1],
                steps: stepValue,
                guidance: scaleValue,
                scheduler: 'euler',
                response_format: 'url',
                seed: `${inputSeed.current.value}`
            }
        };
        console.log(options)
        axios
            .request(options)
            .then(function (response) {
                let image_create = response.data.url
                console.log(response.data);
                setImageUrl(image_create);
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    return (
        <div className="main">
            <div className={showMoreOptions ? 'body blurred' : 'body'}>
                <div className="header"></div>

                <div className="body flex">
                    <div className="prompt">
                        <div className="selection flex gap_18">
                            <div>Essential</div>
                            <div>Advanced</div>
                        </div>

                        <div className="model">
                            <p>Model</p>
                            <select className='model-selection' value={model} onChange={handleModelChange}>
                                <option value="juggernaut-xl-v10">JuggernautXL X <span>Photorealism</span> </option>
                                <option value="realvis-xl-v4">RealVisXL <span>Photorealism</span> </option>
                                <option value="animagine-xl-v-3-1">Animagine XL <span>Anime</span></option>
                                <option value="dream-shaper-v8">DreamShaper <span>Artistic</span></option>
                                <option value="more-option">More option</option>
                            </select>
                        </div>

                        <div className="input_prompt">
                            <p>Prompt</p>
                            <input type="text" ref={inputRef} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="negative_prompt">
                            <p>Negative Prompt</p>
                            <input type="text" ref={inputNegative} placeholder="Describle your image. Get creative..." />
                        </div>

                        <div className="select-ratio">

                            <p>Aspect ratio</p>
                            <select className="aspect-ratio" value={ratio} onChange={handleChangeRatio}>
                                <option value={[1024, 1024]} >1:1 <span>1024px x 1024px</span></option>
                                <option value={[768, 960]}>4:5 <span>768px x 960px</span></option>
                                <option value={[768, 1152]}>2:3 <span>768px x 1152px</span></option>
                                <option value={[720, 1280]}>9:16 <span>720px x 1280px</span></option>
                                <option value={[960, 784]}>5:4 <span>960px x 784px</span></option>
                                <option value={[1152, 768]}>3:2 <span>1152px x 768px</span></option>
                                <option value={[1280, 720]}>16:9 <span>1280px x 720px</span></option>

                            </select>

                        </div>

                        <div className="number-image">

                            <p>Number of images</p>
                            <div className="number flex">

                                <div className="box" onClick={() => { handleImageNumber(1) }}>1</div>
                                <div className="box" onClick={() => { handleImageNumber(2) }}>2</div>
                                <div className="box" onClick={() => { handleImageNumber(4) }}>4</div>
                                <div className="box">6</div>
                                <div className="box">8</div>
                                <div className="box">10</div>

                            </div>
                        </div>

                        <div className="steps">
                            <StepSlider />
                        </div>

                        <div className="scale">
                            <ScaleSlider />
                        </div>

                        <div className="seed">
                            <p>Seed</p>
                            <div className="flex ">
                                <input type="text" ref={inputSeed} placeholder="Leave blank to use a random number" />
                                <ShuffleIcon onClick={generateRandomNumber} />
                            </div>
                        </div>

                        <div className="Sampler">
                            <p>Sampler</p>
                            <SamplerMenu />

                        </div>

                        <div className="generate">
                            <div className="credit"> credits</div>

                            <div className="create-button" onClick={() => { imageGenerator() }}>
                                Create {imageNumber} images
                            </div>

                            <div className="account">

                            </div>
                        </div>
                    </div>

                    <div className="image_generate">
                        <img src={imageUrl === "/" ? null : imageUrl} alt="" />
                    </div>
                </div>
            </div>

            {showMoreOptions && (
                <div className="overlay">
                    <div className="more-option">
                        <Model />
                    </div>
                </div>
            )}

        </div>
    )
}

export default ImageGeneratorAdvanced
