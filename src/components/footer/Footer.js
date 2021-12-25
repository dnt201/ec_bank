import React from 'react'
import { ExternalLink  } from 'react-external-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faGithub, faYoutube} from '@fortawesome/free-brands-svg-icons';



import './Footer.css'
const Footer = () => {
    return (
        <footer>
            <div className="social_list">
                <ExternalLink href="https://facebook.com" className="social_item"><FontAwesomeIcon icon={faFacebook} /></ExternalLink>
                <ExternalLink href="https://instagram.com" className="social_item"><FontAwesomeIcon icon={faInstagram} /></ExternalLink>
                <ExternalLink href="https://twitter.com" className="social_item"><FontAwesomeIcon icon={faTwitter} /></ExternalLink>
                <ExternalLink href="https://github.com" className="social_item"><FontAwesomeIcon icon={faGithub} /></ExternalLink>
                <ExternalLink href="https://youtube.com" className="social_item"><FontAwesomeIcon icon={faYoutube} /></ExternalLink>
            </div>
            <div className="contactList">
                <div className="information">
                    <h4 className="lazy_title">About us</h4>
                    <div className="information_item"><b>Địa chỉ:</b> Trường ĐH Sư Phạm Kỹ Thuật - Số 1 Võ Văn Ngân, Phường Linh Chiểu, Quận Thủ Đức, TP.HCM</div>
                    <div className="information_item"><b>Gmail 1: 19110251@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Gmail 2: 19110251@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Gmail 3: 19110251@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Gmail 4: 19110251@student.hcmute.edu.vn</b></div>
                    <div className="information_item"><b>Phone Number: </b>1800 8080</div>
                </div>

    
            </div>
        </footer>
    )
}

export default Footer
