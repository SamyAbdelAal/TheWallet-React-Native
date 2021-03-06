import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image } from "react-native";
import { Button, Content, Text, Container } from "native-base";
import * as actionCreators from "../../store/actions";
import { LinearGradient } from "expo";
// Style
import styles, { colors } from "./styles";

class HomePage extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.navigate("Home");
    }
    try {
      if (this.props.fetched) {
        if (this.props.profile.income !== null)
          this.props.navigation.navigate("Home");
        else {
          this.props.navigation.navigate("SetIncome");
        }
      }
    } catch (e) {
    } finally {
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      try {
        if (this.props.fetched) {
          if (this.props.profile.income !== null)
            this.props.navigation.navigate("Home");
          else {
            this.props.navigation.navigate("SetIncome");
          }
        }
      } catch (e) {
      } finally {
      }
    }
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Content padder style={styles.container}>
          <View>
            <Image
              style={{
                alignSelf: "center",
                height: 230,
                width: 230
              }}
              source={require("../../assets/images/logo2.png")}
              resizeMode="contain"
            />
            <Image
              style={{
                alignSelf: "center",
                height: 250,
                width: 250
              }}
              source={require("../../assets/images/jama3t.png")}
              resizeMode="contain"
            />
            <Button
              rounded
              block
              dark
              style={styles.login}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.text}>Login</Text>
            </Button>
            <Button
              rounded
              block
              dark
              style={styles.signup}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles.text}>Signup</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  isAuthenticated: state.auth.isAuthenticated,
  income: state.userInfo.income,
  fetched: state.auth.fetched
});

const mapDispatchToProps = dispatch => ({
  fetchBudgets: () => dispatch(actionCreators.fetchBudgets()),
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
