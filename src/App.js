import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './sass/App.css'
import Dashboard from "./page/Dashboard";
import UploadSong from "./page/UploadSong";
import Login from './page/Login'
import PlayMusic from "./components/PlayMusic";
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import PageNotAvailable from './page/PageNotAvailable';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch, useSelector } from "react-redux";
import {setUser, setPlaylistAction} from './redux/action/user'
import LoadingPage from './page/LoadingPage';
import env from "react-dotenv";
import {register} from './api/user'
import {getAllPlayList} from './api/user'
import Me from './page/Me';
import MusicList from './page/MusicList'
import PlayListDetail from './components/PlayListDetail';
import Setup from './page/Setup'

const config = {
  apiKey: env.API_KEY_FIREBASE,
  authDomain: env.AUTH_DOMAIN_FIREBASE,
  projectId: "music-app-react-338f8",
  storageBucket: "music-app-react-338f8.appspot.com",
  messagingSenderId: "1028441487206",
  appId: "1:1028441487206:web:ceb8b2b27bb9d5e5733aa7",
  measurementId: "G-24BL1FY8HQ"
};
firebase.initializeApp(config);

// Configure FirebaseUI.

function App() {
    const isAuthing=useSelector(state=>state.user.isAuthing)
    const playList=useSelector(state=>state.user.playList)
    const dispath=useDispatch()  
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged( async (user) => {
        if(user?.isAnonymous){
          const data=await register(user)
        }
        dispath(setUser({user:user,playList:[]}))
        if(playList.length===0){
          const res=await getAllPlayList()
          if(res.success){
              dispath(setPlaylistAction(res.allPlayList))
          }
        }
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
  if(!isAuthing){
    return (
      <>
        <PlayMusic/>
        <SideBar/>
        <NavBar />
        <Routes>
          <Route path="/me/play-list/:id" element={<PlayListDetail />}/>
          <Route path="/me/upload" element={<UploadSong />} />
          <Route path="/me" element={<Me />}/>
          <Route path="/set-up" element={<Setup />}/>
          <Route path="/music" element={<MusicList />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/not-login" element={<PageNotAvailable />} />
        </Routes>
      </>
    );
  }
  else{
    return(
      <>
        <LoadingPage open={isAuthing}/>
      </>
    );
  }
  
}

export default App;
