import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Printer, 
  Sparkles, 
  Brain, 
  Cpu, 
  Globe, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase,
  Play,
  Zap,
  Building,
  Info
} from 'lucide-react';
import { Github } from './Icons';
import { siteConfig } from '../config/siteConfig';

export default function Resume() {
  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' | 'pdf'
  const hasUploadedPdf = Boolean(siteConfig.resumeUrl && siteConfig.resumeUrl.trim().length > 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Curriculum Vitae & Technical Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Shaunak Vidwans — Professional Resume.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Comprehensive breakdown of industry software experience, artificial intelligence research, machine learning experiments, and technical competencies.
        </p>

        {/* View Switcher & Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Interactive Verified Resume
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Uploaded PDF Viewer</span>
              {hasUploadedPdf && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-sm transition cursor-pointer"
            title="Print or save as clean PDF"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-500" />
            <span>Print / Save PDF</span>
          </button>

          {hasUploadedPdf && (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Resume Container */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden print:border-none print:shadow-none print:p-0">
        {activeTab === 'pdf' ? (
          hasUploadedPdf ? (
            <div className="w-full h-[800px] bg-slate-100 dark:bg-slate-950">
              <iframe
                src={`${siteConfig.resumeUrl}#toolbar=0`}
                title="Shaunak Vidwans Resume"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-center mx-auto text-amber-500">
                <Info className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">PDF Upload Placeholder Active</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                You can upload your PDF directly to <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">public/resume/Shaunak_Vidwans_Resume.pdf</code> and set <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">siteConfig.resumeUrl</code>.
              </p>
              <button
                onClick={() => setActiveTab('interactive')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md cursor-pointer"
              >
                View Interactive Verified Resume
              </button>
            </div>
          )
        ) : (
          /* Interactive Resume Document */
          <div className="p-6 sm:p-10 space-y-10">
            {/* Header Resume Banner */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {siteConfig.name}
                </h1>
                <p className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                  Software Developer | Artificial Intelligence | Machine Learning | Data Science
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>github.com/VShaunak</span>
                  <span>•</span>
                  <span>{siteConfig.email}</span>
                  <span>•</span>
                  <span>United States</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-500" />
                <span>Professional Identity & AI Philosophy</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                Versatile software developer and AI engineer experienced in building production-ready web platforms, training and deploying deep learning models, formulating transparent multi-agent and multi-LLM consensus architectures, and engineering high-throughput spatial graph analytics. Adept across the full engineering lifecycle—from data preprocessing and mathematical modeling to modern containerized microservices and responsive frontends.
              </p>
            </div>

            {/* Professional Work Experience */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <span>Professional Work Experience</span>
              </h3>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Software Developer</span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        Work Experience
                      </span>
                    </h4>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Universal SelfCare
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">June 2026 – Sep 2026</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    <span>
                      Engineered responsive full-stack software features, healthcare workflows, and digital user experiences at <strong>Universal SelfCare</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    <span>
                      Developed and integrated robust RESTful APIs, optimized database operations, and streamlined application performance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    <span>
                      Collaborated in agile development sprints, conducting code reviews and delivering clean, modular, and maintainable codebases.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Flagship Technical & AI Projects Experience */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Featured AI Research & Flagship Engineering Projects</span>
              </h3>

              <div className="space-y-6">
                {/* 1. Multi-LLM FactChecker & 3D Consensus Evaluator */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/40 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Multi-LLM FactChecker & 3D Consensus Evaluator
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        AI Consensus Engine
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <a
                        href="https://vshaunak.github.io/Multi-LLM-factChecker/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-mono">
                    Technologies: Python 3.10+, OpenRouter AI API, Three.js, Mathematical Consensus Modeling, Google Material 3
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        Engineered an open-source, zero-dependency engine evaluating claims across <strong>10 parallel free AI LLMs</strong> sorted by real-time lowest latency.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        Eliminated centralized judge model bias by formulating an objective mathematical consensus algorithm calculating all <strong>45 unique pairwise comparisons</strong> using TF-IDF cosine similarity.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        Rendered an interactive <strong>3D consensus graph visualizer</strong> with node physics using Three.js and designed a responsive Google Material 3 interface.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 2. CareGraph: Healthcare Intelligence Powered by Graph Analytics */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/40 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        CareGraph: Healthcare Intelligence & Proximity Graph Analytics
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Graph Intelligence & AI
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <a
                        href="https://caregraph-healthcare-intelligence.onrender.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live on Render</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-mono">
                    Technologies: Python, Flask 3, OpenStreetMap, CMS Care Compare Federal Data, Proximity Graph Analytics
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>
                        Architected an intelligent healthcare proximity platform combining real-time OpenStreetMap road travel duration with verified federal CMS Care Compare quality metrics.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>
                        Implemented a conservative clinical triage questionnaire routing patients to appropriate emergency departments or urgent care clinics to prevent hospital crowding.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>
                        Formulated topological proximity graphs evaluating geographic clustering and travel accessibility for first-responders.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 3. Racing Genesis 2.0: AI for Visual Computing & Simulation */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/40 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Racing Genesis 2.0 — AI for Visual Computing & Arcade Simulator
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                        Visual Computing & AI
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <a
                        href="https://vshaunak.github.io/RacingGenesis-2.0/prototype/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live Prototype</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://youtu.be/GLIEs-A5Xi0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Walkthrough</span>
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-mono">
                    Rutgers University • CS 549 (AI for Visual Computing) • Team Lead: Shaunak M Vidwans
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                      <span>
                        Led engineering of a visual computing platform featuring <strong>Autonomous AI driving mode</strong> vs. manual WASD controls across 5 authentic F1 circuits (Monza, Silverstone, Spa, Monaco, Suzuka).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                      <span>
                        Engineered a <strong>90 FPS WebGL rendering pipeline</strong>, Catmull-Rom spline circuit interpolation, and Pacejka lateral tire slip dynamics.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                      <span>
                        Architected a full three-state interactive game loop: Configuration Modal, Active Telemetry Race Canvas, and Post-Race Results Telemetry.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 4. Deep Learning & Transformer NLP Projects */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Applied Deep Learning & Biometric AI Systems
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Fake News Transformer Detection:</strong> Fine-tuned BERT (92% accuracy), RoBERTa (94%), and DistilBERT (90%) models with token-level importance and attention visualization heatmaps.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Biometric Face Recognition Engine:</strong> Captured live video feeds via OpenCV, generated 512D facial embeddings using InsightFace ONNX models, and executed sub-millisecond vector indexing with FAISS.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Interactive Digit Drawing CNN:</strong> Built a canvas drawing interface integrated with a PyTorch Convolutional Neural Network streaming 10-class softmax probabilities in real time.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Categorized Technical Skills */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Technical Skills & Methodologies</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Artificial Intelligence & Deep Learning</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    PyTorch, Hugging Face (BERT, RoBERTa), OpenRouter Multi-LLM API, InsightFace, ONNX Runtime, FAISS Vector Search, OpenCV, scikit-learn, CNNs, Consensus Modeling.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Software Architecture & Web Engineering</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    TypeScript, JavaScript (ES6+), React 18, Vite, FastAPI, Flask, Node.js, Express, Hono, Turborepo, Tailwind CSS, Docker, GitHub Actions CI/CD.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Data Science & Database Systems</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    T-SQL, Microsoft SQL Server (SSMS), PostgreSQL, MySQL, MongoDB, Drizzle ORM, Pandas, NumPy, Beautiful Soup (Web Scraping), Power BI (DAX).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Visual Computing, IoT & Simulations</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                    HTML5 Canvas, WebGL, Three.js, Catmull-Rom Spline Interpolation, Arduino UNO R3, Embedded C++, Serial Bluetooth (HC-05).
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Academic Credentials */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Education & Academic Credentials</span>
              </h3>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/40 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Bachelor's Degree</span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        GPA: 3.24
                      </span>
                    </h4>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Bachelor of Science / Technology
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Cumulative GPA: <span className="font-bold text-slate-900 dark:text-white">3.24 / 4.0</span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      Graduated with a <strong>3.24 GPA</strong> in Bachelor's program, with academic focus on software engineering, artificial intelligence, and data analytics.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>Key Coursework & Research:</strong> Artificial Intelligence, Machine Learning, Deep Neural Networks, Data Structures & Algorithms, Relational Database Management, Visual Computing, and Operating Systems.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Print Footer note */}
            <div className="text-[11px] font-mono text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              Shaunak Vidwans • Bachelor's GPA: 3.24 • Software Developer (Universal SelfCare: June 2026 – Sep 2026) • Portfolio: https://vshaunak.github.io/Portfolio/
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
