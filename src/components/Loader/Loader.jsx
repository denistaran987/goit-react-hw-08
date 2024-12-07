import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="#00ced1"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
      />
    </>
  );
};
export default Loader;
