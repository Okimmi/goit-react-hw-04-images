import { TbPhotoSearch } from 'react-icons/tb';
import { Bar, Btn, Form, Input } from './Searchbar.styled';

export const Searchbar = ({ getQuery }) => {
  const onSubmit = e => {
    e.preventDefault();
    getQuery(e.target.elements.query.value);
  };

  return (
    <Bar>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Btn>
          <TbPhotoSearch size="20" />
        </Btn>
      </Form>
    </Bar>
  );
};
