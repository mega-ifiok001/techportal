import express from "express";
import nodemailer from "nodemailer";
import Contact from "./../models/contact.models.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host:   process.env.MAIL_HOST || "smtp.gmail.com",
  port:   parseInt(process.env.MAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
// ─── POST /api/contact/send ───────────────────────────────────────────────────

router.post("/send", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: true, message: "Required fields are missing." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: true, message: "Invalid email address." });
    }
 

    // 1. Save to MongoDB
    const contact = new Contact({ name, email, phone, service, message });
    await contact.save();

    // 2. Send notification email to admin
    await transporter.sendMail({
      from:    `"Tech Portal Website" <${process.env.MAIL_USER}>`,
      to:      process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `New Contact: ${service} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
          <div style="background:#01065d;padding:24px 28px;">
            <h2 style="color:#fff;margin:0;font-size:18px;">New Contact Form Submission</h2>
          </div>
          <div style="padding:28px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#555;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;color:#01065d;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#3949ab;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#555;">Phone</td><td style="padding:8px 0;color:#01065d;">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Service</td><td style="padding:8px 0;color:#01065d;">${service}</td></tr>
              <tr><td style="padding:8px 4px 8px 0;color:#555;vertical-align:top;">Message</td><td style="padding:8px 0;color:#01065d;">${message}</td></tr>
            </table>
          </div>
          <div style="background:#f7f8fd;padding:16px 28px;font-size:12px;color:#aaa;">
            Submitted at ${new Date().toLocaleString("en-NG", { timeZone:"Africa/Lagos" })} WAT · Tech Portal Solution
          </div>
        </div>
      `,
    });

    // 3. Send confirmation email to the user
    await transporter.sendMail({
      from:    `"Tech Portal Solution" <${process.env.MAIL_USER}>`,
      to:      email,
      subject: "We received your message — Tech Portal Solution",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
          <div style="background:#01065d;padding:24px 28px;">
            <h2 style="color:#fff;margin:0;font-size:18px;">Thanks, ${name}!</h2>
          </div>
          <div style="padding:28px;font-size:14px;color:#333;line-height:1.7;">
            <p>We've received your message about <strong>${service}</strong> and will get back to you within one business day.</p>
            <p>Your message:</p>
            <blockquote style="border-left:3px solid #01065d;padding:8px 16px;margin:0;color:#555;font-style:italic;">${message}</blockquote>
            <p style="margin-top:24px;">If this is urgent, you can reach us directly at
              <a href="mailto:hello@techportalsolution.com" style="color:#3949ab;">hello@techportalsolution.com</a>
              or via WhatsApp.
            </p>
          </div>
          <div style="background:#f7f8fd;padding:16px 28px;font-size:12px;color:#aaa;">
            Tech Portal Solution · Akwa Ibom, Nigeria
          </div>
        </div>
      `,
    });

    return res.status(200).json({ error: false, message: "Message sent successfully." });

  } catch (err) {
    console.error("[Contact] Error:", err);
    return res.status(500).json({ error: true, message: "Server error. Please try again later." });
  }
});

// ─── GET /api/contact/all  (admin — protect this with your auth middleware) ───

router.get("/all", async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip  = (page - 1) * limit;

    const filter = {};
    if (req.query.service) filter.service = req.query.service;
    if (req.query.status)  filter.status  = req.query.status;
    if (req.query.search) {
      const q = new RegExp(req.query.search, "i");
      filter.$or = [{ name: q }, { email: q }, { message: q }];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(filter),
    ]);

    return res.status(200).json({
      error: false,
      data:  contacts,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[Contact] Fetch error:", err);
    return res.status(500).json({ error: true, message: "Failed to fetch contacts." });
  }
});

// ─── PATCH /api/contact/:id/status  (mark as read / replied) ─────────────────

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["unread", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: true, message: "Invalid status value." });
    }
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: true, message: "Contact not found." });
    return res.status(200).json({ error: false, data: updated });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Update failed." });
  }
});

// ─── DELETE /api/contact/:id ──────────────────────────────────────────────────

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: true, message: "Contact not found." });
    return res.status(200).json({ error: false, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Delete failed." });
  }
});

export default router;