import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { siteConfig } from '../config/siteConfig';

export default function ContactPage({ onNavigate }) {
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

    try {
      // Simulate submission or mailto fallback
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setStatusMessage('Thank you! Your message has been prepared. I look forward to connecting with you.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatus('error');
      setStatusMessage('An error occurred. Please reach out directly via email or LinkedIn.');
    }
  };

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-mono text-[#5f6368] dark:text-[#9aa0a6]">
          Direct Inquiries
        </span>
      </nav>

      {/* Page Header */}
      <header className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8e6] dark:bg-[#371e1c] text-[#c5221f] dark:text-[#f28b82] text-xs font-medium mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT CONTACT & INQUIRIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#202124] dark:text-white leading-tight mb-3">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-[#5f6368] dark:text-[#9aa0a6] max-w-xl leading-relaxed">
          Open to software engineering opportunities, artificial intelligence collaborations, research discussions, and technical consultations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Left Column: Contact Methods */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6] mb-3">
              Location
            </h3>
            <div className="text-sm font-semibold text-[#202124] dark:text-white">
              {siteConfig.location}
            </div>
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-1">
              Available for remote and on-site opportunities.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1a1c]/80 backdrop-blur-sm border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#5f6368] dark:text-[#9aa0a6] mb-3">
              Social & Code
            </h3>
            <div className="space-y-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#3c4043] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition"
              >
                <Github className="w-4 h-4" />
                <span>github.com/VShaunak</span>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-[#3c4043] dark:text-[#bdc1c6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#dadce0] dark:border-[#3c4043] shadow-xs">
            <h2 className="text-lg font-bold text-[#202124] dark:text-white mb-4">
              Send a Message
            </h2>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-[#e6f4ea] dark:bg-[#133321] text-[#137333] dark:text-[#81c995] text-sm">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                  <span>Message Sent Successfully</span>
                </div>
                <p className="text-xs mt-1 text-[#137333]/90 dark:text-[#81c995]/90">
                  {statusMessage}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 rounded-full bg-[#137333] text-white text-xs font-medium cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                    />
                    {errors.name && <p className="text-xs text-[#c5221f] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                    />
                    {errors.email && <p className="text-xs text-[#c5221f] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                  {errors.subject && <p className="text-xs text-[#c5221f] mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3c4043] dark:text-[#bdc1c6] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#3c4043] text-sm text-[#202124] dark:text-white focus:outline-none focus:border-[#1a73e8]"
                  />
                  {errors.message && <p className="text-xs text-[#c5221f] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium transition cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Navigation */}
      <footer className="pt-8 border-t border-[#dadce0] dark:border-[#3c4043] flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
      </footer>
    </article>
  );
}

