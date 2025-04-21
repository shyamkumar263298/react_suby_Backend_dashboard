import React,{useState} from 'react'
import { API_PATH } from '../../data/ApiPath';

const AddFirm = () => {

    const[firmName, setFirmName]=useState('');
    const[area, setArea]=useState('');
    const[category,setCategory]=useState([]);
    const[region,setRegion]=useState([]);
    const[offer,setOffer] = useState('');
    const[file,setFile]=useState(null);

    const handleCategoryChange = (event) =>{
        const value = event.target.value;
        if(category.includes(value)){
            setCategory(category.filter((item) =>item !== value));
        }else{
            setCategory([...category, value])
        }
    }

    
    const handleRegionChange = (event) =>{
        const value = event.target.value;
        if(category.includes(value)){
            setRegion(region.filter((item) =>item !== value));
        }else{
            setRegion([...region, value])
        }
    }

    const handleImageUpload = (event) =>{
        const selectedImage = event.target.files[0];
        setFile(selectedImage)
    }

    const handleFirmSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('loginToken');
            if(!loginToken){
                console.error("User not authenticated");
            }
            const formData = new FormData();
            formData.append('firmName',firmName);
            formData.append('area',area);
            formData.append('offer',offer);
            category.forEach((value)=>{
                formData.append('category',value)
            });
            region.forEach((value) =>{
                formData.append('region',value)
            });
            formData.append("image", file);
            console.log("form data : ",JSON.stringify(formData))
            const response = await fetch(`${API_PATH}firm/add-firm`,{
                method:'POST',
                headers:{
                    'token':loginToken
                },
                body:formData
            });
            const data = await response.json();
            if(response.ok){
                console.log(data);
                setFirmName('');
                setArea('');
                setCategory([]);
                setOffer('');
                setRegion([]);
                setFile(null);
                alert("firm added successfully")
            }else if(data.message === "Vendor can have only one firm"){
                alert("Firm exists. only 1 frim can be added.")
            } else {
                alert("Failed to add firm")
            }
            console.log(data.firmId);
            const firmId = data.firmId;
            localStorage.setItem('firmId', firmId);
        } catch (error) {
            console.error("Failed add firm : ",JSON.stringify(error));
            
        }
    }

    return (
        <div className="firmSection">
            <form className='tableForm' onSubmit={handleFirmSubmit}>
                <h2>Add Firm</h2>
                <label >Firm Name</label>
                <input type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)}/>
                <label >Area</label>
                <input type="text" name='area' value={area} onChange={(e) => setArea(e.target.value)}/>
                {/* <label >Category</label>
                <input type="text" /> */}
                <div className="checkInp">
                    <label>Category</label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
                            <label>Veg</label>
                        </div>
                        <div className="checkboxContainer">
                            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                            <label>Non-Veg</label>
                        </div>
                    </div>
                </div>
                <div className="checkInp">
                    <label>Region</label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
                            <label >South-Indian</label>
                        </div>
                        <div className="checkboxContainer">
                            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
                            <label >North-Indian</label>
                        </div>
                        <div className="checkboxContainer">
                            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
                            <label>Bakery</label>
                        </div>
                        <div className="checkboxContainer">
                            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/>
                            <label >Chinese</label>
                        </div>
                    </div>
                </div>
                {/* <label >Region</label>
                <input type="text" /> */}
                <label >Offer</label>
                <input type="text" name="offer" value={offer} onChange={(e) => setOffer(e.target.value)}/>
                <label >Firm Image</label>
                <input type="file" onChange={handleImageUpload}/>
                <br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddFirm
