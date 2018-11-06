import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { generate } from "geopattern";

import { breakpoints } from "../utils/grid";
import dateConverter from "../utils/date";
import Pattern from "./Pattern";

const Container = styled.div`
  margin-bottom: 2rem;
`;

const VideoContainer = styled.div`
  display: block;
  margin-bottom: 2rem;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;

  @media (min-width: ${breakpoints.lg.size}px) {
    margin-bottom: 0;
  }
`;

const Video = styled.video`
  left: 0;
  position: absolute;
  top: 0;
`;

const Player = props => {
  const { description, id, releaseDateTime, title, video } = props;
  const backgroundImage = generate(title).toDataUrl();

  return (
    <Container className="ibm--col ibm--grid">
      <div className="ibm--col-lg-8">
        <VideoContainer>
          <Video controls width="100%">
            <source src={video.fields.file.url} type="video/mp4" />
            <p>
              Your browser doesn't support HTML5 video. Here is a{" "}
              <a href={video.fields.file.url}>link to the video</a> instead.
            </p>
          </Video>
        </VideoContainer>
      </div>
      <div className="ibm--col-lg-6">
        <Pattern
          style={{
            backgroundImage
          }}
        />
        <h2>{title}</h2>
        <p>{dateConverter(releaseDateTime)}</p>
        <ReactMarkdown source={description} />
      </div>
    </Container>
  );
};

export default Player;
