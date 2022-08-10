import styled from '@emotion/styled';
import Container from './Container';

const Heading = styled.h1({
  fontSize: '30px'
})

function Header({ children }) {
  return (
    <Container bg='#0f151c' h='10%'>
      <Heading>{children}</Heading>
    </Container>
  );
}

export default Header;