import React, {useRef} from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import './Home.css';
import { motion, useTransform, useScroll } from "framer-motion"

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xOffset1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const xOffset2 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const xOffset3 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  return (
    <div className="Home">
      <Navbar />
      <div className="Landing">
        <div className="animation-box">
          <motion.div className="card" style={{ x: xOffset1 }}>
            <Card id="1" />
          </motion.div>
          <motion.div className="card" style={{ x: xOffset2 }}>
            <Card id="2" />
          </motion.div>
          <motion.div className="card" style={{ x: xOffset3 }}>
            <Card id="3" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;