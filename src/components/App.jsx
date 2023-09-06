import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { PER_PAGE, getImages } from 'services/api-image';
import { Button } from './Button/Button';
import { Layout } from './Layout/Layout.styled';
import { Modal } from './Modal/Modal';
import { Message } from './Message/Message';
import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState([]);
  const [totalImage, setTotalImage] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getImg() {
      try {
        setLoad(true);
        setError(false);

        const responce = await getImages(query, page);
        setImage(prev => [...prev, ...responce.data.hits]);
        setTotalImage(responce.data.totalHits);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    if (query !== '') {
      getImg();
    }
  }, [query, page]);

  const getQuery = query => {
    setQuery(`${Date.now()}/${query}`);
    setPage(1);
    setImage([]);
    setTotalImage(0);
  };

  const onBtnClick = () => {
    setPage(prev => prev + 1);
  };

  const getImageForModal = url => {
    setSelectedImageUrl(url);
  };

  const onModalClose = () => {
    setSelectedImageUrl('');
  };

  return (
    <Layout>
      <Searchbar getQuery={getQuery}></Searchbar>
      {image.length !== 0 && (
        <ImageGallery
          image={image}
          onImageClick={getImageForModal}
        ></ImageGallery>
      )}

      {load && <Loader></Loader>}

      {image.length !== 0 && totalImage > PER_PAGE * page && (
        <Button onClick={onBtnClick}></Button>
      )}

      <Message
        error={error}
        empty={image.length === 0 && query !== '' && !load}
      ></Message>
      <Modal
        url={selectedImageUrl}
        query={query}
        onModalClose={onModalClose}
      ></Modal>
      <GlobalStyle></GlobalStyle>
    </Layout>
  );
};
