import React from 'react';

const PlaceholderBadge = () => (
  <span className="privacy-placeholder">[To be provided by the client]</span>
);

const processingRows = [
  {
    key: 'registration',
    processing: 'Registration and login',
    data: 'E-mail address; password (only the hashed password is stored)',
    purpose: 'Creating the user account and authenticating sign-in',
    legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
    retention: (
      <React.Fragment>
        While the account exists, and for the deletion period after the account is removed:{' '}
        <PlaceholderBadge />
      </React.Fragment>
    ),
    recipients: (
      <React.Fragment>
        Hosting provider (processor): <PlaceholderBadge />
      </React.Fragment>
    ),
    thirdCountry: <PlaceholderBadge />
  },
  {
    key: 'profile',
    processing: 'Profile data',
    data: 'Username, profile image and short bio',
    purpose: 'Public user profile and attribution of published content',
    legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
    retention: (
      <React.Fragment>
        While the account exists, and for the deletion period after the account is removed:{' '}
        <PlaceholderBadge />
      </React.Fragment>
    ),
    recipients: 'Visible to all visitors of the website',
    thirdCountry: <PlaceholderBadge />
  },
  {
    key: 'content',
    processing: 'Articles, comments and favorites',
    data: 'Article text, tags, comments, favorites, author name and timestamps',
    purpose: 'Publishing and discussing articles and saving favorite articles',
    legalBasis: 'Art. 6(1)(b) GDPR (performance of a contract)',
    retention: (
      <React.Fragment>
        Until the content or the account is deleted; the concrete deletion period is:{' '}
        <PlaceholderBadge />
      </React.Fragment>
    ),
    recipients: 'Published articles, comments and favorites are visible to all visitors of the website',
    thirdCountry: <PlaceholderBadge />
  },
  {
    key: 'hosting',
    processing: 'Hosting including server logs',
    data: 'IP address, requested URL, date and time, user agent and response status code',
    purpose: 'Delivering the website, ensuring IT security and troubleshooting',
    legalBasis: 'Art. 6(1)(f) GDPR (legitimate interests in secure and stable operation)',
    retention: (
      <React.Fragment>
        Server log retention period: <PlaceholderBadge />
      </React.Fragment>
    ),
    recipients: (
      <React.Fragment>
        Hosting provider: <PlaceholderBadge />
      </React.Fragment>
    ),
    thirdCountry: <PlaceholderBadge />
  }
];

const sections = [
  { id: 'controller', label: 'Controller' },
  { id: 'processing', label: 'Processing operations' },
  { id: 'rights', label: 'Your rights' },
  { id: 'complaint', label: 'Complaint' }
];

const dataSubjectRights = [
  {
    name: 'Access',
    article: 'Art. 15 GDPR',
    description: 'You can request confirmation as to whether personal data concerning you is processed and receive a copy of that data.'
  },
  {
    name: 'Rectification',
    article: 'Art. 16 GDPR',
    description: 'You can request the correction of inaccurate personal data and the completion of incomplete data.'
  },
  {
    name: 'Erasure',
    article: 'Art. 17 GDPR',
    description: 'You can request the deletion of your personal data where the legal requirements are met.'
  },
  {
    name: 'Restriction',
    article: 'Art. 18 GDPR',
    description: 'You can request the restriction of processing where the legal requirements are met.'
  },
  {
    name: 'Portability',
    article: 'Art. 20 GDPR',
    description: 'You can receive the personal data you provided in a structured, commonly used and machine-readable format and have it transmitted to another controller where the legal requirements are met.'
  },
  {
    name: 'Objection',
    article: 'Art. 21 GDPR',
    description: 'You can object at any time to processing that is based on legitimate interests. We will then stop processing unless compelling legitimate grounds override your objection.'
  }
];

const collectErrors = errors => {
  if (!errors) {
    return [];
  }
  return Object.keys(errors).reduce((messages, field) => {
    const value = errors[field];
    const fieldMessages = Array.isArray(value) ? value : [value];
    return messages.concat(
      fieldMessages
        .filter(message => message !== null && message !== undefined)
        .map(message => `${field} ${message}`)
    );
  }, []);
};

