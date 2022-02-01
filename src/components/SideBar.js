import React from 'react';
import { BiHomeCircle,BiMusic,BiUser,BiSearch,BiLike,BiSlideshow } from "react-icons/bi";
import { Link } from 'react-router-dom';
function SideBar(props) {
    console.log('Sidebar re-render')
    return (
        <div className='side-bar-menu'>
            <div className="side-bar-menu-logo">
                <img src="/logo.png" alt=""/>
            </div>
            <div className="side-bar-menu-list">
                <Link to='/'>
                    <div className="side-bar-menu-item">
                        <BiHomeCircle/>
                        <span>Trang chủ</span>
                    </div>
                </Link>
                <Link to='/me'>
                    <div className="side-bar-menu-item">
                        <BiUser/>
                        <span>Cá Nhân</span>
                    </div>
                </Link>
                <div className="side-bar-menu-item">
                    <BiSearch/>
                    <span>Tìm kiếm</span>
                </div>
                <div className="side-bar-menu-item">
                    <BiLike/>
                    <span>Theo dõi</span>
                </div>
            </div>
            <div className='side-bar-hr'>
            </div>
            <div className="side-bar-menu-sub-list">
                <Link to='play-list' className="side-bar-menu-item">
                    <div className='side-bar-menu-playlist'>
                        <BiSlideshow/>
                    </div>
                    <span>
                    Playlist
                    </span>
                </Link>
                <div className="side-bar-menu-item">
                    <div className='side-bar-menu-playlist rencent'>
                        <BiMusic/>
                    </div>
                    <span>
                    Nghe gần đây
                    </span>
                </div>
            </div>
            <div className="side-bar-menu-vip">
                <p>Nghe nhạc chất lượng cao và không quảng cáo</p>
                <div className='btn-upgrade'>Nâng cấp VIP</div>
            </div>
        </div>
    );
}

export default SideBar;