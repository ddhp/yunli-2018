import { schema } from 'normalizr';

const image = new schema.Entity('image');
const project = new schema.Entity('project', {
  images: [image],
});
const author = new schema.Entity('author');
const defaultData = new schema.Entity('defaultData', {
  projects: [project],
  images: [image],
  author,
});

export default {
  project,
  image,
  defaultData,
};
