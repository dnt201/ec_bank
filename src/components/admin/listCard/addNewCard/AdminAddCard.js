import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NumberFormat from "react-number-format";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage"
import { storage } from "../../../../firebase"
import Loader from '../../../loader/Loader';

import { createCardLocalDebit, createCardGlobalDebit, createCardGlobalCredit } from "../../../../actions/cardActions"

import './AdminAddCard.css'
const AdminAddCard = (props) => {
    const dispatch = useDispatch()

    const createCard = useSelector(state => state.createCard)
    const { loading, error, success } = createCard;
    

    const [name, setName] = useState("");
    const [ranking, setRanking] = useState("Standard");
    const [typeCustomer, setTypeCustomer] = useState("");
    const [pay_minimumLimit, setPay_minimumLimit] = useState("");
    const [pay_maximumLimit, setPay_maximumLimit] = useState("");
    const [pay_maximumAmountPerDay, setPay_maximumAmountPerDay] = useState("");
    const [pay_maximumTimePerDay, setPay_maximumTimePerDay] = useState("");
    const [draw_minimumLimit, setDraw_minimumLimit] = useState("");
    const [draw_maximumLimit, setDraw_maximumLimit] = useState("");
    const [draw_maximumAmountPerDay, setDraw_maximumAmountPerDay] = useState("");
    const [draw_maximumTimePerDay, setDraw_maximumTimePerDay] = useState("");
    const [transfer_maximumLimit, setTransfer_maximumLimit] = useState("");
    const [transfer_maximumAmountPerDay, setTransfer_maximumAmountPerDay] = useState("");
    const [transfer_maximumTimePerDay, setTransfer_maximumTimePerDay] = useState("");
    const [transac_withdrawFee, setTransac_withdrawFee] = useState("");
    const [transac_TransferFee, setTransac_TransferFee] = useState("");
    const [cardStatementDate, setCardStatementDate] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [minimumPayoutRate, setMinimumPayoutRate] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [lateFee, setLateFee] = useState("");
    const [mess, setMess] = useState("");

    useEffect(() => {
        setMess("")
    }, [])
    useEffect(() => {
        if (error)
            setMess(error)
        else if (success)
            setMess(success)
    }, [error, success])

    console.log(minimumPayoutRate)



    const addLocalDebit = (e) => {
        console.log(e)
        e.preventDefault();
        let type = "LocalDebitCard";
        uploadFiles(selectedImage, type)
    }
    const addGlobalDebit = (e) => {
        e.preventDefault();
        let type = "GlobalDebitCard";
        uploadFiles(selectedImage, type)
    }
    const addGlobalCredit = (e) => {
        e.preventDefault();
        let type = "GlobalCreditCard";
        uploadFiles(selectedImage, type)
    }


    const uploadFiles = (file, type) => {
        if (!file) return;
        const storageRef = ref(storage, `/doantmdt/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => { },
            (error) => { alert("l???i", JSON.stringify(error)) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    let images;
                    images = url
                    if (type === "LocalDebitCard")
                        dispatch(createCardLocalDebit(name, typeCustomer, pay_minimumLimit, pay_maximumLimit, pay_maximumAmountPerDay, pay_maximumTimePerDay, type, draw_minimumLimit, draw_maximumLimit, draw_maximumAmountPerDay, draw_maximumTimePerDay, transfer_maximumLimit, transfer_maximumAmountPerDay, transfer_maximumTimePerDay, transac_withdrawFee, transac_TransferFee, images))
                    else if (type === "GlobalDebitCard")
                        dispatch(createCardGlobalDebit(name, ranking, typeCustomer, pay_minimumLimit, pay_maximumLimit, pay_maximumAmountPerDay, pay_maximumTimePerDay, type, draw_minimumLimit, draw_maximumLimit, draw_maximumAmountPerDay, draw_maximumTimePerDay, transfer_maximumLimit, transfer_maximumAmountPerDay, transfer_maximumTimePerDay, transac_withdrawFee, transac_TransferFee, images))
                    else if (type === "GlobalCreditCard")
                        dispatch(createCardGlobalCredit(name, ranking, cardStatementDate, paymentDate, minimumPayoutRate, creditLimit, interestRate, 0, lateFee, images))
                    else alert("Something went wrong, try again!");
                })
            }
        );
    };


    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <div className="form-popup">
            <div className="admin-add-card-container">
                <h1 className="t-a-center">{props.type}</h1>
                {mess && <i className="error-message-password">{mess}</i>}
                {loading && <div className="loader_center_screen"> <Loader/> </div>}
                {props.type === "LocalDebitCard" ?
                    <form className="add-card-wrap" onSubmit={(e) => addLocalDebit(e)}>
                        <div className="two-columns">
                            <div className="flex-1">
                                <div className="m-b-4px one_line">
                                    <span>T??n card: </span>
                                    <input className="flex-1 m-r-4px m-l-4px" placeholder="Nh???p t??n card..."
                                        onChange={e => setName(e.target.value)} required
                                    ></input>
                                </div>
                                <div className="m-b-4px one_line">
                                    <span>?????i t?????ng kh??ch h??ng: </span>
                                    <input className="flex-1 m-r-4px m-l-4px" placeholder="Nh???p ?????i t?????ng kh??ch h??ng..."
                                        onChange={e => setTypeCustomer(e.target.value)} required
                                    ></input>
                                </div>
                            </div>
                            <div className="flex-1">
                                <span>Images: </span>
                                <input
                                    // disabled={!isEdit}
                                    accept="image/*"
                                    type="file"
                                    onChange={imageChange}
                                    required
                                /><br />
                                {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" />}
                            </div>
                        </div>
                        <div>
                            <h2 className="m-b-4px">Quy ?????nh v??? thanh to??n - Payment</h2>
                            <div className="m-b-4px two-columns">
                                <div className="flex-1 one_line">
                                    <span>S??? ti???n t???i thi???u: </span>
                                    <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n thanh to??n t???i thi???u..."
                                        required
                                        onChange={(e) => setPay_minimumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="flex-1 one_line">
                                    <span>S??? ti???n t???i ??a: </span>
                                    <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n thanh to??n t???i ??a..."
                                        required
                                        onChange={(e) => setPay_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                            </div>
                            <div className="m-b-4px two-columns">
                                <div className="flex-1">
                                    <span>T???ng s??? ti???n c?? th??? thanh to??n trong m???t ng??y: </span>
                                    <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? thanh to??n trong m???t ng??y..."
                                        required
                                        onChange={(e) => setPay_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span>S??? l???n c?? th??? thanh to??n trong m???t ng??y: </span>
                                    <input className="w-99p"
                                        type="number"
                                        placeholder="S??? l???n c?? th??? thanh to??n trong m???t ng??y..."
                                        onChange={(e) => setPay_maximumTimePerDay(e.target.value)} required
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className=" m-b-4px">Quy ?????nh v??? r??t - Withdraw</h2>
                            <div className="m-b-4px two-columns">
                                <div className="flex-1 one_line">
                                    <span>S??? ti???n t???i thi???u: </span>
                                    <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n r??t t???i thi???u..."
                                        required
                                        onChange={(e) => setDraw_minimumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="flex-1 one_line">
                                    <span>S??? ti???n t???i ??a: </span>
                                    <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n r??t t???i ??a..."
                                        required
                                        onChange={(e) => setDraw_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                            </div>
                            <div className="two-columns m-b-4px">
                                <div className="flex-1">
                                    <span>T???ng s??? ti???n c?? th??? r??t trong m???t ng??y: </span>
                                    <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? r??t trong m???t ng??y..."
                                        required
                                        onChange={(e) => setDraw_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span>S??? l???n c?? th??? r??t trong m???t ng??y: </span>
                                    <input
                                        className="w-99p"
                                        type="number"
                                        placeholder="S??? l???n c?? th??? r??t trong m???t ng??y..."
                                        onChange={(e) => setDraw_maximumTimePerDay(e.target.value)} required
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="m-b-4px">Quy ?????nh v??? chuy???n kho???n - Transfer</h2>
                            <div className="m-b-4px">
                                <span>S??? ti???n chuy???n kho???n t???i ??a: </span>
                                <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n chuy???n kho???n t???i ??a..."
                                    required
                                    onChange={(e) => setTransfer_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                    decimalScale={0}
                                    thousandSeparator={true}
                                    suffix=" ??"
                                />
                            </div>
                            <div className="two-columns m-b-4px">
                                <div className="flex-1">
                                    <span>T???ng s??? ti???n c?? th??? chuy???n kho???n trong m???t ng??y: </span>
                                    <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? chuy???n kho???n trong m???t ng??y..."
                                        required
                                        onChange={(e) => setTransfer_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span>S??? l???n c?? th??? chuy???n kho???n trong m???t ng??y: </span>
                                    <input className="w-99p" placeholder="S??? l???n c?? th??? chuy???n kho???n trong m???t ng??y..."
                                        onChange={(e) => setTransfer_maximumTimePerDay(e.target.value)} required
                                    ></input>
                                </div>
                            </div>

                        </div>
                        <div>
                            <h2>Quy ?????nh v??? chi ph?? - Transaction fee</h2>
                            <div className="two-columns m-b-4px">
                                <div className="flex-1">
                                    <span>Chi ph?? cho m???t l???n r??t: </span>
                                    <NumberFormat className="w-99p" placeholder="% chi ph?? m???t l???n r??t!"
                                        required
                                        onChange={(e) => setTransac_withdrawFee(e.target.value.replace(/[,% ]/g, ""))}
                                        decimalScale={3}
                                        thousandSeparator={true}
                                        suffix=" %"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span>Chi ph?? cho m???t l???n chuy???n kho???n: </span>
                                    <NumberFormat className="w-99p" placeholder="% chi ph?? m???t l???n chuy???n kho???n!"
                                        required
                                        onChange={(e) => setTransac_TransferFee(e.target.value.replace(/[,% ]/g, ""))}
                                        decimalScale={3}
                                        thousandSeparator={true}
                                        suffix=" %"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btn-add" type="submit">Add new</button>
                    </form>
                    :
                    props.type === "GlobalDebitCard" ?
                        <form className="add-card-wrap" onSubmit={(e) => addGlobalDebit(e)}>
                            <div className="two-columns">
                                <div className="flex-1">
                                    <div className="m-b-4px one_line">
                                        <span>T??n card: </span>
                                        <input className="flex-1 m-r-4px m-l-4px" placeholder="Nh???p t??n card..."
                                            onChange={e => setName(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div className="m-b-4px one_line">
                                        <span>?????i t?????ng kh??ch h??ng: </span>
                                        <input className="flex-1 m-r-4px m-l-4px" placeholder="Nh???p ?????i t?????ng kh??ch h??ng..."
                                            onChange={e => setTypeCustomer(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div className="m-b-4px one_line zzzz">
                                        <span>Ranking: </span>
                                        <select value={ranking || "Standard"} onChange={e => setRanking(e.target.value)}>
                                            <option value="Standard">Standard</option>
                                            <option value="Platinum">Platinum</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <span>Images: </span>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={imageChange}
                                        required
                                    /><br />
                                    {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" />}
                                </div>
                            </div>
                            <div>
                                <h2 className="m-b-4px">Quy ?????nh v??? thanh to??n - Payment</h2>
                                <div className="m-b-4px two-columns">
                                    <div className="flex-1 one_line">
                                        <span>S??? ti???n t???i thi???u: </span>
                                        <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n thanh to??n t???i thi???u..."
                                            required
                                            onChange={(e) => setPay_minimumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                    <div className="flex-1 one_line">
                                        <span>S??? ti???n t???i ??a: </span>
                                        <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n thanh to??n t???i ??a..."
                                            required
                                            onChange={(e) => setPay_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                </div>
                                <div className="m-b-4px two-columns">
                                    <div className="flex-1">
                                        <span>T???ng s??? ti???n c?? th??? thanh to??n trong m???t ng??y: </span>
                                        <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? thanh to??n trong m???t ng??y..."
                                            required
                                            onChange={(e) => setPay_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span>S??? l???n c?? th??? thanh to??n trong m???t ng??y: </span>
                                        <input className="w-99p"
                                            type="number"
                                            placeholder="S??? l???n c?? th??? thanh to??n trong m???t ng??y..."
                                            onChange={(e) => setPay_maximumTimePerDay(e.target.value)}
                                            required
                                        >
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className=" m-b-4px">Quy ?????nh v??? r??t - Withdraw</h2>
                                <div className="m-b-4px two-columns">
                                    <div className="flex-1 one_line">
                                        <span>S??? ti???n t???i thi???u: </span>
                                        <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n r??t t???i thi???u..."
                                            required
                                            onChange={(e) => setDraw_minimumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                    <div className="flex-1 one_line">
                                        <span>S??? ti???n t???i ??a: </span>
                                        <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n r??t t???i ??a..."
                                            required
                                            onChange={(e) => setDraw_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                </div>
                                <div className="two-columns m-b-4px">
                                    <div className="flex-1">
                                        <span>T???ng s??? ti???n c?? th??? r??t trong m???t ng??y: </span>
                                        <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? r??t trong m???t ng??y..."
                                            required
                                            onChange={(e) => setDraw_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span>S??? l???n c?? th??? r??t trong m???t ng??y: </span>
                                        <input
                                            className="w-99p"
                                            type="number"
                                            placeholder="S??? l???n c?? th??? r??t trong m???t ng??y..."
                                            onChange={(e) => setDraw_maximumTimePerDay(e.target.value)} required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="m-b-4px">Quy ?????nh v??? chuy???n kho???n - Transfer</h2>
                                <div className="m-b-4px">
                                    <span>S??? ti???n chuy???n kho???n t???i ??a: </span>
                                    <NumberFormat className="flex-1 m-r-4px m-l-4px" placeholder="S??? ti???n chuy???n kho???n t???i ??a..."
                                        required
                                        onChange={(e) => setTransfer_maximumLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="two-columns m-b-4px">
                                    <div className="flex-1">
                                        <span>T???ng s??? ti???n c?? th??? chuy???n kho???n trong m???t ng??y: </span>
                                        <NumberFormat className="w-99p" placeholder="T???ng s??? ti???n c?? th??? chuy???n kho???n trong m???t ng??y..."
                                            required
                                            onChange={(e) => setTransfer_maximumAmountPerDay(e.target.value.replace(/[,?? ]/g, ""))}
                                            decimalScale={0}
                                            thousandSeparator={true}
                                            suffix=" ??"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span>S??? l???n c?? th??? chuy???n kho???n trong m???t ng??y: </span>
                                        <input className="w-99p" placeholder="S??? l???n c?? th??? chuy???n kho???n trong m???t ng??y..."
                                            onChange={(e) => setTransfer_maximumTimePerDay(e.target.value)} required
                                        ></input>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <h2>Quy ?????nh v??? chi ph?? - Transaction fee</h2>
                                <div className="two-columns m-b-4px">
                                    <div className="flex-1">
                                        <span>Chi ph?? cho m???t l???n r??t: </span>
                                        <NumberFormat className="w-99p" placeholder="% chi ph?? m???t l???n r??t!"
                                            required
                                            onChange={(e) => setTransac_withdrawFee(e.target.value.replace(/[,% ]/g, ""))}
                                            decimalScale={3}
                                            thousandSeparator={true}
                                            suffix=" %"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span>Chi ph?? cho m???t l???n chuy???n kho???n: </span>
                                        <NumberFormat className="w-99p" placeholder="% chi ph?? m???t l???n chuy???n kho???n!"
                                            required
                                            onChange={(e) => setTransac_TransferFee(e.target.value.replace(/[,% ]/g, ""))}
                                            decimalScale={3}
                                            thousandSeparator={true}
                                            suffix=" %"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className="btn-add" type="submit">Add new</button>
                        </form>
                        :
                        props.type === "GlobalCreditCard" ?
                            <form className="add-card-wrap" onSubmit={(e) => addGlobalCredit(e)}>
                                <div className="m-b-4px">
                                    <span>T??n card: </span>
                                    <input placeholder="Nh???p t??n card..."
                                        onChange={e => setName(e.target.value)} required
                                    ></input>
                                </div>

                                <div className="m-b-4px one_line zzzz">
                                    <span>Ranking: </span>
                                    <select value={ranking || "Standard"} onChange={e => setRanking(e.target.value)}>
                                        <option value="Standard">Standard</option>
                                        <option value="Platinum">Platinum</option>
                                    </select>
                                </div>

                                <div className="m-b-4px">
                                    <span>Ng??y sao k?? th???: </span>
                                    <input placeholder="Nh???p ng??y sao k??..." type="number"
                                        onChange={e => setCardStatementDate(e.target.value)} required
                                    ></input>
                                </div>
                                <div className="m-b-4px">
                                    <span>Ng??y thanh to??n: </span>
                                    <input placeholder="Nh???p s??? ng??y thanh to??n sau ng??y sao k??..." type="number"
                                        onChange={e => setPaymentDate(e.target.value)} required
                                    ></input>
                                </div>
                                <div className="m-b-4px">
                                    <span>T??? l??? thanh to??n t???i thi???u: </span>
                                    <NumberFormat className="" placeholder="T??? l??? thanh to??n t???i thi???u..."
                                        required
                                        onChange={(e) => setMinimumPayoutRate(e.target.value.replace(/[,% ]/g, ""))}
                                        decimalScale={2}
                                        thousandSeparator={true}
                                        suffix=" %"
                                    />
                                </div>
                                <div className="m-b-4px">
                                    <span>M???c t??n d???ng: </span>
                                    <NumberFormat className="" placeholder="Nh???p s??? ti???n c???a th??? t??n d???ng..."
                                        required
                                        onChange={(e) => setCreditLimit(e.target.value.replace(/[,?? ]/g, ""))}
                                        decimalScale={0}
                                        thousandSeparator={true}
                                        suffix=" ??"
                                    />
                                </div>
                                <div className="m-b-4px">
                                    <span>L??i su???t: </span>
                                    <NumberFormat className="" placeholder="Nh???p % l??i su???t..."
                                        required
                                        onChange={(e) => setInterestRate(e.target.value.replace(/[,% ]/g, ""))}
                                        decimalScale={3}
                                        thousandSeparator={true}
                                        suffix=" %"
                                    />
                                </div>
                                <div className="m-b-4px">
                                    <span>% ph???t ch???m thanh to??n: </span>
                                    <NumberFormat className="" placeholder="Nh???p % ph???t..."
                                        required
                                        onChange={(e) => setLateFee(e.target.value.replace(/[,% ]/g, ""))}
                                        decimalScale={2}
                                        thousandSeparator={true}
                                        suffix=" %"
                                    />
                                </div>
                                <div className="m-b-4px">
                                    <span>Images: </span>
                                    <input
                                        // disabled={!isEdit}
                                        accept="image/*"
                                        type="file"
                                        onChange={imageChange}
                                        required
                                    /><br />
                                    {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="image-previews" alt="Pumb" />}
                                </div>
                                <button className="btn-add" type="submit">Add new</button>
                            </form>
                            : <h2><i>Something went wrong! Please reload page.</i></h2>
                }
                <button className="lazy-btn-add-card" onClick={props.handleClose}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </div>
    )
}

export default AdminAddCard
