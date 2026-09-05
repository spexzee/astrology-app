import React from 'react'
import { PageHeader } from '../components/PageHeader'
import styles from './ContactPage.module.css'

export const ContactPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <PageHeader
            eyebrow="Contact"
            title="Get in touch"
            subtitle="Have a question about Vedic Astrology? Send a message."
          />
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.layout}>
            {/* Simple static contact area */}
            <div className={styles.contactBlock}>
              <p className={`t-body-lg ${styles.note}`}>
                For questions, feedback or enquiries about Vedic Astrology, please reach out.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={`t-label ${styles.infoKey}`}>General enquiries</span>
                  <a
                    href="mailto:hello@vedicastrologystudio.com"
                    className={`t-body-md ${styles.infoVal}`}
                  >
                    hello@vedicastrologystudio.com
                  </a>
                </div>
                <div className={styles.infoRow}>
                  <span className={`t-label ${styles.infoKey}`}>Support</span>
                  <a
                    href="mailto:support@vedicastrologystudio.com"
                    className={`t-body-md ${styles.infoVal}`}
                  >
                    support@vedicastrologystudio.com
                  </a>
                </div>
              </div>

              <p className={`t-body-sm ${styles.disclaimer}`}>
                Response times may vary. Please allow a few business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
