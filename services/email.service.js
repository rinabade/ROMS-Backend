const nodemailer = require("nodemailer");

module.exports = ({
	name: "email",
	actions:{
		sendmail:{
			handler : async (ctx)=>{
				const {firstname, lastname, email} = ctx.params;

				var transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "b4f0d632039740",
                      pass: "d96ba7496bd501"
                    }
                  });

				await transport.sendMail({
					from: "\"Reena Bade\" <badereena8811@gmail.com>",
					to: email,
					subject: "Hello",
					text: `Hello ${firstname} ${lastname}, You have been registered successfully.`
				});
        
			}
		},



    token:{
      handler: async(ctx)=>{
        const {email1,firstname,lastname,resetLink} = ctx.params;

        var transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "b4f0d632039740",
                      pass: "d96ba7496bd501"
                    }
                  });

                  await transport.sendMail({
                    from: "\"Reena Bade\" <badereena8811@gmail.com>",
                    to: email1,
                    subject: "Reset Password",
                    text: `Hello ${firstname} ${lastname}. Please click on the given link to reset the password : ${resetLink} `
                });
      }
    },

		send:{
			handler: async (ctx)=>{
				const {email,firstname,lastname} = ctx.params;

					var transport = nodemailer.createTransport({
                            host: "smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                                user: "b4f0d632039740",
                                pass: "d96ba7496bd501"
                            }
                        });
                        await transport.sendMail({
                            from: "\"Reena Bade\" <badereena8811@gmail.com>",
                            to: email,
                            subject: "Reset Password",
                            text: `Hello ${firstname} ${lastname}. Password reset successfully`
                        });
			}
		},

	}
});
