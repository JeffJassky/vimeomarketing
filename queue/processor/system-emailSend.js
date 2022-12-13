const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function(job, done) {
  try {
    const templatePath = `${process.cwd()}/api/views/email/${job.attrs.data.template}.hbs`;
    if(fs.existsSync(templatePath)){
      const template = require(templatePath);
      sgMail.send({
        to: job.attrs.data.to,
        subject: job.attrs.data.subject,
        replyTo: job.attrs.data.replyTo,
        from: job.attrs.data.from,
        html: template(job.attrs.data.data)
      }).then(
        response => {
          done(null, {
            success: true,
            response,
            data: job.attrs.data
          })
        },
        error => {
          done(error)
        }
      )
    }else{
      done(`No email template found for ${job.attrs.data.template}`);
    }
  } catch (e) {
    return done(e);
  }
};
