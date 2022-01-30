import React from 'react';
import Wrapper from '../components/Wrapper';
import {useSelector,useDispatch} from 'react-redux'
import {userInfor} from '../redux/selector/userInfor'
import {useNavigate} from 'react-router-dom'
import {setUser} from '../redux/action/user'
import { getAuth, signOut } from "firebase/auth";

function Me(props) {

    const auth = getAuth();
    console.log(auth)

    const userInfo=useSelector(userInfor)
    const dispath=useDispatch()
    const navigate=useNavigate()

    const handleLogout=()=>{
        signOut(auth).then(() => {
            navigate('/')
            dispath(setUser(null))
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <Wrapper>
                <div className='me-content'>
                    <div className="text-center">
                        <img src={userInfo?.photoURL} alt="" className='avatar-area'/>
                        <h2 className='name'>{userInfo?.displayName}</h2>
                        <div className='me-content-control'>
                            <div className='btn-upgrade vip'>Nâng cấp VIP</div>
                            <div className='btn-upgrade logout' onClick={handleLogout}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
        </Wrapper>
    );
}

export default Me;