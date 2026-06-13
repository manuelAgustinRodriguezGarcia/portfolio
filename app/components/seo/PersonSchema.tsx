import { CONTACT, PERSON } from "@/app/data/site";

export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "#person",
        name: PERSON.name,
        jobTitle: "Fullstack Developer",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barracas",
          addressRegion: "CABA",
          addressCountry: "AR",
        },
        sameAs: [CONTACT.linkedin, CONTACT.github],
        image: PERSON.avatar,
      },
      {
        "@type": "ProfilePage",
        "@id": "#profilepage",
        mainEntity: { "@id": "#person" },
        name: `${PERSON.name} — Portfolio`,
        description:
          "Portfolio de Manuel Rodriguez Garcia — Desarrollador Fullstack. Interfaces modernas, React, TypeScript, Next.js.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
