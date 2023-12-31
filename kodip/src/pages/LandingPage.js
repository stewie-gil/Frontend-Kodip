import React from 'react';
import TipsTricks from '../components/tips-tricks/TipsTricks';
import SubscribeNL from '../components/subscribe-newsletter/SubscribeNL';
import Review from '../components/review/Review';
import Hero from '../components/hero/Hero';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Review />
      <TipsTricks />
      <SubscribeNL />
    </div>
  )
}

export default LandingPage