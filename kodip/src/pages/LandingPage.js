import React from 'react';
import TipsTricks from '../components/tips-tricks/TipsTricks';
import SubscribeNL from '../components/subscribe-newsletter/SubscribeNL';
import Review from '../components/review/Review';
import Hero from '../components/hero/Hero';
import Recomendation from '../components/recommendation/Recomendation';
import ReadyRent from '../components/ready-rent/ReadyRent';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Recomendation />
      <ReadyRent />
      <Review />
      <TipsTricks />
      <SubscribeNL />
    </div>
  )
}

export default LandingPage