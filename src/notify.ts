import axios from "axios";

export const IssueNotify = async (context: any) => {
    const issue = context.payload.issue;
    const { title, body, html_url } = issue;

    const message = `New issue opened: ${title}\n\n${body}\n\nLink: ${html_url}`;

    // Send to Slack
    //   await sendToSlack(message);

    // Send to Discord
    await sendToDiscord(message);

    // Send Email Notification
    //   await sendEmail("New Issue Opened", message);
};

export const PullNotify = async (context: any) => {
    const pr = context.payload.pull_request;
    const { title, body, html_url } = pr;

    const message = `New pull request opened: ${title}\n\n${body}\n\nLink: ${html_url}`;

    // Send to Slack
    //   await sendToSlack(message);

    // Send to Discord
    await sendToDiscord(message);

    // Send Email Notification
    //   await sendEmail("New Pull Request Opened", message);
};

// Function to send message to Slack
// const sendToSlack = async (message: string) => {
//   const webhookUrl = process.env.SLACK_WEBHOOK_URL;
//   if (webhookUrl) {
//     await axios.post(webhookUrl, { text: message });
//   }
// };

// Function to send message to Discord
const sendToDiscord = async (message: string) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
        await axios.post(webhookUrl, { content: message });
    }
};

// Function to send email notification
// const sendEmail = async (subject: string, text: string) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: parseInt(process.env.EMAIL_PORT || "587"),
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: process.env.EMAIL_TO,
//     subject: subject,
//     text: text,
//   };

//   await transporter.sendMail(mailOptions);
// };
