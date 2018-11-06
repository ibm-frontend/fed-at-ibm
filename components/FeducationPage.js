import FeducationTile from "./FeducationTile";
import Player from "./Player";

const FeducationPage = ({ feducations }) => {
  const { description, id, releaseDateTime, title, video } = feducations[0];

  return (
    <React.Fragment>
      <Player
        description={description}
        id={id}
        releaseDateTime={releaseDateTime}
        title={title}
        video={video}
      />
      {feducations.slice(1).map(feducation => (
        <FeducationTile
          id={feducation.id}
          key={feducation.id}
          title={feducation.title}
        />
      ))}
    </React.Fragment>
  );
};

export default FeducationPage;
