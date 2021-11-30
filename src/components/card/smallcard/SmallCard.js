import * as React from 'react';
import { useFetchImages } from '../../../hooks/carousel/useFetchImages';
import { getImagesUrlFromStripe } from '../../../utils/getImages';
// import { useFetchAllPost } from '../../../hooks/post/useGetPost';
import './styles.css';

// const SmallCard = () => {
//   return (
//     <div className="img__wrap">
//       <img
//         className="img__img"
//         src="https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/i4328ae53a316c822/version/1510667937/luxurious-ski-resorts-courchevel-copyright-nikolpetr-european-best-destinations.jpg"
//       />
//       <p className="img__button">Readmore</p>
//     </div>
//   );
// };

// export default SmallCard;

const SmallCard = () => {
  const { thumbnail } = useFetchImages();

  const imageUrlPath = getImagesUrlFromStripe(thumbnail);

  return thumbnail.map((post, index) => {
    return (
      <div className="img__wrap" key={post[index]}>
        <img className="img__img" src={imageUrlPath.length > 0 && imageUrlPath[index].imgPath} />
        <p className="img__button">Readmore</p>
      </div>
    );
  });
};

export default SmallCard;
