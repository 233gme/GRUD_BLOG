import './styles.css';

const Image = ({ src, alt = 'image' }) => {
  return (
    <img src={`http://localhost:4444${src}`} alt={alt} className='image'/>
  );
};

export default Image;
