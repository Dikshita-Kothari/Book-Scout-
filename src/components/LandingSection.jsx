import { motion } from 'framer-motion';

function LandingSection({ onExplore }) {
  return (
    <section className="landing-section">
      <motion.div 
        className="landing-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>BookScout</h1>
        <p>Your personal library in the digital age</p>
        <button className="explore-button" onClick={onExplore}>
          Explore Books
        </button>
      </motion.div>
      <div className="model-container">
        <iframe src='https://my.spline.design/roomgirlreadingcopy-jAeOWAIiW7yOssT8fc2iclKy/' frameborder='0' width='100%' height='100%'></iframe>
      </div>
    </section>
  );
}

export default LandingSection; 