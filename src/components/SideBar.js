import React from 'react';
import { BiHomeCircle,BiMusic,BiUser,BiSearch,BiLike,BiSlideshow } from "react-icons/bi";
function SideBar(props) {
    return (
        <div className='side-bar-menu'>
            <div className="side-bar-menu-logo">
                <img src="/logo.png" alt=""/>
            </div>
            <div className="side-bar-menu-list">
                <div className="side-bar-menu-item">
                    <BiHomeCircle/>
                    <span>Trang chủ</span>
                </div>
                <div className="side-bar-menu-item">
                    <BiUser/>
                    <span>Cá Nhân</span>
                </div>
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
                <div className="side-bar-menu-item">
                    <div className='side-bar-menu-playlist'>
                        <BiSlideshow/>
                    </div>
                    <span>
                    Playlist
                    </span>
                </div>
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