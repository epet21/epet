import bb from '../assets/bb.png';
import child from '../assets/child.png';
import teen from '../assets/teen.jpg';
import adult from '../assets/adult.jpg';
import dead from '../assets/dead.jpg';

const PhotoDisplayer = ({stage}) => {   
        const imageDisplayer = () => {
            if(stage == 1){
                return <img src={bb} alt="image for pet being a baby" />
            } else if (stage == 2) {
                return <img src={child} alt="image for pet being a child" />
            } else if (stage == 3) {
                return <img src={teen} alt="image for pet being a child" />
            } else if (stage == 4) {
                return <img src={adult} alt="image for pet being a adult" />
            } else if (stage == 6) {
                return <img src={dead} alt="image for pet being a adult" />
            }
        }

        
    return (
        <>
            {imageDisplayer()}
        </>
    )
}

export default PhotoDisplayer;