import './styles.css';
import 'easymde/dist/easymde.min.css';
import { useSelector } from 'react-redux';
import axios from 'shared/config/axios/axios';
import SimpleMDEReact from 'react-simplemde-editor';
import PageLoader from 'widgets/PageLoader';
import { selectIsAuth } from 'shared/config/redux/slices/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image, Input } from 'shared/ui';
import { generateTagsFromString, options } from 'shared/lib';

const AddPost = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const [post, setPost] = useState({});
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const { t } = useTranslation('addPost');
  const inputFileRef = useRef(null);

  if (!window.localStorage.getItem('token') && !isAuth) navigate('/');

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setPost({
            title: data.title,
            tags: data.tags.join(' '),
            imageUrl: data.imageUrl,
          });
          setText(data.text);
        }).catch(error => console.warn(error));
    }
  }, []);

  useEffect(() => {
    if (status === 'error') {
      setStatus(null);
    }
  }, [post]);

  const mdeOptions = useMemo(() => ({
    ...options,
    placeholder: t('text_placeholder'),
  }), []);

  const onTextChange = useCallback((value) => {
    setText(value);
  }, []);

  const onPostChange = (event) => {
    setPost(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const imgFile = event.target.files[0];
      formData.append('image', imgFile);
      const { data } = await axios.post('/uploads', formData);
      setPost(prevState => ({
        ...prevState,
        imageUrl: data.url
      }));
    } catch (error) {
      setStatus('error');
      console.warn(error);
    }
  };
  const handleFileRemove = async () => setPost(prevState => ({ ...prevState, imageUrl: '' }));
  const onImageUpload = () => (inputFileRef.current.click());
  const onSubmit = async () => {
    try {
      setStatus('loading');
      const fields = {
        title: post.title,
        text: text,
        tags: generateTagsFromString(post.tags),
        imageUrl: post?.imageUrl || '',
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const postId = isEditing ? id : data._id;
      navigate(`/posts/${postId}`);
    } catch (error) {
      setStatus('error');
      console.warn(error);
    }
  };

  return status === 'loading'
    ? <PageLoader/>
    : (
      <div className="container">
        <div className="add_post">
          <h2>{t('title')}</h2>
          {
            status === 'error'
              ? <span className={'add_post_err_msg'}>{t('error')}</span>
              : null
          }
          <div className="add_post_upload_btn">
            <Button action={onImageUpload}>
              {
                post?.imageUrl
                  ? t('img_btn_change')
                  : t('img_btn_upload')
              }
            </Button>
            {
              post?.imageUrl
                ? <Button action={handleFileRemove} type={'pink'}>{t('img_btn_remove')}</Button>
                : null
            }
          </div>
          {
            post?.imageUrl
              ? <Image src={post.imageUrl} alt="Uploaded"/>
              : null
          }
          <input type={'file'} ref={inputFileRef} hidden={true} onChange={handleFileChange}/>
          <Input
            value={post?.title || ''}
            onChange={onPostChange}
            name={'title'}
            placeholder={t('title_placeholder')}
          />
          <Input
            value={post?.tags || ''}
            onChange={onPostChange}
            name={'tags'}
            placeholder={t('tags_placeholder')}
          />
          <div className="add_post_mde">
            <SimpleMDEReact
              className='editor'
              value={text}
              onChange={onTextChange}
              options={mdeOptions}
            />
          </div>
          <Button action={onSubmit}>
            {
              isEditing
                ? t('edit_btn')
                : t('send_btn')
            }
          </Button>
        </div>
      </div>
    );
};

export default AddPost;
