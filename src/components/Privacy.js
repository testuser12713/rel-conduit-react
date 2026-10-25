import React from 'react';

const PLACEHOLDER_TEXT = '[To be provided by the client]';
const LAST_UPDATED = 'Oct 25, 2026';

const PlaceholderBadge = () => (
  <span
    className="privacy-placeholder"
    data-testid="placeholder-badge">
    {PLACEHOLDER_TEXT}
  </span>
);

const ProcessingTable = () => {
  const rows = [
    {
      processing: 'Registration and login',
      data: 'E-mail address; password, stored only as a salted hash; authentication token stored in the browser\'s local storage',
      purpose: 'Creating and administering your account and authenticating you on each visit',
      legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
      retention: (
        <React.Fragment>
          For as long as your account exists and afterwards for statutory retention periods. Concrete period: <PlaceholderBadge />
        </React.Fragment>
      ),
      recipients: (
        <React.Fragment>
          No recipients other than the hosting provider. Hosting provider: <PlaceholderBadge />
        </React.Fragment>
      ),
      thirdCountry: (
        <React.Fragment>
          Only through the hosting provider; its locations and any safeguards: <PlaceholderBadge />
        </React.Fragment>
      )
    },
    {
      processing: 'Profile data',
      data: 'Username; profile image URL; bio; follow relationships',
      purpose: 'Providing your public profile and the author and follower features',
      legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
      retention: (
        <React.Fragment>
          For as long as your profile and account exist. Concrete period: <PlaceholderBadge />
        </React.Fragment>
      ),
      recipients: (
        <React.Fragment>
          Other visitors of the public profile pages and the hosting provider: <PlaceholderBadge />
        </React.Fragment>
      ),
      thirdCountry: (
        <React.Fragment>
          Only through the hosting provider; its locations and any safeguards: <PlaceholderBadge />
        </React.Fragment>
      )
    },
    {
      processing: 'Articles, comments and favorites',
      data: 'Article content; comments; favorites; timestamps; reference to the author',
      purpose: 'Publishing articles, commenting on articles and marking favorites',
      legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
      retention: (
        <React.Fragment>
          Until you delete the content or your account; statutory retention periods may apply. Concrete period: <PlaceholderBadge />
        </React.Fragment>
      ),
      recipients: (
        <React.Fragment>
          Publicly visible to visitors of the site and the hosting provider: <PlaceholderBadge />
        </React.Fragment>
      ),
      thirdCountry: (
        <React.Fragment>
          Only through the hosting provider; its locations and any safeguards: <PlaceholderBadge />
        </React.Fragment>
      )
    },
    {
      processing: 'Hosting including server logs with IP address',
      data: 'IP address; date and time of the request; requested URL; HTTP status; transfer volume; user agent; error messages',
      purpose: 'Delivering the application, ensuring technical operation and IT security and troubleshooting errors',
      legalBasis: 'Art. 6(1)(f) GDPR (legitimate interest in the secure operation of the service)',
      retention: (
        <React.Fragment>
          Short-term for security and troubleshooting purposes. Concrete period: <PlaceholderBadge />
        </React.Fragment>
      ),
      recipients: (
        <React.Fragment>
          Hosting provider: <PlaceholderBadge />
        </React.Fragment>
      ),
      thirdCountry: (
        <React.Fragment>
          Locations of the hosting provider and any safeguards: <PlaceholderBadge />
        </React.Fragment>
      )
    }
  ];

  return (
    <div className="privacy-table-wrap">
      <table className="privacy-table">
        <thead>
          <tr>
            <th scope="col">Processing</th>
            <th scope="col">Data</th>
            <th scope="col">Purpose</th>
            <th scope="col">Legal basis</th>
            <th scope="col">Retention</th>
            <th scope="col">Recipients</th>
            <th scope="col">Third country</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.processing} data-testid="processing-row">
              <td data-label="Processing">{row.processing}</td>
              <td data-label="Data">{row.data}</td>
              <td data-label="Purpose">{row.purpose}</td>
              <td data-label="Legal basis">{row.legalBasis}</td>
              <td data-label="Retention">{row.retention}</td>
              <td data-label="Recipients">{row.recipients}</td>
              <td data-label="Third country">{row.thirdCountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const privacyStyles = `
.privacy-page {
  --color-bg: #FFFFFF;
  --color-surface: #F7F7F7;
  --color-surface-hover: #FAFAFA;
  --color-fg: #2B2B2B;
  --color-fg-strong: #1A1A1A;
  --color-muted: #8C8C8C;
  --color-border: #E5E5E5;
  --color-accent: #5CB85C;
  --color-accent-ring: #B8E0B8;
  --color-placeholder-bg: #FFF7E6;
  --color-placeholder-border: #E0B252;
  --color-placeholder-fg: #8A6A1F;
  --space-0: 4px;
  --space-1: 8px;
  --space-2: 12px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --radius-sm: 4px;
  --radius-pill: 999px;
  --font-heading: "Literata", Georgia, "Times New Roman", serif;
  --font-ui: "Inter", system-ui, "Segoe UI", Roboto, Arial, sans-serif;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-ui);
  font-size: 15px;
  line-height: 1.5;
}

.privacy-page *,
.privacy-page *::before,
.privacy-page *::after {
  box-sizing: border-box;
}

.privacy-shell {
  max-width: 1160px;
  margin: 0 auto;
  padding: var(--space-4);
}

.privacy-layout {
  display: block;
}

.privacy-toc {
  margin: 0 0 var(--space-4);
}

.privacy-toc ul {
  display: flex;
  gap: var(--space-0);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
}

.privacy-toc a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--space-2);
  border-left: 2px solid transparent;
  border-radius: var(--radius-pill);
  color: var(--color-muted);
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-decoration: none;
  white-space: nowrap;
  transition: color 120ms ease, background-color 120ms ease;
}

.privacy-toc a:hover {
  color: var(--color-fg);
  background: var(--color-surface);
}

.privacy-toc a:focus-visible {
  outline: 2px solid var(--color-accent-ring);
  outline-offset: 2px;
}

.privacy-intro {
  margin: 0 0 var(--space-5);
  padding: 0 0 var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.privacy-intro h1 {
  margin: 0 0 var(--space-2);
  color: var(--color-fg-strong);
  font-family: var(--font-heading);
  font-size: 26px;
  font-weight: 700;
  line-height: 1.25;
}

.privacy-lead {
  margin: 0 0 var(--space-1);
  font-size: 15px;
  line-height: 1.7;
}

.privacy-updated {
  margin: 0;
  color: var(--color-muted);
  font-size: 12px;
  line-height: 1.5;
}

.privacy-section {
  margin: 0 0 var(--space-5);
  scroll-margin-top: 88px;
}

.privacy-section h2 {
  margin: 0 0 var(--space-2);
  color: var(--color-fg-strong);
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
}

.privacy-section p {
  margin: 0 0 var(--space-2);
  font-size: 15px;
  line-height: 1.7;
}

.privacy-section ul {
  margin: 0 0 var(--space-2);
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.7;
}

.privacy-section li {
  margin-bottom: 6px;
}

.privacy-details {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: var(--space-1) var(--space-4);
  margin: 0;
  font-size: 15px;
}

.privacy-details dt {
  padding-top: 3px;
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-transform: uppercase;
}

.privacy-details dd {
  margin: 0;
  line-height: 1.7;
}

.privacy-placeholder {
  display: inline;
  padding: 2px 8px;
  border: 1px dashed var(--color-placeholder-border);
  border-radius: var(--radius-sm);
  background: var(--color-placeholder-bg);
  color: var(--color-placeholder-fg);
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  white-space: normal;
}

.privacy-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.privacy-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.5;
}

.privacy-table th {
  padding: var(--space-2);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
  vertical-align: bottom;
}

.privacy-table td {
  padding: var(--space-2);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.privacy-table tbody tr:nth-child(even) {
  background: var(--color-surface-hover);
}

@media (max-width: 639px) {
  .privacy-shell {
    padding: var(--space-3);
  }

  .privacy-details {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .privacy-details dt {
    margin-top: var(--space-2);
  }

  .privacy-table {
    display: block;
  }

  .privacy-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .privacy-table tbody,
  .privacy-table tr,
  .privacy-table td {
    display: block;
    width: 100%;
  }

  .privacy-table tbody tr {
    margin-bottom: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
  }

  .privacy-table tbody tr:nth-child(even) {
    background: var(--color-bg);
  }

  .privacy-table td {
    padding: var(--space-2);
    border-bottom: 1px solid var(--color-border);
  }

  .privacy-table td:last-child {
    border-bottom: 0;
  }

  .privacy-table td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: var(--space-0);
    color: var(--color-muted);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.5;
    text-transform: uppercase;
  }
}

@media (min-width: 1024px) {
  .privacy-layout {
    display: flex;
    gap: var(--space-5);
    justify-content: center;
    align-items: flex-start;
  }

  .privacy-toc {
    flex: 0 0 220px;
    position: sticky;
    top: 88px;
    margin: 0;
  }

  .privacy-document {
    flex: 0 1 800px;
    min-width: 0;
  }

  .privacy-toc ul {
    flex-direction: column;
    overflow-x: visible;
  }

  .privacy-toc a {
    border-radius: 0;
    white-space: normal;
  }

  .privacy-toc a:hover,
  .privacy-toc a:focus {
    border-left-color: var(--color-accent);
    color: var(--color-accent);
  }
}
`;

const Privacy = () => (
  <div className="privacy-page">
    <style>{privacyStyles}</style>
    <div className="privacy-shell">
      <div className="privacy-layout">
        <nav className="privacy-toc" aria-label="Table of contents">
          <ul>
            <li><a href="#controller">Controller</a></li>
            <li><a href="#processing-activities">Processing activities</a></li>
            <li><a href="#your-rights">Your rights</a></li>
            <li><a href="#complaints">Complaints</a></li>
          </ul>
        </nav>

        <article className="privacy-document">
          <header className="privacy-intro">
            <h1>Privacy Policy</h1>
            <p className="privacy-lead">
              How this Conduit instance processes personal data and which rights you have.
            </p>
            <p className="privacy-updated">Last updated: {LAST_UPDATED}</p>
          </header>

          <section className="privacy-section" id="controller">
            <h2>Controller</h2>
            <p>
              The controller responsible for the processing described in this notice is the
              operator of this Conduit instance. Its identity and contact details are provided by
              the client and were not supplied with the specification.
            </p>
            <dl className="privacy-details">
              <dt>Controller</dt>
              <dd><PlaceholderBadge /></dd>
              <dt>Postal address</dt>
              <dd><PlaceholderBadge /></dd>
              <dt>E-mail</dt>
              <dd><PlaceholderBadge /></dd>
              <dt>Telephone</dt>
              <dd><PlaceholderBadge /></dd>
            </dl>
          </section>

          <section className="privacy-section" id="processing-activities">
            <h2>Processing activities</h2>
            <p>
              The following table lists every processing operation of this application. Where the
              specification does not supply a fact, the cell carries a visible marker instead of
              invented data.
            </p>
            <ProcessingTable />
          </section>

          <section className="privacy-section" id="your-rights">
            <h2>Your rights</h2>
            <p>
              Under the General Data Protection Regulation you have the following rights regarding
              the personal data processed about you:
            </p>
            <ul>
              <li>Right of access to the personal data stored about you (Art. 15 GDPR).</li>
              <li>Right to rectification of inaccurate or incomplete data (Art. 16 GDPR).</li>
              <li>Right to erasure of your data (Art. 17 GDPR).</li>
              <li>Right to restriction of processing (Art. 18 GDPR).</li>
              <li>Right to data portability (Art. 20 GDPR).</li>
              <li>Right to object to processing based on legitimate interests (Art. 21 GDPR).</li>
            </ul>
            <p>
              To exercise any of these rights, contact the controller using the contact details in
              the controller section above.
            </p>
          </section>

          <section className="privacy-section" id="complaints">
            <h2>Complaints</h2>
            <p>
              You have the right to lodge a complaint with a supervisory authority if you believe
              that the processing of your personal data violates data protection law. The
              supervisory authority responsible for this controller is provided by the client and
              was not supplied with the specification.
            </p>
            <dl className="privacy-details">
              <dt>Supervisory authority</dt>
              <dd><PlaceholderBadge /></dd>
              <dt>Address</dt>
              <dd><PlaceholderBadge /></dd>
            </dl>
          </section>
        </article>
      </div>
    </div>
  </div>
);

export default Privacy;
