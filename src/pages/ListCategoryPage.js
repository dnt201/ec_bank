import React,{useEffect}  from 'react'
import BtnListItem from '../components/btnListItem/BtnListItem'
import Policy from '../components/policy/Policy'
import Loader from '../components/loader/Loader'

import background from '../images/background.png'

import './ListCategoryPage.css'

const ListCategoryPage = (props) => {
    useEffect(() => {
        window.scroll(0,80);
    },[])
    console.log(props)
    return (
  
        <div>
            <div className="header" style={{
            backgroundImage: `url(${background})`,
            }}>
                <span> {props.title} </span>
                <img src={"https://firebasestorage.googleapis.com/v0/b/doancongnghethongtin-2df4c.appspot.com/o/files%2F121312.jpg?alt=media&token=2e03f9cd-38ee-4710-96c4-c7deb382211a"} alt=""/>
            </div>
            <h1 className="listCategoryHeader">Danh sách</h1>
            {props.category.map===null &&<Loader/>}
            <div className="listCategory">
                {props.category.map((item) =>
                    <BtnListItem key={item._id} title={item.name} path={item.name} type={props.type} image={item.image} />
                )}
            </div>
            <Policy/>
        </div>

    )
}

export default ListCategoryPage
