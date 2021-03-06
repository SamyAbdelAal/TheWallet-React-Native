import React from "react";
import { Text, View } from "react-native";
import { Button, Form, Item, Input, H3, Toast } from "native-base";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import styles from "./styles";

class UpdateTransactionView extends React.Component {
  static navigationOptions = {
    title: "Add Expanses"
  };
  constructor(props) {
    super(props);

    this.state = {
      budget: this.props.budget,
      amount: this.props.transaction.amount,
      label: this.props.transaction.label
    };
  }

  sendTransaction() {
    if (this.state.label === "") {
      Toast.show({
        text: "Please enter a label",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else if (this.state.amount === 0) {
      Toast.show({
        text: "Please enter a valid value",
        buttonText: "Okay",
        duration: 6000,
        type: "danger",
        buttonTextStyle: { color: "#000" },
        buttonStyle: { backgroundColor: "#F1C04F", alignSelf: "center" }
      });
    } else {
      this.props.updateTransaction(
        this.props.transaction.id,
        {
          label: this.state.label,
          amount: this.state.amount
        },
        this.state.budget.id,
        this.props.navigation
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={styles.h3}>Update your transaction</H3>
        <Form>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              defaultValue={this.state.label}
              onChangeText={value => this.setState({ label: value })}
            />
          </Item>
          <Item style={styles.label}>
            <Input
              style={styles.inputs}
              defaultValue={this.state.amount}
              keyboardType="decimal-pad"
              onChangeText={value =>
                this.setState({ amount: parseFloat(value) })
              }
            />
            <Button
              block
              style={styles.button}
              onPress={() => this.sendTransaction()}
            >
              <Text style={{ color: "white" }}>+</Text>
            </Button>
          </Item>
        </Form>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  budgets: state.budget.budgets,
  transactions: state.transaction.transactions
});
const mapDispatchToProps = dispatch => ({
  updateTransaction: (transaction_id, transaction, budget_id, navigation) =>
    dispatch(
      actionCreators.updateTransaction(
        transaction_id,
        transaction,
        budget_id,
        navigation
      )
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTransactionView);
