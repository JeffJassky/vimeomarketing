const sgMail = require('@sendgrid/mail');
const replyParser = require("node-email-reply-parser");
const User = require('../../models/model.user');
const Message = require('../../models/model.message');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const originalMessageIdRegex = /c[0-9a-fA-F]{24}vm/;

module.exports = async function(job, done) {
  try {
    console.log('INCOMING EMAIL PARSE');
    console.log(job.attrs);

    const messageBody = replyParser(job.attrs.data.text).getVisibleText({aggressive: true});
    const envelope = JSON.parse(job.attrs.data.envelope);

    console.log({
      messageBody,
      envelope
    });

    try{
      const toAddress = envelope.to[0].split('@')[0];
      const fromAddress = job.attrs.data.from.match(/[^< ]+(?=>)/g)[0];
      // const originalMessageId = job.attrs.data.text.match(originalMessageIdRegex)[0].substr(1, toAddress.length);
      const originalMessageId = toAddress;

      console.log({
        fromAddress,
        toAddress,
        originalMessageId
      });

      const originalMessage = await Message.findOneWithDeleted({_id: originalMessageId});
      if(originalMessage){
        // We def got a good message ID here. let's find it and create a reply.
        console.log('Def got a good message here');
        const fromUser = await User.findOneWithDeleted({'local.email': fromAddress});
        console.log({originalMessage, fromUser});

        await new Message({
          message: messageBody,
          toAccount: originalMessage.fromAccount,
          fromAccount: originalMessage.toAccount,
          collab: originalMessage.collab,
          user: fromUser ? fromUser._id : null
        }).save();
        done();
      }else{
        throw new Error(`Original message ID not found ${originalMessageId}`);
      }
    }catch(e){
      console.log(e);
    }

  } catch (e) {
    return done(e);
  }
};
