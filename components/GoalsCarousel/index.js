import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles, { colors } from "./styles/index.style";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { sliderWidth, itemWidth } from "./styles/SE";

import SliderEntry from "./components/SliderEntry";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
import { scrollInterpolators, animatedStyles } from "./utils/animations";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

class GoalsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  momentumExample(number, title) {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          data={this.props.budgets}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={"start"}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType={"spring"}
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
        />
      </View>
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === "tinder";
    if (isTinder) {
      console.log(this.props.goals);
    }
    return (
      <View style={[styles.exampleContainer]}>
        <Text
          style={[styles.title, isTinder ? {} : styles.titleLight]}
        >{`Goals`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleLight]}>
          {title}
        </Text>
        <Carousel
          data={isTinder ? ENTRIES1 : this.props.goals}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View
        style={[
          styles.exampleContainer,
          isEven ? styles.exampleContainerDark : styles.exampleContainerLight
        ]}
      >
        <Text
          style={[styles.title, isEven ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
    ) : (
      false
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const example2 = this.momentumExample(
      2,
      "Momentum | Left-aligned | Active animation"
    );
    const example3 = this.layoutExample(3, "The key is to deposit!", "stack");

    const example8 = this.customExample(
      8,
      "Custom animation 4",
      4,
      this._renderLightItem
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example2}
            {example8}

            {example3}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  goals: state.goal.goals,
  budgets: state.budget.budgets
});

export default connect(mapStateToProps)(GoalsCarousel);