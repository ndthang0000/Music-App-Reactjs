import React from 'react';
import { BiHomeCircle,BiMusic,BiUser,BiSearch,BiLike,BiSlideshow } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { BsMusicNoteList } from "react-icons/bs";
import { useLocation  } from 'react-router-dom';

const menu=[
    {icon:<BiHomeCircle/>,name:'Trang chủ',link:'/'},
    {icon:<BsMusicNoteList/>,name:'Danh sách chờ',link:'/music'},
    {icon:<BiUser/>,name:'Cá nhân',link:'/me'},
]
function SideBar(props) {
    const location=useLocation ()
    console.log('Sidebar re-render')
    const checkActive=(link)=>{
        let data='/'+location.pathname.split('/')[1]
        if(data===link)
            return true
        return false
    }
    return (
        <div className='side-bar-menu'>
            <div className="side-bar-menu-logo">
                <img src="/logo.png" alt=""/>
            </div>
            <div className="side-bar-menu-list">
                {menu.map(item=>
                    (<Link to={item.link} key={item.link} >
                        <div className={checkActive(item.link)?'side-bar-menu-item active':'side-bar-menu-item'}>
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    </Link>)
                )}
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
                <Link to='/me' className="side-bar-menu-item">
                    <div className='side-bar-menu-playlist'>
                        <BiSlideshow/>
                    </div>
                    <span>
                    Playlist
                    </span>
                </Link>
                <Link to='/recently'>
                    <div className="side-bar-menu-item">
                        <div className='side-bar-menu-playlist rencent'>
                            <BiMusic/>
                        </div>
                        <span>
                        Nghe gần đây
                        </span>
                    </div>
                </Link>
            </div>
            <div className="side-bar-menu-vip">
                <p>Nghe nhạc chất lượng cao và không quảng cáo</p>
                <div className='btn-upgrade'>Nâng cấp VIP</div>
            </div>
        </div>
    );
}

export default SideBar;