const Privacy = props => {
  const errors = collectErrors(props.errors);

  return (
    <div className="privacy-page">
      <style>{privacyStyles}</style>
      <div className="privacy-container">
        {errors.length > 0 && (
          <ul className="privacy-errors" role="alert">
            {errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        )}
        <div className="privacy-layout">
          <nav className="privacy-toc" aria-label="On this page">
            <p className="privacy-toc-title">On this page</p>
            <ul>
              {sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="privacy-document">
            <section className="privacy-intro">
              <h1>Privacy Policy</h1>
              <p className="privacy-lead">
                How this website processes personal data and which rights you have.
              </p>
              <p className="privacy-updated">
                Last updated: <PlaceholderBadge />
              </p>
            </section>

            <section id="controller" className="privacy-section">
              <h2>Controller</h2>
              <p>
                The controller responsible for the processing described in this privacy policy is:
              </p>
              <dl className="privacy-details">
                <div className="privacy-detail">
                  <dt>Name and address</dt>
                  <dd><PlaceholderBadge /></dd>
                </div>
                <div className="privacy-detail">
                  <dt>Contact (e-mail and telephone)</dt>
                  <dd><PlaceholderBadge /></dd>
                </div>
              </dl>
            </section>

            <section id="processing" className="privacy-section">
              <h2>Processing operations</h2>
              <p>
                Personal data is processed only for the following purposes. The table names the
                data concerned, the purpose, the legal basis, the storage period, the recipients
                and any transfer to a third country for each processing operation.
              </p>
              <div className="privacy-table-wrap">
                <table className="privacy-table">
                  <caption className="privacy-caption">
                    Overview of the processing operations of this website
                  </caption>
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
                    {processingRows.map(row => (
                      <tr key={row.key}>
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
            </section>

            <section id="rights" className="privacy-section">
              <h2>Your rights</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul>
                {dataSubjectRights.map(right => (
                  <li key={right.name}>
                    <strong>{right.name} ({right.article})</strong>: {right.description}
                  </li>
                ))}
              </ul>
              <p>
                To exercise these rights, contact the controller at the contact address above.
              </p>
            </section>

            <section id="complaint" className="privacy-section">
              <h2>Right to complain to a supervisory authority</h2>
              <p>
                You have the right to lodge a complaint with a data protection supervisory
                authority, in particular in the Member State of your habitual residence, place
                of work or the place of the alleged infringement.
              </p>
              <p>
                Name and address of the supervisory authority responsible for the controller:{' '}
                <PlaceholderBadge />
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const privacyStyles = `
.privacy-page {
  --privacy-bg: #FFFFFF;
  --privacy-surface: #F7F7F7;
  --privacy-surface-hover: #FAFAFA;
  --privacy-fg: #2B2B2B;
  --privacy-fg-strong: #1A1A1A;
  --privacy-muted: #8C8C8C;
  --privacy-border: #E5E5E5;
  --privacy-accent: #5CB85C;
  --privacy-accent-ring: #B8E0B8;
  --privacy-danger: #C0392B;
  --privacy-space-1: 8px;
  --privacy-space-2: 12px;
  --privacy-space-3: 16px;
  --privacy-space-4: 24px;
  --privacy-space-5: 32px;
  --privacy-space-6: 48px;
  --privacy-radius-sm: 4px;
  background: var(--privacy-bg);
  color: var(--privacy-fg);
  font-family: "Inter", system-ui, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
}

.privacy-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: var(--privacy-space-6) var(--privacy-space-4);
}

.privacy-layout {
  display: grid;
  grid-template-columns: minmax(0, 800px);
  justify-content: center;
  gap: var(--privacy-space-5);
}

.privacy-toc {
  min-width: 0;
}

.privacy-toc-title {
  margin: 0 0 var(--privacy-space-1);
  color: var(--privacy-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.privacy-toc ul {
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0 0 var(--privacy-space-1);
  overflow-x: auto;
  list-style: none;
}

.privacy-toc li {
  flex: 0 0 auto;
}

.privacy-toc a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 var(--privacy-space-2);
  border-left: 2px solid transparent;
  color: var(--privacy-muted);
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.privacy-toc a:hover {
  color: var(--privacy-fg);
}

.privacy-toc a:focus {
  border-left-color: var(--privacy-accent);
  color: var(--privacy-accent);
}

.privacy-toc a:focus-visible {
  outline: 2px solid var(--privacy-accent-ring);
  outline-offset: 2px;
}

.privacy-document {
  min-width: 0;
}

.privacy-intro h1 {
  margin: 0 0 var(--privacy-space-1);
  color: var(--privacy-fg-strong);
  font-family: "Literata", Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.25;
}

.privacy-lead {
  margin: 0 0 var(--privacy-space-1);
  color: var(--privacy-muted);
}

.privacy-updated {
  margin: 0 0 var(--privacy-space-5);
  color: var(--privacy-muted);
  font-size: 13px;
}

.privacy-section {
  margin-bottom: var(--privacy-space-5);
  scroll-margin-top: 88px;
}

.privacy-section h2 {
  margin: 0 0 var(--privacy-space-2);
  color: var(--privacy-fg-strong);
  font-family: "Literata", Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
}

.privacy-section p {
  margin: 0 0 var(--privacy-space-2);
}

.privacy-section ul {
  margin: 0 0 var(--privacy-space-2);
  padding-left: 20px;
}

.privacy-section li {
  margin-bottom: var(--privacy-space-1);
}

.privacy-details {
  display: grid;
  gap: var(--privacy-space-2);
  margin: 0;
}

.privacy-detail {
  display: grid;
  gap: 2px;
}

.privacy-detail dt {
  color: var(--privacy-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.privacy-detail dd {
  margin: 0;
}

.privacy-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.privacy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
}

.privacy-caption {
  padding-bottom: var(--privacy-space-1);
  color: var(--privacy-muted);
  font-size: 13px;
  text-align: left;
}

.privacy-table th {
  padding: var(--privacy-space-2);
  background: var(--privacy-surface);
  color: var(--privacy-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  text-align: left;
  text-transform: uppercase;
}

.privacy-table td {
  padding: var(--privacy-space-2);
  border-bottom: 1px solid var(--privacy-border);
  vertical-align: top;
}

.privacy-table tbody tr:nth-child(even) {
  background: var(--privacy-surface-hover);
}

.privacy-placeholder {
  display: inline-block;
  padding: 2px var(--privacy-space-1);
  border: 1px dashed #E0B252;
  border-radius: var(--privacy-radius-sm);
  background: #FFF7E6;
  color: #8A6A1F;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.privacy-errors {
  margin: 0 0 var(--privacy-space-3);
  padding: var(--privacy-space-1) var(--privacy-space-2);
  border: 1px solid #F0C8C2;
  border-radius: var(--privacy-radius-sm);
  background: #FDF3F2;
  color: var(--privacy-danger);
  font-size: 13px;
  list-style: none;
}

@media (min-width: 1024px) {
  .privacy-layout {
    grid-template-columns: 200px minmax(0, 800px);
    gap: var(--privacy-space-6);
    align-items: start;
  }

  .privacy-toc {
    position: sticky;
    top: 88px;
  }

  .privacy-toc ul {
    display: block;
    overflow: visible;
    padding-bottom: 0;
  }

  .privacy-toc a {
    display: flex;
    width: 100%;
  }
}

@media (max-width: 639px) {
  .privacy-container {
    padding: var(--privacy-space-5) var(--privacy-space-3);
  }

  .privacy-table {
    min-width: 0;
  }

  .privacy-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .privacy-table,
  .privacy-table tbody,
  .privacy-table tr,
  .privacy-table td {
    display: block;
    width: 100%;
  }

  .privacy-table tr {
    padding: var(--privacy-space-2) 0;
    border-bottom: 1px solid var(--privacy-border);
    background: var(--privacy-bg) !important;
  }

  .privacy-table td {
    padding: 4px 0;
    border: 0;
  }

  .privacy-table td::before {
    display: block;
    margin-bottom: 2px;
    color: var(--privacy-muted);
    content: attr(data-label);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
}
`;

export default Privacy;
