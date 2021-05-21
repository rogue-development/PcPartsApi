import sgMail from '@sendgrid/mail';

export function setupSendgrid() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export function sendVerificationMail(email, token) {
    sgMail.send({
        to: email,
        from: 'pcpartsapi@xandervos.nl',
        templateId: 'd-766085edc2ba4198a4bbe9b49c3b74ee',
        dynamicTemplateData: {
            verification_uri: `https://account.parts.xandervos.nl/verify?token=${token}`
        }
    })
}