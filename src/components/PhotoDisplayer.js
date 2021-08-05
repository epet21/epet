import bb from '../assets/bb.png';
import child from '../assets/child.png';
import teen from '../assets/teen.jpg';
import adult from '../assets/adult.jpg';
import sickPet from '../assets/sickPet.png';

const PhotoDisplayer = ({ stage, sick }) => {
  const imageDisplayer = () => {
    if (sick) {
      return <img src={sickPet} alt="sick pet" />;
    } else if (stage === 1) {
      return <img src={bb} alt="smol bb pet" />;
    } else if (stage === 2) {
      return <img src={child} alt="child pet" />;
    } else if (stage === 3) {
      return <img src={teen} alt="teen pet" />;
    } else if (stage === 4) {
      return <img src={adult} alt="adult pet" />;
    }
  };

  return <>{imageDisplayer()}</>;
};

export default PhotoDisplayer;
