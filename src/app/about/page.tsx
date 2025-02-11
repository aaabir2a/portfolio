import Menu from "../../components/Menu"
import Footer from "../../components/Footer"

const AboutPage = () => {
  // Mock data for team members
  const teamMembers = [
    { id: 1, name: "John Doe", role: "CEO", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Jane Smith", role: "Designer", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Mike Johnson", role: "Developer", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Sarah Brown", role: "Marketing", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Menu />
      <main className="flex-grow">
        {/* About Section */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 mb-8">
            We are a team of passionate designers and developers dedicated to creating beautiful and functional
            websites. Our mission is to help businesses grow their online presence and achieve their goals.
          </p>
          <p className="text-xl text-gray-600">
            With years of experience in the industry, we bring creativity and technical expertise to every project we
            undertake. We believe in collaboration, innovation, and delivering exceptional results to our clients.
          </p>
        </section>

        {/* Team Section */}
        <section className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage

