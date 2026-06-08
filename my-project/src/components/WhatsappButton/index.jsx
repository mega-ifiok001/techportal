const WHATSAPP_NUMBER = "234XXXXXXXXXX";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi, I would like to make an enquiry."
      )}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

      {/* Button */}
      <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300">
        <i className="fa-brands fa-whatsapp text-white text-2xl"></i>
      </div>
    </a>
  );
}