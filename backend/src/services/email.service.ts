import nodemailer from "nodemailer";

export const EMAIL_TO = process.env.EMAIL_TO || "sales@dharaaveda.com";

/**
 * Sends a confirmation email to the customer after a booking is confirmed.
 */
export async function sendConfirmationEmail(booking: any): Promise<void> {
  const host = process.env.SMTP_HOST || "smtp.mailtrap.io";
  const port = parseInt(process.env.SMTP_PORT || "2525");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  
  const fromAddress = process.env.EMAIL_FROM || `"Dharaaveda Therapy" <${EMAIL_TO}>`;

  const mailOptions = {
    from: fromAddress,
    to: booking.email,
    subject: `Booking Confirmed: ${booking.service} (ID: ${booking.bookingId})`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1a202c;">
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="display: inline-block; width: 50px; height: 50px; border: 2px solid #FA980F; transform: rotate(45deg); line-height: 50px; text-align: center; margin-bottom: 10px; background-color: #050d0a;">
            <span style="display: block; transform: rotate(-45deg); font-family: monospace; font-size: 14px; font-weight: bold; color: #ffffff;">DA</span>
          </div>
          <h2 style="color: #050d0a; font-family: 'Georgia', serif; font-size: 24px; margin: 10px 0 5px 0; letter-spacing: 1px;">Dhara<span style="color: #FA980F;">Aveda</span></h2>
          <p style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #718096; letter-spacing: 2px; margin: 0;">Sanctuary Residency Booking</p>
        </div>
        
        <div style="background-color: #f7fafc; border: 1px solid #edf2f7; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #48bb78; margin-top: 0; font-size: 18px; text-align: center;">✓ Session Booking Confirmed</h3>
          <p style="font-size: 13px; line-height: 1.6; text-align: center; color: #4a5568;">
            Greetings <strong>${booking.name}</strong>, your spiritual alignment session has been successfully ledgered at our sanctuary.
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Booking Reference ID</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #050d0a; font-family: monospace;">${booking.bookingId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Therapy Service</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #050d0a;">${booking.service}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Scheduled Date</td>
            <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #050d0a;">${booking.date}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Preferred Time Slot</td>
            <td style="padding: 10px 0; text-align: right; color: #4a5568;">${booking.time}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Duration</td>
            <td style="padding: 10px 0; text-align: right; color: #4a5568;">1 Hour</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Amount Charged</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #FA980F;">₹${booking.amount.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #718096; font-weight: 500; font-family: monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Payment Status</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #48bb78; text-transform: uppercase;">PAID</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; line-height: 1.5; color: #718096;">
          <p style="margin: 0 0 10px 0;"><strong>Residency Guidelines:</strong> Please arrive 10 minutes prior to your session. If you have any additional case files or bio-resonance scans, kindly carry them with you.</p>
          <p style="margin: 0;">For cancellations or rescheduling requests, please contact us at <a href="mailto:${EMAIL_TO}" style="color: #FA980F; text-decoration: none;">${EMAIL_TO}</a>.</p>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #a0aec0; font-family: monospace;">
          © 2026 DharaAveda. Wayanad Highland Valley Sanctuaries, Kerala, India.
        </div>
      </div>
    `
  };

  if (!user || !pass) {
    console.log("=========================================================");
    console.log("MOCK CONFIRMATION EMAIL DISPATCHED (SMTP Credentials missing in .env)");
    console.log(`From:    ${mailOptions.from}`);
    console.log(`To:      ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body:\n${mailOptions.html.replace(/<[^>]*>/g, " ").trim().substring(0, 300)}...`);
    console.log("=========================================================");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass
      }
    });

    await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Confirmation email sent successfully to ${booking.email}`);
  } catch (error) {
    console.error("[EmailService] Error transmitting confirmation email:", error);
  }
}

/**
 * Sends a booking notification email to the admin/sales team.
 */
export async function sendBookingNotificationEmail(booking: any): Promise<void> {
  const host = process.env.SMTP_HOST || "smtp.mailtrap.io";
  const port = parseInt(process.env.SMTP_PORT || "2525");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  
  const fromAddress = process.env.EMAIL_FROM || `"Dharaaveda" <${EMAIL_TO}>`;

  const mailOptions = {
    from: fromAddress,
    to: EMAIL_TO,
    subject: `New Booking Confirmed: ${booking.service} (ID: ${booking.bookingId})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px;">
        <h2 style="color: #050d0a;">New Booking Confirmed</h2>
        <p>A booking request has been successfully processed and paid on the site.</p>
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;"/>
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Service Requested:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time Slot:</strong> ${booking.time}</p>
        <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
        <p><strong>Client Name:</strong> ${booking.name}</p>
        <p><strong>Client Email:</strong> ${booking.email}</p>
        <p><strong>Client Phone:</strong> ${booking.phone}</p>
        <p><strong>Client Notes:</strong> ${booking.notes || "None"}</p>
      </div>
    `
  };

  if (!user || !pass) {
    console.log("=========================================================");
    console.log("MOCK ADMIN BOOKING NOTIFICATION DISPATCHED");
    console.log(`From:    ${mailOptions.from}`);
    console.log(`To:      ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log("=========================================================");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
    await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Admin booking notification sent to ${EMAIL_TO}`);
  } catch (error) {
    console.error("[EmailService] Error transmitting admin booking notification:", error);
  }
}

/**
 * Sends a general or export inquiry notification email to the admin/sales team.
 */
export async function sendInquiryNotificationEmail(inquiry: any): Promise<void> {
  const host = process.env.SMTP_HOST || "smtp.mailtrap.io";
  const port = parseInt(process.env.SMTP_PORT || "2525");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  
  const fromAddress = process.env.EMAIL_FROM || `"Dharaaveda" <${EMAIL_TO}>`;

  const isExport = !!inquiry.productName;
  const subject = isExport 
    ? `New Export Inquiry: ${inquiry.productName} from ${inquiry.name}`
    : `New Website Inquiry: ${inquiry.name}`;

  const mailOptions = {
    from: fromAddress,
    to: EMAIL_TO,
    replyTo: inquiry.email,
    subject: subject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px;">
        <h2 style="color: #050d0a;">${isExport ? "Export Inquiry / Request Quote" : "General Website Inquiry"}</h2>
        <p>You have received a new inquiry from the website form.</p>
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;"/>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${inquiry.company || "Not provided"}</p>
        ${isExport ? `<p><strong>Product Sourced:</strong> ${inquiry.productName}</p>` : ""}
        ${isExport ? `<p><strong>Quantity Target:</strong> ${inquiry.quantity}</p>` : ""}
        <p><strong>Message / Demand details:</strong></p>
        <blockquote style="background: #f7fafc; border-left: 4px solid #FA980F; margin: 15px 0; padding: 15px; font-style: italic;">
          ${inquiry.message.replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
    `
  };

  if (!user || !pass) {
    console.log("=========================================================");
    console.log("MOCK INQUIRY EMAIL DISPATCHED");
    console.log(`From:    ${mailOptions.from}`);
    console.log(`To:      ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log("=========================================================");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
    await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Inquiry notification email sent to ${EMAIL_TO}`);
  } catch (error) {
    console.error("[EmailService] Error transmitting inquiry notification email:", error);
  }
}
