/* eslint-disable */
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import camelize from 'camelize';
const dbPromise = open({
  filename: path.resolve('db/yunli.db'), 
  driver: sqlite3.Database,
});

export default async function defaultDataMiddleware (req, res, next) {
  if (/^\/[api|favi]/.test(req.path)) {
    return next();
  }
  try {
    const db = await dbPromise;
    let [projects, images, author] = await Promise.all([
      db.all('SELECT * FROM project ORDER BY order_index ASC'),
      db.all('SELECT * FROM images'),
      db.get('SELECT * FROM author WHERE name is "Yun Li"'),
    ]);
    projects = camelize(projects);
    images = camelize(images);
    author = camelize(author);
    const projectObj = {};
    projects.map((project) => {
      project.images = [];
      projectObj[project.id] = project;
    });
    images.map((image) => {
      const projectId = image.projectId;
      const project = projectObj[projectId];
      image.projectName = project.name;
      project.images.push(image);
    });
    // console.log(projects, images);
    // console.log(db)
    req.defaultData = {
      projects,
      images,
      author,
    };
    next();
  } catch (err) {
    console.log(err);
  }
}
