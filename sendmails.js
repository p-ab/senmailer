const fs = require('fs');
const winston = require('winston');
const sendmail = require('sendmail');
const mailsList = require('./data/mails.json');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const delay = 10000;
const domain = 'domain-example.com';
const send = (to, html) => {
	sendmail(
    {
      from: `no-reply@${domain}`,
      to,
      subject: 'Subject!',
      html,
    },
    (mailErr, reply) => {
      if (mailErr) {
        return res.send({error: mailErr});
      }
      logger.info(`${email} - ${status}`);
      logger.info(reply);
      logger.info('--------------------');
    },
  );
}

let index = 0;
let content;

fs.readFile('./data/mail-template.html', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    const interval = setInterval(() => {
      index++;
      if (index > mailsList.items.length) {
        clearInterval(interval);
      }
      send(mailsList.items[index], content)
    }, delay);
});