import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request) {
  console.log('API route hit');
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid API key set');

    const { name, email, message, formType } = await request.json();
    console.log('Received data:', { name, email, message, formType });

    let subjectToTeam, subjectToUser, textToUser, htmlToUser;

    switch (formType) {
      case 'newsletter':
        subjectToTeam = 'New Newsletter Subscription';
        subjectToUser = 'Welcome to ColorFusion Newsletter';
        textToUser = `
          Hello ${name || 'there'},

          Your subscription to the ColorFusion Newsletter has been successfully completed!

          We're thrilled to have you join our community of color enthusiasts and design professionals. Here's what you can look forward to:

          - Exclusive design tips and tricks
          - Early access to new ColorFusion features
          - Inspiring color palettes and trends
          - Helpful resources for your design projects

          We'll be sending you our latest updates, insights, and inspiration straight to your inbox. Keep an eye out for our next newsletter!

          If you have any questions or suggestions for topics you'd like us to cover, feel free to reply to this email. We love hearing from our subscribers!

          Thank you for being a part of the ColorFusion community.

          Best regards,
          The ColorFusion Team
        `;
        htmlToUser = `
          <h1>Hello ${name || 'there'},</h1>

          <p>Your subscription to the ColorFusion Newsletter has been successfully completed!</p>

          <p>We're thrilled to have you join our community of color enthusiasts and design professionals. Here's what you can look forward to:</p>

          <ul>
            <li>Exclusive design tips and tricks</li>
            <li>Early access to new ColorFusion features</li>
            <li>Inspiring color palettes and trends</li>
            <li>Helpful resources for your design projects</li>
          </ul>

          <p>We'll be sending you our latest updates, insights, and inspiration straight to your inbox. Keep an eye out for our next newsletter!</p>

          <p>If you have any questions or suggestions for topics you'd like us to cover, feel free to reply to this email. We love hearing from our subscribers!</p>

          <p>Thank you for being a part of the ColorFusion community.</p>

          <p>Best regards,<br>The ColorFusion Team</p>
        `;
        break;
      case 'contact':
        subjectToTeam = 'New Contact Form Submission';
        subjectToUser = 'Thank you for contacting ColorFusion';
        textToUser = `
          Hello ${name},

          Thank you for reaching out to ColorFusion! We have received your message and appreciate you taking the time to contact us.

          Here's a summary of your message:

          ${message}

          We will review your message and get back to you as soon as possible. If you have any additional information or questions in the meantime, please don't hesitate to reply to this email.

          Thank you for your interest in ColorFusion!

          Best regards,
          The ColorFusion Team
        `;
        htmlToUser = `
          <h1>Hello ${name},</h1>

          <p>Thank you for reaching out to ColorFusion! We have received your message and appreciate you taking the time to contact us.</p>

          <p>Here's a summary of your message:</p>

          <blockquote style="background-color: #f0f0f0; padding: 10px; border-left: 5px solid #ffbb00;">
            ${message}
          </blockquote>

          <p>We will review your message and get back to you as soon as possible. If you have any additional information or questions in the meantime, please don't hesitate to reply to this email.</p>

          <p>Thank you for your interest in ColorFusion!</p>

          <p>Best regards,<br>The ColorFusion Team</p>
        `;
        break;
      case 'community':
        subjectToTeam = 'New message from ColorFusion contact form';
        subjectToUser = 'Welcome to ColorFusion Community';
        textToUser = `
          Welcome to the ColorFusion Community!

          Thank you for joining our vibrant community of designers and developers. We're excited to have you on board!

          Here's what you can expect:
          - Exclusive design tips and tricks
          - Early access to new ColorFusion features
          - Opportunities to connect with fellow creatives
          - Regular updates on design trends and best practices

          If you have any questions or need assistance, don't hesitate to reach out to our support team.

          Happy designing!

          Best regards,
          The ColorFusion Team
        `;
        htmlToUser = `
          <h1>Welcome to the ColorFusion Community!</h1>

          <p>Thank you for joining our vibrant community of designers and developers. We're excited to have you on board!</p>

          <p>Here's what you can expect:</p>
          <ul>
            <li>Exclusive design tips and tricks</li>
            <li>Early access to new ColorFusion features</li>
            <li>Opportunities to connect with fellow creatives</li>
            <li>Regular updates on design trends and best practices</li>
          </ul>

          <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>

          <p>Happy designing!</p>

          <p>Best regards,<br>The ColorFusion Team</p>
        `;
        break;
      default:
        subjectToTeam = 'New message from ColorFusion contact form';
        subjectToUser = 'Welcome to ColorFusion Community';
        textToUser = `
          Welcome to the ColorFusion Community!

          Thank you for joining our vibrant community of designers and developers. We're excited to have you on board!

          Here's what you can expect:
          - Exclusive design tips and tricks
          - Early access to new ColorFusion features
          - Opportunities to connect with fellow creatives
          - Regular updates on design trends and best practices

          If you have any questions or need assistance, don't hesitate to reach out to our support team.

          Happy designing!

          Best regards,
          The ColorFusion Team
        `;
        htmlToUser = `
          <h1>Welcome to the ColorFusion Community!</h1>

          <p>Thank you for joining our vibrant community of designers and developers. We're excited to have you on board!</p>

          <p>Here's what you can expect:</p>
          <ul>
            <li>Exclusive design tips and tricks</li>
            <li>Early access to new ColorFusion features</li>
            <li>Opportunities to connect with fellow creatives</li>
            <li>Regular updates on design trends and best practices</li>
          </ul>

          <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>

          <p>Happy designing!</p>

          <p>Best regards,<br>The ColorFusion Team</p>
        `;
    }

    // Email to ColorFusion team
    const msgToTeam = {
      to: 'contact@ndiagandiaye.com',
      from: {
        email: 'contact@ndiagandiaye.com',
        name: 'ColorFusion Team'
      },
      subject: subjectToTeam,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    // Confirmation email to user
    const msgToUser = {
      to: email,
      from: {
        email: 'contact@ndiagandiaye.com',
        name: 'ColorFusion Team'
      },
      subject: subjectToUser,
      text: textToUser,
      html: htmlToUser,
    };

    console.log('Attempting to send emails');
    await sgMail.send(msgToTeam);
    await sgMail.send(msgToUser);
    console.log('Emails sent successfully');
    return NextResponse.json({ status: 'Ok' });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return NextResponse.json({ error: 'Error sending email', details: error.message }, { status: 400 });
  }
}
