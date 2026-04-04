// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-container">
        <h1>About YoFi TV</h1>

        <section className="about-section">
          <h2>What is YoFi TV?</h2>
          <p>
            YoFi TV is a 24/7 creator rotation platform.
          </p>
          <p>
            Upload your videos once. They play continuously on your station—like your 
            own TV channel that never stops. Viewers come to discover stations they 
            love and watch passively. No algorithm. No competition. No fighting for 
            visibility.
          </p>
          <p>
            Your content works for you, all day, every day.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Creators Love It</h2>
          
          <div className="benefit">
            <h3>Better payouts</h3>
            <p>
              We pay creators 90% on appreciations and subscriptions. YouTube pays 55% 
              on ads. We're in this together.
            </p>
          </div>

          <div className="benefit">
            <h3>Passive income</h3>
            <p>
              Upload once, earn forever. Your videos play 24/7, generating income while 
              you sleep, while you're making new content, while you're living your life.
            </p>
          </div>

          <div className="benefit">
            <h3>Creative control</h3>
            <p>
              You decide what plays, when it plays, and how your station feels. No 
              algorithm gaming. No optimization for "the algorithm." Just your vision.
            </p>
          </div>

          <div className="benefit">
            <h3>Real community</h3>
            <p>
              Creators support creators. No parasocial algorithm. No infinite scroll. 
              Just people who like your work.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>How It Works Right Now</h2>
          <ol className="steps">
            <li>Create a station (name, description, categories)</li>
            <li>Upload videos to your rotation</li>
            <li>Your station plays 24/7 to viewers</li>
            <li>Viewers appreciate you (tips) and support you (subscriptions)</li>
            <li>You earn 90% of both</li>
          </ol>
          <p className="emphasis">That's it. Simple.</p>
        </section>

        <section className="about-section">
          <h2>Coming Soon</h2>
          <p>We're building:</p>
          <ul className="coming-soon-list">
            <li>Video uploads and HLS streaming (full quality, true 24/7 experience)</li>
            <li>Creator tools (scheduling, analytics, insights)</li>
            <li>Community features (chat, creator network)</li>
            <li>Advanced discovery (without algorithms)</li>
            <li>And more—but we're shipping the core experience first</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>The Idea</h2>
          <p>
            The future of creator economy isn't about better algorithms or more metrics. 
            It's about:
          </p>
          <ul className="idea-list">
            <li>Creators who own their audience and their content</li>
            <li>Viewers who get quality they trust, not what's "trending"</li>
            <li>A platform that treats creators fairly</li>
            <li>A community where creators help creators succeed</li>
          </ul>
          <p className="closing">
            That's YoFi TV. We're just getting started.
          </p>
        </section>
      </div>
    </main>
  );
}