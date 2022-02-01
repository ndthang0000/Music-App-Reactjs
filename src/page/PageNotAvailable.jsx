import React from 'react';
import Wrapper from '../components/Wrapper';
import {Link} from 'react-router-dom'
import { BiLogIn } from "react-icons/bi";
import { BsFillEmojiFrownFill } from "react-icons/bs";

function PageNotAvailable(props) {
    return (
        <Wrapper>
            <div className="page-available">
                <h2 className="text-white text-center tittle">Bạn phải đăng nhập để sử dụng tính năng này</h2>
                <div className='icon-face'>
                    <BsFillEmojiFrownFill/>
                </div>
                <Link to='/login'><BiLogIn className='icon-login'/>Đăng nhập ngay</Link>
            </div>
        </Wrapper>
    );
}

export default PageNotAvailable;