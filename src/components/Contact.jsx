import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { siteConfig } from '../config/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // If an external endpoint is configured in siteConfig.contactFormEndpoint
    if (siteConfig.contactFormEndpoint && siteConfig.contactFormEndpoint.trim().length > 0) {
      try {
        const response = await fetch(siteConfig.contactFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Service returned an error.');
        }
      } catch (err) {
        setStatus('error');
        setStatusMessage('There was an issue sending your message. Please reach out directly via email or LinkedIn below.');
      }
    } else {
      // Graceful GitHub Pages Fallback: prepare direct mailto dispatch with validated form payload
      setTimeout(() => {
        const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
          `[Portfolio Contact] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;

        window.location.href = mailtoUrl;

        setStatus('success');
        setStatusMessage('Your message details have been validated and opened in your email client!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Let’s Build Something Exceptional Together.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Whether you want to discuss full-stack engineering roles, collaborative AI/ML research, or technical advisory, feel free to reach out.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Contact Info & Channels (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Direct Channels
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connect via professional platforms or email.
              </p>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400 uppercase">Email Address</div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {siteConfig.email}
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={siteConfig.linkedin || "https://www.linkedin.com/in/shaunak-vidwans/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400 uppercase">LinkedIn Profile</div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  linkedin.com/in/shaunak-vidwans
                </div>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/50 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 border border-purple-100 dark:border-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-slate-400 uppercase">GitHub Profile</div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                  github.com/VShaunak
                </div>
              </div>
            </a>
          </div>

          {/* Privacy & Fast Response Assurance */}
          <div className="bg-slate-100/80 dark:bg-slate-950/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Prompt Technical Communication</span>
            </div>
            <p>
              Messages received are typically acknowledged within 24 to 48 business hours. Your communication remains strictly private and is never distributed.
            </p>
          </div>
        </div>

        {/* Interactive Contact Form (3 cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  placeholder="e.g. Alex Chen"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="alex@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                  } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: null });
                }}
                placeholder="Software Engineering Inquiry / Project Collaboration"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                  errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
            </div>

            {/* Message Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Message Details *
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {formData.message.length} chars
                </span>
              </div>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: null });
                }}
                placeholder="Hi Shaunak, I came across your portfolio and would like to connect regarding..."
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border ${
                  errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                } text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* Status Feedback Message */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 flex items-center gap-2.5 text-xs text-red-800 dark:text-red-300 font-medium">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Inquiries</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
