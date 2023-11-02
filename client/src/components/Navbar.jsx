import styled from "styled-components";

const Container = styled.div`
margin: 0;
  height: 50px;
  display: flex;
  background-color: #1F1717;
  color: white;
  justify-content: space-between;
  padding: 0 20px; 
  align-items: center; 
`;

const Heading = styled.h2`
  font-size: 16px; 
`;

const List = styled.ul`
  list-style: none; 
   display: flex;
  gap: 10px; 
`;

const ListItem = styled.li`
  font-size: 14px; 
`;

const Navbar = () => {
  return (
    <Container>
      <Heading>DevTown Assignment</Heading>
      <List>
        <ListItem>Home</ListItem>
        <ListItem>About</ListItem>
        <ListItem>Contact</ListItem>
      </List>
    </Container>
  );
};

export default Navbar;
