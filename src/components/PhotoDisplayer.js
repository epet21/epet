import bb from '../assets/charmander.gif';
import child from '../assets/charmeleon.gif';
import teen from '../assets/charizard.gif';
import adult from '../assets/charizardMega.gif';
import sickPet from '../assets/sickPet.png';

const PhotoDisplayer = ({ stage, sick }) => {
  const imageDisplayer = () => {
    if (sick) {
      return <img className="petImage" src={sickPet} alt="sick pet" />;
    } else if (stage === 1) {
      return <img className="petImage" src={bb} alt="smol bb pet" />;
    } else if (stage === 2) {
      return <img className="petImage" src={child} alt="child pet" />;
    } else if (stage === 3) {
      return <img className="petImage" src={teen} alt="teen pet" />;
    } else if (stage === 4) {
      return <img className="petImage" src={adult} alt="adult pet" />;
    }
  };

  return <>{imageDisplayer()}</>;
};

export default PhotoDisplayer;
