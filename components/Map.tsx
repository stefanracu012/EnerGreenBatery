export default function Map() {
  return (
    <section className="w-full h-[60vh] lg:h-[70vh]">
      <iframe
        title="Locația EnerGreenBatery"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.5!2d26.28!3d47.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fc1d1d1d1d1d%3A0x0!2sSat+Reuseni%2C+Comuna+Ude%C8%99ti%2C+Suceava!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </section>
  );
}
