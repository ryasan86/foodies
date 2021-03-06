const request = require('request');

const setCookieToken = (ctx, token) => {
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
};

const deleteImageFromCloud = (imgPublicId, response) => {
  response.setHeader('Cache-Control', 'no-cache');
  const auth = Buffer.from(
    `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
  ).toString('base64');

  const options = {
    method: 'DELETE',
    url: process.env.CLOUDINARY_ENDPOINT,
    headers: {
      'cache-control': 'no-cache',
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: {
      prefix: imgPublicId,
    },
    json: true,
  };

  request(options, (err, res, body) => {
    if (err) throw new Error(err);
  });
};

module.exports = { setCookieToken, deleteImageFromCloud };
