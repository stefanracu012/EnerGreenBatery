export default function Map() {
  return (
    <section className="w-full h-[60vh] lg:h-[70vh]">
      <iframe
        title="Locația EnerGreenBatery"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2680!2d26.3607287!3d47.579796!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fdea5dfa0263%3A0xa34b832a1a3c7941!2sEnergreenbateryS.R.L.!5e0!3m2!1sro!2sro"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
