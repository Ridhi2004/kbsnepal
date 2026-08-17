"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
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
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000';
      const endpoint = `${baseUrl}/api/message/`;
      
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
        setError("सर्भरबाट अमान्य प्रतिक्रिया प्राप्त भयो। कृपया पुन: प्रयास गर्नुहोस्।");
        setLoading(false);
        return;
      }

      if (response.ok && data.success) {
        setSuccess(data.message || "सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।");
        setFormData({ name: "", email: "", message: "" });
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
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
      console.error("❌ Error submitting contact message:", err);
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError(`🔴 ब्याकेन्ड सर्भरसँग जडान हुन सकेन।

कृपया जाँच गर्नुहोस्:

1. ब्याकेन्ड सर्भर चलिरहेको छ:
   python manage.py runserver

2. सही URL:
   ${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'}/api/message/

3. CORS सेटिङ सही छ:
   settings.py मा CORS_ALLOW_ALL_ORIGINS = True

4. आफ्नो ब्राउजरमा यो URL खोल्नुहोस्:
   ${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'}/api/message/`);
        } else {
          setError(err.message);
        }
      } else {
        setError("नेटवर्क समस्या भएको छ। कृपया आफ्नो इन्टरनेट जडान जाँच गर्नुहोस्।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white py-20 overflow-hidden">
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[#8B1A1A]/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1A1A]">
            सम्पर्क गर्नुहोस्
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            हामी कसरी मद्दत गर्न सक्छौं ?
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#8B1A1A] mx-auto rounded-full" />
          <p className="mt-4 max-w-2xl text-gray-500 text-sm">
            हामीलाई आफ्नो सुझाव, प्रश्न वा आवश्यकता पठाउनुहोस्। हामी सधैं तपाईंको सहयोगका लागि तयार छौं।
          </p>
        </div>

        {/* --- GRID: FORM + INFO --- */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* LEFT: CONTACT FORM */}
          <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-[#8B1A1A]/5">
            
            {/* Success Message */}
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

            {/* Error Message */}
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
              
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  सन्देश लेख्नुहोस् <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`w-full rounded-xl border ${
                    fieldErrors.message 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : 'border-[#8B1A1A]/20 focus:border-[#8B1A1A] focus:ring-[#8B1A1A]/20'
                  } bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:ring-2 placeholder:text-gray-400 resize-none disabled:opacity-50`}
                  placeholder="तपाईंको सन्देश यहाँ लेख्नुहोस्..."
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
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
                  "सन्देश पठाउनुहोस्"
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: CONTACT INFORMATION */}
          <div className="flex flex-col gap-6">
            
            <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-[#8B1A1A]/5">
              <h3 className="font-display text-lg font-bold text-[#8B1A1A] mb-6">
                सम्पर्क विवरण
              </h3>
              
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">ठेगाना :</p>
                    <p className="text-sm text-gray-600">टेकु, पचली, काठमाडौं, नेपाल</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">फोन नम्बर :</p>
                    <a href="tel:01-2345678" className="text-sm text-[#8B1A1A] hover:underline">01-2345678</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">इ - मेल :</p>
                    <a href="mailto:info@kbsnepal.org" className="text-sm text-[#8B1A1A] hover:underline">info@kbsnepal.org</a>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA LINKS */}
            <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-6 shadow-xl shadow-[#8B1A1A]/5">
              <p className="text-sm font-medium text-gray-700 mb-3">संजाल :</p>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-all hover:bg-[#8B1A1A] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 22v-8h3l1-4h-4V7.5C13 6.4 13.4 6 14.6 6H17V2.2C16.6 2.1 15.3 2 13.9 2 10.9 2 9 3.8 9 7v3H6v4h3v8h4Z" /></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-all hover:bg-[#8B1A1A] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.2 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.7 3.3 4a4.2 4.2 0 0 1-1.8.1c.5 1.7 2.1 2.9 4 3A8.3 8.3 0 0 1 2 18.6 11.6 11.6 0 0 0 8.3 20.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.4Z" /></svg>
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1A1A]/20 text-[#8B1A1A] transition-all hover:bg-[#8B1A1A] hover:text-white">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1-.5.6-.9 1.1-1.1 1.8-.3.6-.5 1.3-.5 2.4C2 8.9 2 9.3 2 12s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.3.5 2.4.5C8.9 22 9.3 22 12 22s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.5-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-1.1-1.8 4.8 4.8 0 0 0-1.8-1.1c-.6-.3-1.3-.5-2.4-.5C15.1 2 14.7 2 12 2Z" /></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* --- GOOGLE MAPS SECTION --- */}
        <div className="mt-16">
          <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-3 shadow-xl shadow-[#8B1A1A]/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.511933719104!2d85.3162293!3d27.6997576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a04975ad53%3A0x3bd08c5a2a5fe9da!2sTeku%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="नेपाल खुद्रा व्यापार संघ को स्थान - टेकु, काठमाडौं"
            />
          </div>
        </div>

      </div>
    </section>
  );
}