import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Spinner,
  Grid,
  DeckSwiper,
} from "native-base";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Loading from "../Loading";
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

export default function PoiProfile({ navigation, route }) {
  const { poiId } = route.params;
  const { companyId } = route.params;
  const [poi, setPoi] = useState({});
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageSize, setImageSize] = useState(true);

  const [currentImage, setCurrentImage] = useState("");
  const [visible, setVisible] = React.useState(false);
  const styles = useStyleSheet(themedStyles);
  const showPicture = (picture) => {
    setCurrentImage(picture);
    setVisible(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://myguideapi.herokuapp.com/api/company/${companyId}/pois/${poiId}`
      );
      setPoi(result.data[0]);
      setCategory(result.data[0].category);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  // i

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
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
          {/* <Text>product.price.formattedScale</Text> */}
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

// isLoading ? (
// );
//   <Spinner />
// ) : (
//   <Container>
//     <Content>
//       <Container style={styles.imageMainContainer}>
//         <ImageBackground
//           source={{ uri: poi[`picture${currentImage + 1}`] }}
//           style={styles.imageMain}
//         >
//           <Container style={{ backgroundColor: "rgba(0, 20, 20,0.8)" }}>
//             <Content style={styles.imageMainTop}></Content>
//             <Text style={styles.title}>{poi.name}</Text>
//             <Text note style={styles.category}>
//               {category["name"].toUpperCase()}
//             </Text>
//             <Container style={styles.imagescontrol}>
//               {currentImage > 0 ? (
//                 <Button
//                   onPress={() => setCurrentImage(currentImage - 1)}
//                   transparent
//                   style={styles.imageLeft}
//                 >
//                   <Icon
//                     style={styles.ImageControlIcon}
//                     name="ios-arrow-dropleft"
//                   />
//                 </Button>
//               ) : (
//                 <Button
//                   onPress={() => setCurrentImage(currentImage - 1)}
//                   transparent
//                   disabled
//                   style={styles.imageLeft}
//                 >
//                   <Icon
//                     style={styles.ImageControlIcon}
//                     name="ios-arrow-dropleft"
//                   />
//                 </Button>
//               )}

//               {currentImage + 1 > 5 ? (
//                 <Button
//                   onPress={() => setCurrentImage(currentImage + 1)}
//                   transparent
//                   disabled
//                   style={styles.imageRight}
//                 >
//                   <Icon
//                     style={styles.ImageControlIcon}
//                     name="ios-arrow-dropright"
//                   />
//                 </Button>
//               ) : (
//                 <Button
//                   onPress={() => setCurrentImage(currentImage + 1)}
//                   transparent
//                   style={styles.imageRight}
//                 >
//                   <Icon
//                     style={styles.ImageControlIcon}
//                     name="ios-arrow-dropright"
//                   />
//                 </Button>
//               )}
//             </Container>
//           </Container>
//         </ImageBackground>
//         <Container style={styles.imageComponent}>{/* Images */}</Container>
//       </Container>
//       <Container style={styles.descriptionContainer}>
//         <Text style={{ fontSize: 25 }}>Description:</Text>
//         <ScrollView style={styles.description}>
//           <Container>
//             <Text>{poi.description}</Text>
//           </Container>
//         </ScrollView>

//         <CardItem>
//           <Left>
//             <Button transparent textStyle={{ color: "#87838B" }}>
//               <Icon name="thumbs-up" />
//               <Text>1,926 likes</Text>
//             </Button>
//           </Left>
//         </CardItem>

//         <Text style={{ marginBottom: 5, marginHorizontal: 20 }}>
//           Comments
//         </Text>
//       </Container>
//     </Content>
//   </Container>

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

//   imageMainContainer: {
//     height: 340,
//     position: "relative",
//   },

//   imageMain: {
//     height: 300,
//     overflow: "hidden",
//     marginLeft: "2%",
//     marginRight: "2%",
//     marginVertical: "5%",
//     borderRadius: 20,
//     backgroundColor: "rgba(255,0,0,0)",
//   },
//   imageMainTop: {
//     height: 50,
//   },
//   title: {
//     textAlign: "left",
//     marginHorizontal: 20,
//     fontSize: 40,
//     color: "white",
//   },
//   category: {
//     color: "#6e7553",
//     textAlign: "left",
//     marginHorizontal: 20,
//     fontSize: 15,
//   },
//   imageComponent: {
//     height: 400,
//   },
//   descriptionContainer: {
//     marginHorizontal: 20,
//   },
//   imagescontrol: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     height: 200,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   ImageControlIcon: {
//     height: "100%",
//     width: 20,
//   },
//   imageRight: {
//     fontSize: 20,
//     marginLeft: "80%",
//   },
// });
