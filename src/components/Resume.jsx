import React from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  Info
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Resume() {
  const hasResume = Boolean(siteConfig.resumeUrl && siteConfig.resumeUrl.trim().length > 0);

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Professional Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Resume & Engineering Credentials.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Overview of technical expertise, verified project delivery, and engineering capabilities.
        </p>
      </div>

      {/* Main Resume Card Container */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Action Bar */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {siteConfig.name}
            </h3>
            <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 font-medium">
              {siteConfig.subheadline}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {hasResume ? (
              <>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs font-mono">
                <Info className="w-4 h-4 shrink-0 text-amber-500" />
                <span>Resume PDF configurable in siteConfig.js</span>
              </div>
            )}
          </div>
        </div>

        {/* Embedded Document View or Interactive Verified Breakdown */}
        {hasResume ? (
          <div className="w-full h-[650px] bg-slate-100 dark:bg-slate-950">
            <iframe
              src={`${siteConfig.resumeUrl}#toolbar=0`}
              title="Shaunak Vidwans Resume"
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="p-6 sm:p-10 space-y-8">
            {/* Core Competencies Matrix */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-500" />
                <span>Core Competencies & Verified Technical Expertise</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Artificial Intelligence & Machine Learning
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    Multi-LLM parallel consensus modeling (45 pairwise comparisons), transformer model fine-tuning (BERT, RoBERTa, DistilBERT), and facial vector embeddings (InsightFace + FAISS vector search).
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["PyTorch", "Hugging Face", "FastAPI", "FAISS", "InsightFace", "OpenCV"].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Full-Stack & Systems Architecture
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    Turborepo monorepo engineering, Expo React Native Web dashboards, Hono edge APIs for Cloudflare Workers, and MERN stack event reservation systems.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React 18", "TypeScript", "Node.js", "Hono", "Drizzle ORM", "Docker"].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Data Science & Database Engineering
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    End-to-end T-SQL data cleaning and warehousing in SSMS, predictive multiple regression modeling (R² = 0.81), automated Beautiful Soup scrapers, and Power BI dashboards.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["T-SQL", "SSMS", "Pandas", "scikit-learn", "Power BI", "BeautifulSoup"].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    Interactive Applications & Hardware Prototyping
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    Custom 60 FPS HTML5 Canvas game engines, Three.js 3D node networks, and wireless Arduino UNO dual thermostat and perimeter security IoT systems.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["HTML5 Canvas", "Three.js", "Arduino C++", "Bluetooth HC-05", "MySQL"].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Note on uploading custom PDF */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                To display your official PDF resume directly inside this viewer, simply upload your file to <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">public/resume/resume.pdf</code> and update <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">siteConfig.resumeUrl</code>.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
