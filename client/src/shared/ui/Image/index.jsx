import './styles.css';

const Image = ({ src, alt = 'image' }) => {
  return (
    <img src={src} alt={alt} className='image'/>
  );
};

export default Image;
