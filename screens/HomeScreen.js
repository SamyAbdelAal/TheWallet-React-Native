import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import GoalsCarousel from "../components/GoalsCarousel";
import BudgetsCarousel from "../components/BudgetsCarousel";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  async componentDidMount() {
    if (this.props.budgets) {
      var today = new Date();
      if (this.props.budgets.length !== 0) {
        var compDate = new Date(
          this.props.budgets[this.props.budgets.length - 1].date
        );
        if (
          (today.getMonth() !== compDate.getMonth()) |
          (today.getFullYear() !== compDate.getFullYear())
        ) {
          this.props.navigation.replace("Report");
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <BudgetsCarousel navigation={this.props.navigation} />

          <GoalsCarousel navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.profile,
  budgets: state.budget.budgets
});
const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(actionCreators.logout(navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
