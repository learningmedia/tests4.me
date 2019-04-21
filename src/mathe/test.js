import React from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Icon,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';

const Test = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          Project Name
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for single column layouts.
      </p>

      <div className="panel hover-shadow">
        <div className="flexbox">
          <div className="flex rest">
            <Header as='h2'>
              Einmaleins
              <Header.Subheader>Übe bis die Balken krachen!</Header.Subheader>
            </Header>
          </div>
          <div className="flex none">
            <Menu icon="labeled" size="tiny" text>
              <Menu.Item name="gamepad">
                <Icon name="gamepad" />
                Games
              </Menu.Item>
              <Menu.Item
                name="video camera"
                >
                <Icon name="video camera" />
                Channels
              </Menu.Item>
              <Menu.Item
                name="video play"
                >
                <Icon name="video play" />
                Videos
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div>
          Aliquip irure consequat sed non ea ut consequat in cupidatat ea ut sit laborum qui dolor esse in eu do commodo officia in consequat in dolore sunt enim irure excepteur nisi eu minim reprehenderit ad aliquip magna ad enim eiusmod eiusmod veniam nostrud nisi nulla aliqua id sit do sed aute cillum aute anim fugiat laboris deserunt eiusmod esse nisi culpa nisi nostrud culpa elit eu ea mollit ea sit consectetur anim magna ex eiusmod eu dolore eu exercitation anim irure dolor consequat dolor culpa aute eu do id enim ex cupidatat duis aute consectetur veniam in dolor sed ad sint amet minim ad voluptate mollit ullamco ea amet dolor culpa reprehenderit nulla voluptate est non nulla elit dolor ad exercitation laboris magna esse nostrud culpa et nostrud irure aliquip ut fugiat duis dolor ut consequat ad cillum elit incididunt aute veniam officia ut laborum sint ea sunt sed pariatur anim proident elit mollit id qui laboris culpa proident anim duis sed anim officia id deserunt sunt proident esse commodo elit excepteur anim amet sint dolor ut et amet occaecat duis sunt ut excepteur quis fugiat dolor ut qui et magna incididunt nulla id exercitation magna aute commodo occaecat adipisicing aliqua esse laborum nostrud sit incididunt duis eiusmod eu sit in est tempor officia eu ex ex aute irure mollit magna.
        </div>
      </div>

      <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
    </Container>

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 1' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 2' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 3' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Footer Header' />
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src='/logo.png' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

export default Test;
