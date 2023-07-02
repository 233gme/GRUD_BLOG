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
import { generateTagsFromString, generateUniqueId } from 'shared/lib';

const AddPost = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags.join(' '));
          setImageUrl(data.imageUrl);
        }).catch(error => {
        console.warn(error);
      });
    }
  }, []);

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: t('text_placeholder'),
    status: false,
    autosave: {
      enabled: true,
      uniqueId: generateUniqueId(),
      delay: 1000,
    },
  }), []);

  const onTextChange = useCallback((value) => {
    setText(value);
  }, []);

  const onPostTitleChange = (event) => setTitle(event.target.value);
  const onPostTagsChange = (event) => setTags(event.target.value);

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const imgFile = event.target.files[0];
      formData.append('image', imgFile);
      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
    }
  };
  const handleFileRemove = async () => setImageUrl('');
  const onImageUpload = () => (inputFileRef.current.click());
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title: title,
        text: text,
        tags: generateTagsFromString(tags),
        imageUrl: imageUrl,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const postId = isEditing ? id : data._id;
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.warn(error);
    }
  };

  return loading
    ? <PageLoader/>
    : (
      <div className="container">
        <div className="add_post">
          <h2>{t('title')}</h2>
          <div className="add_post_upload_btn">
            <Button action={onImageUpload}>
              {
                imageUrl
                  ? t('img_btn_change')
                  : t('img_btn_upload')
              }
            </Button>
            {
              imageUrl
                ? <Button action={handleFileRemove} type={'pink'}>{t('img_btn_remove')}</Button>
                : null
            }
          </div>
          {
            imageUrl
              ? <Image src={imageUrl} alt="Uploaded"/>
              : null
          }
          <input type={'file'} ref={inputFileRef} hidden={true} onChange={handleFileChange}/>
          <Input value={title} onChange={onPostTitleChange} name={'title'} placeholder={t('title_placeholder')}/>
          <Input value={tags} onChange={onPostTagsChange} name={'tags'} placeholder={t('tags_placeholder')}/>
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
