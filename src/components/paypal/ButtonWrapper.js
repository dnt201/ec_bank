import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import axios from 'axios'
import {
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import { add_money } from '../../actions/userActions';

const style = { layout: "vertical" };

const ButtonWrapper = (props, { showSpinner }) => {
    const dispatch = useDispatch();
    const [{ options, isPending }] = usePayPalScriptReducer();
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={{ style }}
                disabled={false}
                forceReRender={[props.amount, "USD", style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    console.log("số thẻ: ", props.idthe, "số tiền: ", props.amount)
                    if (props.amount <= 0) {
                        alert("Sao số tiền vẫn lỗi được nhờ :vv Thầy ảo quá dzay?")
                    }
                    else {
                        console.log("inside: ", props)
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: parseFloat(props.amount).toFixed(2),
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                console.log("create order",orderId)
                                return orderId;
                            });

                    }
                }}

                onApprove={function(data, actions) {
                    return actions.order.capture().then(function () {
                        console.log("tạo order xong với số thẻ: ", props.idthe, " với số tiền: ", props.amount)
                        dispatch(add_money(props.idthe,props.amount));
                      
                        props.setStep(3);
                        
                        // Your code here after capture the order
                    });
                }}
            />
        </>
    )
}

export default ButtonWrapper
