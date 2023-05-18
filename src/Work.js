import Card from './Card';
import dce from './images/dce.png';
import wado from './images/wado.png';
import eniac from './images/eniac.png';
import beaver from './images/beaver.png';
import broad from './images/Fig1_projectoutline.tiff';
import gbstem from './images/penguin.png';
import ssp from './images/orbitviz_1.png';
import bhs from './images/bhs.jpg';


function Work() {
  return (
    <div>
      <div style={{ marginLeft: '20%', marginRight: '20%' }}>
        <p>Please hover over any of the blocks below to learn more about
          my projects and organizations. You can also find my resume <a
            href='https://docs.google.com/document/d/e/2PACX-1vROVaHFw7SYKHYthJJXxSv4QumRTgY4nsAb6YGDGmdSqkqvu6c3dkkScQHx1oofALhNBTnON3n_frem/pub'
            target='_blank' rel="noreferrer"
          >here</a>.</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center">

        <Card
          title="Harvard Division of Continuing Education"
          description="Developed educational technology apps as an EdTech Software Engineering Intern"
          longDescription="As an EdTech software engineering intern, I wrote TypeScript code that integrated
          with Canvas API to allow professors to easily migrate courses between semesters.
          I developed UI in React, allowing teachers to select which course and which items from that course they
          want to migrate.
          I conducted thorough unit testing with React Testing Library to ensure front-end components work correctly"
          image={dce}
          color='pink'
        />

        <Card
          title="Wado"
          description="Built a mobile app for Android and iOS (using React Native) that allows college students to share and
          find events on campus."
          longDescription="I built a mobile app for Android and iOS (using React Native) that allows college
          students to share and find events on campus.
          I integrated with Google Maps and Apple Maps API to create an interactive map showing all events
          happening.
          I wrote efficient memory-saving code that allows users to search, filter, star, and archive through
          hundreds of different events.
          The app authenticated users using their Google account and securely stored user data in Google Cloud’s
          Firebase.
          I incorporated push notifications into the app so users are notified when events are happening near them.
          I published the app on the Apple App Store and Google Play and marketed the app on my college campus."
          image={wado}
        />

        <Card

          title="Eniac"
          description="Lead software engineer for a journaling app"
          longDescription="In my role, I used natural language processing (with NLTK) on journal entries
          submitted by users to provide journal sentiment insights.
          I integrated with Python Twilio API to create a fluid and natural texting experience for the user to
          submit journal entries.
          I developed UI such as a weekly summary, badges earned modal, and a heatmap of their mood over time.
          I created a Django MySQL database to store user profile information and user journal entries."
          image={eniac}
          color='#43c1f7'
        />



        <Card
          title="Polypharmacology Latent Spaces"
          description="Computational biology research intern at the Broad Institute of MIT and Harvard"
          longDescription="Predicted compound mechanisms from cell morphology readouts using variational
          autoencoder latent space arithmetic.
          Trained deep learning model (Tensorflow and Keras) and interpreted results using data science (Pandas,
          NumPy, MatPlotLib).
          Published research paper (as first author) in PLOS Computational Biology
          (https://doi.org/10.1371/journal.pcbi.1009888)."
          image={broad}
        />

        <Card
          title="gbSTEM"
          description="Founder and Director of STEM education non-profit that has taught over 1000 students in the Greater
          Boston Area"
          longDescription="Established a registered 501(c)3 non-profit that provides free STEM enrichment to
          elementary and middle school students.
          Managed a team of 30 people with leadership roles in the organization and led weekly team meetings.
          Developed computer science curricula for Scratch, Python, Java, HTML + CSS.
          Coordinated and led training sessions, orientation, and hackathons for over 1000 students taught by more than 300
          instructors."
          image={gbstem}
          color='lightblue'
        />

        <Card
          title="Summer Science Program"
          description="Student astrophysics researcher"
          longDescription="Remotely operated a research-grade telescope to take images of the near-earth
          asteroid 1994 LY.
          Wrote Python programs to calculate (using college-level Astronomy and Physics) the asteroid's orbital
          elements based on its positions in the sky.
          Results were published by the Minor Planet Center."
          image={ssp}
        />

        <Card
          title="The BHS app"
          description="Created an app for my school"
          longDescription="Created this app (using React Native) for my high school that featured a real-time schedule tracker,
          messaging for students in the same class, the ability to post schoolwide announcements, and a friend
          finder. App had over 1500 downloads and over 6000 daily usage sessions."
          image={bhs}
        />

        <Card
          title="MIT Beaver Works"
          description="Student at MIT Beaver Works"
          longDescription="Programmed a mini racecar, integrating sensors and collision avoidance logic and teaching machines to visually recognize objects, so as to autonomously navigate complex racetracks."
          image={beaver}
        />

      </div >
    </div>

  );
}

export default Work;