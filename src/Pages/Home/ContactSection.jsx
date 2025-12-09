import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className=" py-10 md:py-20" id="contact">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-red-700">Contact Us</h2>
          <p className="mt-2 text-gray-600">
            Have questions? We're here to help anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white/60 backdrop-blur-xl shadow-xl p-8 rounded-2xl border border-white/40">
            <h3 className="text-2xl font-semibold mb-6 text-red-600">Send a Message</h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
              ></textarea>

              <button className="w-full bg-[#b71b1c] text-white p-3 rounded-lg font-semibold transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/60 backdrop-blur-xl shadow-xl p-8 rounded-2xl border border-white/40">
            <h3 className="text-2xl font-semibold mb-6 text-red-600">Contact Information</h3>

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Phone className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+880123456789</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Mail className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">support@bloodbank.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <MapPin className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">Dhaka, Bangladesh</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
