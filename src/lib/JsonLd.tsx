export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "HackToast",
          "url": "https://hacktoast.com",
          "logo": "https://hacktoast.com/logo.png",
          "description": "Professional web development and digital solutions provider specializing in custom websites, SEO, and UI/UX design.",
          "services": [
            "Custom Website Development",
            "Search Engine Optimization (SEO)",
            "Web-Based Solutions",
            "Rapid Website Development",
            "Creative UI/UX Design"
          ],
          "sameAs": [
            "https://www.linkedin.com/company/hacktoast",
            // Add other social media links
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Custom Website Development",
                "description": "Tailored solutions that reflect your unique brand identity and business goals"
              },
              {
                "@type": "Offer",
                "name": "Search Engine Optimization",
                "description": "Comprehensive SEO strategies to improve your website's visibility"
              },
              {
                "@type": "Offer",
                "name": "UI/UX Design",
                "description": "Eye-catching and user-friendly designs that engage visitors"
              }
            ]
          }
        })
      }}
    />
  )
} 