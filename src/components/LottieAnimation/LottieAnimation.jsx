import Lottie from 'lottie-react';
import animationData from '../../assets/Pnonebook-anim.json';
import s from '../LottieAnimation/LottieAnimation.module.css';

const LottieAnimation = () => {
  return (
    <div className={s['hero-image']}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
