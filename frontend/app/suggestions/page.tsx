"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SuggestionFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export default function SuggestionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SuggestionFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setLoading(true);

    try {
      // Use the correct endpoint with /api/ prefix
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000';
      const endpoint = `${baseUrl}/api/suggestions/`;  // Added /api/ prefix
      
      console.log(`🚀 Submitting to: ${endpoint}`);
      console.log('📝 Form data:', formData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log('📊 Response status:', response.status);

      // Get response as text first
      const responseText = await response.text();
      console.log('📄 Response text:', responseText);

      let data: ApiResponse;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed data:', data);
      } catch (parseError) {
        console.error('❌ Failed to parse response:', parseError);
        setError(`सर्भरबाट अमान्य प्रतिक्रिया प्राप्त भयो। कृपया पुन: प्रयास गर्नुहोस्।`);
        setLoading(false);
        return;
      }

      if (response.ok && data.success) {
        setSuccess(data.message || "तपाईंको सुझाव सफलतापूर्वक पठाइएको छ!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        // Handle field errors
        if (data.errors) {
          const errors: Record<string, string> = {};
          Object.keys(data.errors).forEach((key) => {
            errors[key] = data.errors?.[key]?.join(", ") || "Invalid input";
          });
          setFieldErrors(errors);
          setError(data.message || "कृपया फारममा देखाइएका त्रुटिहरू सच्याउनुहोस्।");
        } else {
          setError(data.message || data.detail || `सर्भर त्रुटि: ${response.status}`);
        }
      }
    } catch (err) {
      console.error("❌ Error submitting suggestion:", err);
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError(`🔴 ब्याकेन्ड सर्भरसँग जडान हुन सकेन।

कृपया जाँच गर्नुहोस्:

1. ब्याकेन्ड सर्भर चलिरहेको छ:
   python manage.py runserver

2. सही URL:
   ${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'}/api/suggestions/

3. CORS सेटिङ सही छ:
   settings.py मा CORS_ALLOW_ALL_ORIGINS = True

4. आफ्नो ब्राउजरमा यो URL खोल्नुहोस्:
   ${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'}/api/suggestions/`);
        } else {
          setError(err.message);
        }
      } else {
        setError("अज्ञात त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="suggestions" className="relative bg-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#8B1A1A]/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            हामीलाई सुझाव दिनुहोस्
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            सुझाव दिनुहोस्...
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-xl text-gray-500 text-sm">
            हाम्रो संस्थालाई थप प्रभावकारी बनाउन आफ्नो बहुमूल्य सुझाव हामीलाई पठाउनुहोस्।
          </p>
        </div>

        <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-[#8B1A1A]/5 sm:p-12">
          
          {success && (
            <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">{success}</p>
                  <p className="text-xs text-green-600 mt-1">पृष्ठ पुन: निर्देशित हुँदै...</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="whitespace-pre-line">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
                  >
                    पुन: प्रयास गर्नुहोस्
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full rounded-xl border ${
                  fieldErrors.name 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 disabled:opacity-50`}
                placeholder="तपाईंको नाम लेख्नुहोस्"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                इमेल <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full rounded-xl border ${
                  fieldErrors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 disabled:opacity-50`}
                placeholder="example@email.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                फोन नम्बर
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className={`w-full rounded-xl border ${
                  fieldErrors.phone 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 disabled:opacity-50`}
                placeholder="९८XXXXXXXX"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                विषय <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full rounded-xl border ${
                  fieldErrors.subject 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 disabled:opacity-50`}
                placeholder="तपाईंको सुझावको विषय"
              />
              {fieldErrors.subject && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                सुझाव लेख्नुहोस् <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full rounded-xl border ${
                  fieldErrors.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 resize-none disabled:opacity-50`}
                placeholder="यहाँ आफ्नो सुझाव विस्तृत रूपमा लेख्नुहोस्..."
              />
              {fieldErrors.message && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#8B1A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-1 hover:bg-[#a02020] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  पठाउँदै...
                </span>
              ) : (
                "सुझाव पठाउनुहोस्"
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}