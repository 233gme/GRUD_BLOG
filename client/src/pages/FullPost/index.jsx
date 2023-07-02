import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'shared/config/axios/axios';
import PageLoader from 'widgets/PageLoader';
import ReactMarkdown from 'react-markdown';
import { Image } from '../../shared/ui';

const FullPost = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        alert(error);
      });
  }, []);

  if (loading) {
    return <PageLoader/>;
  }

  // console.log(data);

  return (
    <div className={'container'}>
      <Image src={data.imageUrl} alt={data.title}/>
      <h2>{data.title}</h2>

      <ReactMarkdown>
        {data.text}
      </ReactMarkdown>
      <p>{data.text}</p>
    </div>
  );
};

export default FullPost;
