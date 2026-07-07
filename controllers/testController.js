const sendEmail = require("../utils/sendEmail");

const testEmail = async (req, res) => {
  try {
    await sendEmail({
      to: "pankajmaurya4269@gmail.com", 
      subject: "STOKZY Test Email",
      html: `
        <h2>Welcome to STOKZY</h2>
        <h4>Congratulations! Your email configuration is working successfully.</h4>
        <p>If you received this email, your mail configuration is working successfully.</p>
        <p>Thank you for using STOKZY</p>
        <p>STOKZY Team</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testEmail,
};