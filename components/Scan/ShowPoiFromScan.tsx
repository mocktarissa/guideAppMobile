import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Popover,
  Layout,
} from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Loading from "../Loading";

export default function ShowPoiFromScan({ navigation, route }) {
  const styles = useStyleSheet(themedStyles);
  const { data } = route.params;
  const { companyId } = route.params;
  const [poi, setPoi] = useState(data[0]);
  const [category, setCategory] = useState(data[0].category);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSize, setImageSize] = useState(true);
  // const [currentImage, setCurrentImage] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [visible, setVisible] = React.useState(false);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: poi[`picture${currentImage + 1}`] }}
      >
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0, 0, 0, 0.45)" },
          ]}
        />
      </ImageBackground>
      <Card style={styles.bookingCard} appearance="filled" disabled={true}>
        <Text style={styles.title} category="h6">
          {poi.name.toUpperCase()}
        </Text>
        <Text style={styles.rentLabel} appearance="hint" category="p2">
          {category.name.toUpperCase()}
        </Text>
        <Text style={styles.priceLabel} category="h6">
          {poi.location.toUpperCase()}
        </Text>
        <Button style={styles.bookButton} onPress={(onBookButtonPress) => {}}>
          BOOK NOW
        </Button>
      </Card>
      <Text style={styles.sectionLabel} category="s1">
        About
      </Text>
      <Text style={styles.description} appearance="hint">
        {poi.description}
      </Text>
      <Text style={styles.sectionLabel} category="h4">
        Photos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[
          poi.picture1,
          poi.picture2,
          poi.picture3,
          poi.picture4,
          poi.picture5,
          poi.picture6,
        ]}
        renderItem={({ item, index }) => (
          <Popover
            backdropStyle={styles.backdrop}
            visible={visible}
            anchor={() => (
              <ImageBackground style={styles.imageItem} source={{ uri: item }}>
                <Button
                  key={index}
                  onPress={() => showPicture(item)}
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  Show
                </Button>
              </ImageBackground>
            )}
            onBackdropPress={() => setVisible(false)}
          >
            <Layout style={styles.content}>
              <Icon style={styles.contentIcon} name="close"></Icon>
              <ImageBackground
                style={styles.imageFull}
                source={{ uri: currentImage }}
              />
            </Layout>
          </Popover>
        )}
      />
    </ScrollView>
  );

  // <Container>
  //   <Content>
  //     <Card>
  //       <CardItem style={imageSize ? styles.image : styles.imageSmall}>
  //         {currentImage > 0 ? (
  //           <Button
  //             onPress={() => setCurrentImage(currentImage - 1)}
  //             transparent
  //           >
  //             <Icon name="ios-arrow-dropleft" />
  //           </Button>
  //         ) : (
  //           <Button
  //             onPress={() => setCurrentImage(currentImage - 1)}
  //             transparent
  //             disabled
  //           >
  //             <Icon name="ios-arrow-dropleft" />
  //           </Button>
  //         )}
  //         <Image
  //           style={{ height: "100%", width: "70%" }}
  //           source={{ uri: poi[`picture${currentImage + 1}`] }}
  //         />
  //         {currentImage + 1 > 5 ? (
  //           <Button
  //             onPress={() => setCurrentImage(currentImage + 1)}
  //             transparent
  //             disabled
  //           >
  //             <Icon name="ios-arrow-dropright" />
  //           </Button>
  //         ) : (
  //           <Button
  //             onPress={() => setCurrentImage(currentImage + 1)}
  //             transparent
  //           >
  //             <Icon name="ios-arrow-dropright" />
  //           </Button>
  //         )}
  //       </CardItem>
  //       <CardItem onPress={() => setImageSize(false)}>
  //         <CardItem style={styles.logo}></CardItem>
  //         <Left>
  //           <Body>
  //             <Text>{poi.name}</Text>
  //             <Text note>{category["name"]}</Text>
  //           </Body>
  //         </Left>
  //       </CardItem>
  //       <CardItem>
  //         <Body style={styles.description}>
  //           <Text>{poi.description}</Text>
  //         </Body>
  //       </CardItem>
  //       <CardItem>
  //         <Left>
  //           <Button transparent textStyle={{ color: "#87838B" }}>
  //             <Icon name="thumbs-up" />
  //             <Text>1,926 likes</Text>
  //           </Button>
  //         </Left>
  //       </CardItem>
  //       <Text style={{ marginBottom: 5 }}>Comments</Text>
  //       <ScrollView style={styles.comments}>
  //         {/* Map to all the users comments on this POI */}

  //         <CardItem>
  //           <CardItem style={styles.logo}></CardItem>
  //           <Left>
  //             <Body>
  //               <Grid>
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //               </Grid>
  //               <Text>Very Good</Text>
  //               <Text note>The Place is Clean and spacious</Text>
  //               <Grid>
  //                 <Button transparent>
  //                   <Text>
  //                     <Icon name="thumbs-up" />
  //                     Useful
  //                   </Text>
  //                 </Button>
  //                 <Button transparent>
  //                   <Text>
  //                     <Icon name="thumbs-down" />
  //                     Not Useful
  //                   </Text>
  //                 </Button>
  //               </Grid>
  //             </Body>
  //           </Left>
  //         </CardItem>
  //         <CardItem>
  //           <CardItem style={styles.logo}></CardItem>
  //           <Left>
  //             <Body>
  //               <Grid>
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //               </Grid>
  //               <Text>Very Good</Text>
  //               <Text note>The Place is Clean and spacious</Text>
  //               <Grid>
  //                 <Icon name="thumbs-up" />
  //                 <Text>Useful</Text>
  //                 <Icon name="thumbs-down" />
  //                 <Text>Not Useful</Text>
  //               </Grid>
  //             </Body>
  //           </Left>
  //         </CardItem>
  //         <CardItem>
  //           <CardItem style={styles.logo}></CardItem>
  //           <Left>
  //             <Body>
  //               <Grid>
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //               </Grid>
  //               <Text>Could be better</Text>
  //               <Text note>Nice place for kids</Text>
  //             </Body>
  //           </Left>
  //         </CardItem>
  //         <CardItem>
  //           <CardItem style={styles.logo}></CardItem>
  //           <Left>
  //             <Body>
  //               <Grid>
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //                 <Icon name="star" />
  //               </Grid>
  //               <Text>Could be better</Text>
  //               <Text note>Nice place for kids</Text>
  //               <Grid>
  //                 <Icon name="thumbs-up" />
  //                 <Text>Useful</Text>
  //                 <Icon name="thumbs-down" />
  //                 <Text>Not Useful</Text>
  //               </Grid>
  //             </Body>
  //           </Left>
  //         </CardItem>

  //         {/* End of comments */}
  //       </ScrollView>
  //     </Card>
  //   </Content>
  // </Container>
}
const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 10,
  },
  title: {
    width: "65%",
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    flex: 1,
    width: 280,
    height: 220,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 1,
    // paddingVertical: 8,
    width: "100%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageFull: {
    width: 300,
    height: 500,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  contentIcon: {
    color: "white",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listRow: {
//     position: "absolute",
//     height: 20,
//   },
//   title: {
//     textAlign: "center",
//     marginVertical: 8,
//   },
//   fixToText: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
//   separator: {
//     marginVertical: 8,
//     borderBottomColor: "#737373",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   button: {
//     position: "absolute",
//     bottom: 0,
//     flex: 1,
//     justifyContent: "flex-end",
//     marginBottom: 36,
//     width: 20,
//   },
//   bottom: {
//     flex: 1,
//     justifyContent: "flex-end",
//     marginBottom: 36,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   image: {
//     backgroundColor: "grey",
//     height: "30%",
//     margin: 2,
//     width: "100%",
//   },

//   imageSmall: {
//     backgroundColor: "grey",
//     height: "40%",
//     margin: 2,
//     width: "100%",
//   },

//   description: {},
//   logo: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: "grey",
//   },
//   commentTitle: {},
//   comments: { marginTop: 6, marginBottom: 40, overflow: "scroll" },
// });
