import LottieAnimation from '../../components/LottieAnimation/LottieAnimation';
import s from '../HomePage/HomePage.module.css';

const HomePage = () => {
  return (
    <section className={s['home-section']}>
      <div className="container">
        <h1 className={s.title}>Welcome to Phonebook</h1>
        <LottieAnimation />
        <span className={s.text}>
          If you want to use the Phonebook, you need to Register and Log In
        </span>
      </div>
    </section>
  );
};
export default HomePage;
