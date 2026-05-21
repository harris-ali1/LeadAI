import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, ArrowLeft } from "lucide-react";

// Termly-generated policy, with these fixes applied:
//   - Company name: TaskIQ throughout (was inconsistent with LeadIQ)
//   - All __________ blanks filled in (contact email + site URL)
//   - Cookie policy URL updated to taskiq.dev/cookie-policy
//   - Removed the "targeted advertising" bullet (you don't run ads, so leaving
//     it in would create false claims about data use)
//   - Updated site URL from the Vercel preview URL to taskiq.dev

export default function PrivacyPolicy() {
  // Scroll to top on mount — standard SPA pattern when navigating to a new route.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl border border-line bg-white text-black">
              <Bot size={18} />
            </div>
            <span className="text-sm font-semibold text-white">TaskIQ</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-10 border-b border-line pb-8">
          <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated May 21, 2026</p>
        </div>

        {/* Policy body */}
        <article className="space-y-8 text-[15px] leading-7 text-zinc-300">

          {/* Intro */}
          <section>
            <P>
              This Privacy Notice for TaskIQ ("we," "us," or "our") describes how and why we
              might access, collect, store, use, and/or share ("process") your personal
              information when you use our services ("Services"), including when you:
            </P>
            <UL>
              <li>Visit our website at <A href="https://taskiq.dev">https://taskiq.dev</A> or any website of ours that links to this Privacy Notice</li>
              <li>Use TaskIQ. Our AI automation service helps local businesses respond to inquiries instantly so they never miss a call or text. Visitors can book a demo, contact us via our form, or message us on Instagram.</li>
              <li>Engage with us in other related ways, including any marketing or events</li>
            </UL>
            <P>
              <Strong>Questions or concerns?</Strong> Reading this Privacy Notice will help you
              understand your privacy rights and choices. We are responsible for making decisions
              about how your personal information is processed. If you do not agree with our
              policies and practices, please do not use our Services. If you still have any
              questions or concerns, please contact us at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>.
            </P>
          </section>

          {/* Summary of Key Points */}
          <section>
            <H2>Summary of Key Points</H2>
            <P className="italic text-zinc-400">
              This summary provides key points from our Privacy Notice. Use the table of contents
              below to find more details on any topic.
            </P>
            <UL>
              <li><Strong>What personal information do we process?</Strong> When you visit or use our Services, we may process personal information depending on how you interact with us. We collect names and email addresses submitted through our contact form.</li>
              <li><Strong>Do we process any sensitive personal information?</Strong> No. We do not process sensitive personal information.</li>
              <li><Strong>Do we collect any information from third parties?</Strong> No. We do not collect information from third parties.</li>
              <li><Strong>How do we process your information?</Strong> We process your information to provide and improve our Services, communicate with you, and comply with law.</li>
              <li><Strong>In what situations and with which parties do we share personal information?</Strong> We may share information in specific situations and with specific third parties.</li>
              <li><Strong>How do we keep your information safe?</Strong> We have organizational and technical processes in place. However, no electronic transmission can be guaranteed 100% secure.</li>
              <li><Strong>What are your rights?</Strong> Depending on your location, applicable privacy law may grant you certain rights regarding your personal information.</li>
            </UL>
          </section>

          {/* Table of Contents */}
          <section>
            <H2>Table of Contents</H2>
            <ol className="space-y-1 pl-4 text-sm">
              {[
                "What information do we collect?",
                "How do we process your information?",
                "What legal bases do we rely on to process your personal information?",
                "When and with whom do we share your personal information?",
                "Do we use cookies and other tracking technologies?",
                "Do we offer artificial intelligence-based products?",
                "How long do we keep your information?",
                "How do we keep your information safe?",
                "Do we collect information from minors?",
                "What are your privacy rights?",
                "Controls for do-not-track features",
                "Do United States residents have specific privacy rights?",
                "Do we make updates to this notice?",
                "How can you contact us about this notice?",
                "How can you review, update, or delete the data we collect from you?"
              ].map((item, i) => (
                <li key={i} className="text-zinc-400">
                  <span className="text-zinc-500">{i + 1}. </span>{item}
                </li>
              ))}
            </ol>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <H2>1. What Information Do We Collect?</H2>
            <H3>Personal information you disclose to us</H3>
            <InShort>We collect personal information that you provide to us.</InShort>
            <P>
              We collect personal information that you voluntarily provide to us when you express
              an interest in obtaining information about us or our products and Services, when
              you participate in activities on the Services, or otherwise when you contact us.
            </P>
            <P>
              <Strong>Personal Information Provided by You.</Strong> The personal information that
              we collect depends on the context of your interactions with us and the Services, the
              choices you make, and the products and features you use. The personal information
              we collect may include:
            </P>
            <UL>
              <li>names</li>
              <li>email addresses</li>
            </UL>
            <P>
              <Strong>Sensitive Information.</Strong> We do not process sensitive information.
            </P>
            <P>
              All personal information that you provide to us must be true, complete, and
              accurate, and you must notify us of any changes to such personal information.
            </P>
          </section>

          {/* 2. How We Process */}
          <section>
            <H2>2. How Do We Process Your Information?</H2>
            <InShort>
              We process your information to provide, improve, and administer our Services,
              communicate with you, for security and fraud prevention, and to comply with law.
            </InShort>
            <P>We process your personal information for a variety of reasons, including:</P>
            <UL>
              <li><Strong>To deliver and facilitate delivery of services to the user.</Strong> We may process your information to provide you with the requested service.</li>
              <li><Strong>To respond to user inquiries/offer support to users.</Strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
              <li><Strong>To send administrative information to you.</Strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
              <li><Strong>To protect our Services.</Strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
              <li><Strong>To evaluate and improve our Services, products, marketing, and your experience.</Strong> We may process your information to identify usage trends, determine the effectiveness of our promotional campaigns, and evaluate and improve our Services.</li>
              <li><Strong>To comply with our legal obligations.</Strong> We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
            </UL>
          </section>

          {/* 3. Legal Bases */}
          <section>
            <H2>3. What Legal Bases Do We Rely on to Process Your Information?</H2>
            <InShort>
              We only process your personal information when we believe it is necessary and we
              have a valid legal reason to do so under applicable law.
            </InShort>
            <P>If you are located in Canada, this section applies to you.</P>
            <P>
              We may process your information if you have given us specific permission (i.e.,
              express consent) to use your personal information for a specific purpose, or in
              situations where your permission can be inferred (i.e., implied consent). You can
              withdraw your consent at any time.
            </P>
            <P>
              In some exceptional cases, we may be legally permitted under applicable law to
              process your information without your consent, including for example: investigations
              and fraud detection and prevention; business transactions provided certain
              conditions are met; if disclosure is required to comply with a subpoena, warrant,
              court order, or rules of the court; or if the information is publicly available and
              is specified by the regulations.
            </P>
          </section>

          {/* 4. Sharing */}
          <section>
            <H2>4. When and With Whom Do We Share Your Personal Information?</H2>
            <InShort>
              We may share information in specific situations described in this section and/or
              with the following third parties.
            </InShort>
            <P>We may need to share your personal information in the following situations:</P>
            <UL>
              <li><Strong>Business Transfers.</Strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </UL>
          </section>

          {/* 5. Cookies */}
          <section>
            <H2>5. Do We Use Cookies and Other Tracking Technologies?</H2>
            <InShort>
              We may use cookies and other tracking technologies to collect and store your
              information.
            </InShort>
            <P>
              We may use cookies and similar tracking technologies (like web beacons and pixels)
              to gather information when you interact with our Services. Some online tracking
              technologies help us maintain the security of our Services, prevent crashes, fix
              bugs, save your preferences, and assist with basic site functions.
            </P>
            <P>
              Specific information about how we use such technologies and how you can refuse
              certain cookies is set out in our Cookie Notice:{" "}
              <A href="https://taskiq.dev/cookie-policy">https://taskiq.dev/cookie-policy</A>.
            </P>
          </section>

          {/* 6. AI */}
          <section>
            <H2>6. Do We Offer Artificial Intelligence-Based Products?</H2>
            <InShort>
              We offer products, features, or tools powered by artificial intelligence, machine
              learning, or similar technologies.
            </InShort>
            <P>
              As part of our Services, we offer products, features, or tools powered by artificial
              intelligence, machine learning, or similar technologies (collectively, "AI
              Products"). These tools are designed to enhance your experience and provide you with
              innovative solutions. The terms in this Privacy Notice govern your use of the AI
              Products within our Services.
            </P>
            <H3>Use of AI Technologies</H3>
            <P>
              We provide the AI Products through third-party service providers ("AI Service
              Providers"), including Google Cloud AI. Your input, output, and personal information
              will be shared with and processed by these AI Service Providers to enable your use
              of our AI Products. You must not use the AI Products in any way that violates the
              terms or policies of any AI Service Provider.
            </P>
            <H3>Our AI Products</H3>
            <P>Our AI Products are designed for the following functions:</P>
            <UL>
              <li>AI automation</li>
            </UL>
            <H3>How We Process Your Data Using AI</H3>
            <P>
              All personal information processed using our AI Products is handled in line with
              our Privacy Notice and our agreement with third parties.
            </P>
          </section>

          {/* 7. Retention */}
          <section>
            <H2>7. How Long Do We Keep Your Information?</H2>
            <InShort>
              We keep your information for as long as necessary to fulfill the purposes outlined
              in this Privacy Notice unless otherwise required by law.
            </InShort>
            <P>
              We will only keep your personal information for as long as it is necessary for the
              purposes set out in this Privacy Notice, unless a longer retention period is
              required or permitted by law (such as tax, accounting, or other legal requirements).
            </P>
            <P>
              When we have no ongoing legitimate business need to process your personal
              information, we will either delete or anonymize such information, or, if this is
              not possible (for example, because your personal information has been stored in
              backup archives), then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </P>
          </section>

          {/* 8. Safety */}
          <section>
            <H2>8. How Do We Keep Your Information Safe?</H2>
            <InShort>
              We aim to protect your personal information through a system of organizational and
              technical security measures.
            </InShort>
            <P>
              We have implemented appropriate and reasonable technical and organizational security
              measures designed to protect the security of any personal information we process.
              However, despite our safeguards, no electronic transmission over the Internet or
              information storage technology can be guaranteed to be 100% secure. You should only
              access the Services within a secure environment.
            </P>
          </section>

          {/* 9. Minors */}
          <section>
            <H2>9. Do We Collect Information From Minors?</H2>
            <InShort>
              We do not knowingly collect data from or market to children under 18 years of age.
            </InShort>
            <P>
              We do not knowingly collect, solicit data from, or market to children under 18 years
              of age, nor do we knowingly sell such personal information. By using the Services,
              you represent that you are at least 18 or that you are the parent or guardian of
              such a minor and consent to such minor dependent's use of the Services. If we learn
              that personal information from users less than 18 years of age has been collected,
              we will take reasonable measures to promptly delete such data from our records. If
              you become aware of any data we may have collected from children under age 18,
              please contact us at <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>.
            </P>
          </section>

          {/* 10. Privacy Rights */}
          <section>
            <H2>10. What Are Your Privacy Rights?</H2>
            <InShort>
              Depending on your state of residence in the US or in some regions, such as Canada,
              you have rights that allow you greater access to and control over your personal
              information.
            </InShort>
            <P>
              In some regions (like Canada), you have certain rights under applicable data
              protection laws. These may include the right (i) to request access and obtain a
              copy of your personal information, (ii) to request rectification or erasure; (iii)
              to restrict the processing of your personal information; (iv) if applicable, to
              data portability; and (v) not to be subject to automated decision-making. In certain
              circumstances, you may also have the right to object to the processing of your
              personal information.
            </P>
            <P>
              <Strong>Withdrawing your consent:</Strong> If we are relying on your consent to
              process your personal information, you have the right to withdraw your consent at
              any time by contacting us.
            </P>
            <P>
              If you have questions or comments about your privacy rights, you may email us at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>.
            </P>
          </section>

          {/* 11. Do-Not-Track */}
          <section>
            <H2>11. Controls for Do-Not-Track Features</H2>
            <P>
              Most web browsers include a Do-Not-Track ("DNT") feature you can activate to signal
              your privacy preference not to have data about your online browsing activities
              monitored and collected. At this stage, no uniform technology standard for
              recognizing and implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals.
            </P>
          </section>

          {/* 12. US State Rights */}
          <section>
            <H2>12. Do United States Residents Have Specific Privacy Rights?</H2>
            <InShort>
              If you are a resident of California, Colorado, Connecticut, Delaware, Florida,
              Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New
              Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have
              rights to access, correct, delete, or obtain a copy of your personal information.
            </InShort>
            <H3>Your Rights</H3>
            <UL>
              <li>Right to know whether or not we are processing your personal data</li>
              <li>Right to access your personal data</li>
              <li>Right to correct inaccuracies in your personal data</li>
              <li>Right to request the deletion of your personal data</li>
              <li>Right to obtain a copy of the personal data you previously shared with us</li>
              <li>Right to non-discrimination for exercising your rights</li>
              <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling</li>
            </UL>
            <P>
              We have not disclosed, sold, or shared any personal information to third parties
              for a business or commercial purpose in the preceding twelve (12) months. We will
              not sell or share personal information in the future belonging to website visitors,
              users, and other consumers.
            </P>
            <H3>How to Exercise Your Rights</H3>
            <P>
              To exercise these rights, you can contact us by emailing us at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>, or by visiting{" "}
              <A href="https://taskiq.dev">taskiq.dev</A> and using the contact form in the
              top-right corner.
            </P>
            <H3>Appeals</H3>
            <P>
              Under certain US state data protection laws, if we decline to take action regarding
              your request, you may appeal our decision by emailing us at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>. We will inform you
              in writing of any action taken or not taken in response to the appeal.
            </P>
          </section>

          {/* 13. Updates */}
          <section>
            <H2>13. Do We Make Updates to This Notice?</H2>
            <InShort>Yes, we will update this notice as necessary to stay compliant with relevant laws.</InShort>
            <P>
              We may update this Privacy Notice from time to time. The updated version will be
              indicated by an updated "Last updated" date at the top of this Privacy Notice. If
              we make material changes to this Privacy Notice, we may notify you either by
              prominently posting a notice of such changes or by directly sending you a
              notification.
            </P>
          </section>

          {/* 14. Contact */}
          <section>
            <H2>14. How Can You Contact Us About This Notice?</H2>
            <P>If you have questions or comments about this notice, you may contact us by post at:</P>
            <div className="rounded-2xl border border-line bg-white/[0.04] p-4 text-sm text-zinc-300">
              <p className="font-medium text-white">TaskIQ</p>
              <p>Four Corners</p>
              <p>Houston, TX 77498</p>
              <p>United States</p>
            </div>
            <P>
              Or by email at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>.
            </P>
          </section>

          {/* 15. Review/Update/Delete */}
          <section>
            <H2>15. How Can You Review, Update, or Delete the Data We Collect From You?</H2>
            <P>
              Based on the applicable laws of your country or state of residence, you may have
              the right to request access to the personal information we collect from you, details
              about how we have processed it, correct inaccuracies, or delete your personal
              information. To request to review, update, or delete your personal information,
              please email us at{" "}
              <A href="mailto:techiq7619@gmail.com">techiq7619@gmail.com</A>.
            </P>
          </section>

        </article>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-line bg-black/40">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} TaskIQ · Built in Texas</p>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span className="text-zinc-700">·</span>
            <a href="mailto:techiq7619@gmail.com" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Tiny styled helpers — keep paragraph/heading rhythm consistent ────────

function P({ children, className = "" }) {
  return <p className={`leading-7 ${className}`}>{children}</p>;
}

function H2({ children }) {
  return <h2 className="mb-3 mt-2 text-2xl font-semibold text-white">{children}</h2>;
}

function H3({ children }) {
  return <h3 className="mb-2 mt-4 text-lg font-medium text-white">{children}</h3>;
}

function UL({ children }) {
  return <ul className="ml-5 list-disc space-y-2 text-zinc-300">{children}</ul>;
}

function A({ href, children }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="text-emerald-400 underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function Strong({ children }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function InShort({ children }) {
  return (
    <p className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm italic leading-6 text-zinc-400">
      <span className="font-semibold not-italic text-zinc-300">In Short: </span>
      {children}
    </p>
  );
}