import Link from "next/link";
import styled from "styled-components";
import { withRouter } from "next/router";

const Container = styled.nav`
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const NavItem = styled.a`
  color: inherit;
  position: relative;

  :after {
    background: ${props => (props.current === props.href ? "black" : "none")};
    bottom: -0.5rem;
    content: "";
    height: 0.25rem;
    left: 0;
    position: absolute;
    width: 100%;
  }

  :focus {
    text-decoration: none;

    :after {
      background: var(--color-accent);
    }
  }
`;

const Title = styled(NavItem)`
  font-weight: 600;
`;

const Nav = ({ router }) => (
  <Container className="ibm--grid">
    <div className="ibm--col-sm-1 ibm--col-lg-2">
      <Link href={`/`} passHref>
        <Title current={router.pathname}>FED@IBM</Title>
      </Link>
    </div>
    <div className="ibm--col-sm-1 ibm--col-lg-2">
      <Link href={`/feducation`} passHref>
        <NavItem current={router.pathname}>FEDucation</NavItem>
      </Link>
    </div>
  </Container>
);

export default withRouter(Nav);
