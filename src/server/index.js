import express from 'express';
import compression from 'compression';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../client/App';

const app = express();

app.use(compression());
app.set('views', './src/server/views');
app.set('view engine', 'pug');
app.use('/assets', express.static(path.join(__dirname, 'build/public/assets')));

app.get('/*', (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  );

  res.render('index', { html });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

/*import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../client/App';

createServer((req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App/>
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
    res.end();
  }
}).listen(3000);*/
