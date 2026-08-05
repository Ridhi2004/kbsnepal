"use client";

import { useState } from "react";

export default function SuggestionPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo alert - replace this with your actual API submission logic
    alert("तपाईंको सुझाव सफलतापूर्वक पठाइएको छ! (Demo mode)");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section id="suggestions" className="relative bg-white py-20 overflow-hidden">
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#8B1A1A]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#8B1A1A]/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
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

        {/* --- SUGGESTION FORM --- */}
        <div className="rounded-3xl border border-[#8B1A1A]/10 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-[#8B1A1A]/5 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                नाम :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#8B1A1A]/20 bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 placeholder:text-gray-400"
                placeholder="तपाईंको नाम लेख्नुहोस्"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                इमेल :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#8B1A1A]/20 bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 placeholder:text-gray-400"
                placeholder="example@email.com"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                फोन नम्बर :
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#8B1A1A]/20 bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 placeholder:text-gray-400"
                placeholder="९८XXXXXXXX"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                विषय :
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#8B1A1A]/20 bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 placeholder:text-gray-400"
                placeholder="तपाईंको सुझावको विषय"
              />
            </div>

            {/* Message / Suggestion Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                सुझाव लेख्नुहोस् :
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#8B1A1A]/20 bg-white/50 px-4 py-3 text-gray-800 outline-none transition-all focus:border-[#8B1A1A] focus:ring-2 focus:ring-[#8B1A1A]/20 placeholder:text-gray-400 resize-none"
                placeholder="यहाँ आफ्नो सुझाव विस्तृत रूपमा लेख्नुहोस्..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#8B1A1A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#8B1A1A]/25 transition-all hover:-translate-y-1 hover:bg-[#a02020] hover:shadow-xl"
            >
              सुझाव पठाउनुहोस्
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}