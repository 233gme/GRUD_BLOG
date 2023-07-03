import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'shared/config/axios/axios';
import PageLoader from 'widgets/PageLoader';
import ReactMarkdown from 'react-markdown';
import { IconButton, Image, PostDesc } from 'shared/ui';
import { ReactComponent as BackIcon } from 'shared/assets/icons/up-left.svg';

const FullPost = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const onReturn = () => navigate('/');

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

  return (
    <div className={'container full_post'}>
      <h2>{data.title}</h2>
      <Image src={data.imageUrl} alt={data.title}/>
      <ReactMarkdown>{data.text}</ReactMarkdown>
      {
        data.tags.length
          ? (
            <div className={'full_post_tags_block'}>
              {
                data.tags.map((tag, index) => (<span key={index}>{tag}</span>))
              }
            </div>
          ) : null
      }
      <div className={'full_post_footer'}>
        <PostDesc
          viewsCount={data.viewsCount}
          createdAt={data.createdAt}
          userName={data.user.fullName}
        />
        <IconButton action={onReturn}>
          <BackIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default FullPost;
