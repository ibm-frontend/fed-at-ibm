import { generate } from "geopattern";
import Link from "next/link";
import styled from "styled-components";

import Pattern from "./Pattern";

const Anchor = styled.a`
  color: inherit;
  margin: 2rem 0;
  text-decoration: none;
`;

const FeducationTile = props => {
  const { id, title } = props;
  const backgroundImage = generate(title).toDataUrl();

  return (
    <Link href={`/feducation/${id}`} passHref>
      <Anchor className="ibm--col-md-4 ibm--col-lg-4">
        <Pattern
          style={{
            backgroundImage
          }}
        />
        <h2>{title}</h2>
      </Anchor>
    </Link>
  );
};

export default FeducationTile;
