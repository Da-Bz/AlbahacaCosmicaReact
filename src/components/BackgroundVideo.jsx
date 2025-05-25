const BackgroundVideo = ({ src, id = "video-banner" }) => {
  return (
    <section id="banner">
      <video key={src} autoPlay muted loop id={id}>
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </section>
  );
};

export default BackgroundVideo;
