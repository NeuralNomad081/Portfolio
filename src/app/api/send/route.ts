import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing");
            return NextResponse.json(
                { error: 'Server configuration error: RESEND_API_KEY is missing' },
                { status: 500 }
            );
        }

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
            to: ['shashwatp011@gmail.com'],
            subject: `New Message from ${name} via Portfolio`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
        });

        if (data.error) {
            console.error("Resend API Error:", data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
