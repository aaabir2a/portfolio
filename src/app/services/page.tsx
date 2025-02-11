import Menu from "../../components/Menu"
import Footer from "../../components/Footer"

const ServicesPage = () => {
  // Mock data for services
  const services = [
    {
      id: 1,
      title: "Web Design",
      description: "We create beautiful and user-friendly websites tailored to your needs.",
    },
    {
      id: 2,
      title: "Web Development",
      description: "Our expert developers build robust and scalable web applications.",
    },
    {
      id: 3,
      title: "SEO Optimization",
      description: "We help improve your website's visibility in search engine results.",
    },
    {
      id: 4,
      title: "Content Creation",
      description: "Our team creates engaging content to attract and retain your audience.",
    },
    {
      id: 5,
      title: "E-commerce Solutions",
      description: "We develop secure and efficient online stores for your business.",
    },
    {
      id: 6,
      title: "Maintenance and Support",
      description: "We provide ongoing maintenance and support for your website.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ServicesPage

