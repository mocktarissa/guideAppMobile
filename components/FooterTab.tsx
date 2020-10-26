import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from "native-base";
export default function BottomNav({ navigation, active }) {
  return (
    <Container>
      <Header />
      <Content />
      <Footer>
        <FooterTab>
          <Button vertical onPress={() => navigation.navigate("Homepage")}>
            <Icon name="apps" />
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Scan QR</Text>
          </Button>
          <Button vertical active>
            <Icon active name="search" />
            <Text>Search</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
