import { useLocation } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";
import '../styles/Header.css';

const Header = () => {
    const location = useLocation();

    const videos = {
        "/": { src: "/video/salsa.mp4", id: "video-banner" },
        "/carta": { src: "/video/pizzaharina.mp4", id: "video-carta" },
    };

    const matchedPath = Object.keys(videos)
        .sort((a, b) => b.length - a.length)
        .find(path => location.pathname.startsWith(path));

    const videoData = videos[matchedPath] || videos["/"];

    return <BackgroundVideo key={location.pathname} src={videoData.src} id={videoData.id} />;
};

export default Header;