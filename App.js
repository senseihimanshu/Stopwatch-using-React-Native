import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from "react-native";

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions
// } from "react-native/Libraries/NewAppScreen";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      sec: 0,
      msec: 0,

      start: false
    };

    this.lapArr = [];

    this.interval = null;
  }

  handleToggle = () => {
    this.setState(
      {
        start: !this.state.start
      },
      () => this.handleStart()
    );
  };

  handleLap = (min, sec, msec) => {
    console.log(this.state.lapArr);
      this.lapArr = [
        ...this.lapArr,
        [min, sec, msec]
      ]
    
  };

  handleStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.msec !== 90) {
          this.setState({
            msec: this.state.msec + 9
          });
        } else if (this.state.sec !== 59) {
          this.setState({
            msec: 0,
            sec: ++this.state.sec
          });
        } else {
          this.setState({
            msec: 0,
            sec: 0,
            min: ++this.state.min
          });
        }
      }, 100);

      console.log(this.interval);
    } else {
      console.log("clear", this.interval);
      clearInterval(this.interval);
    }
  };

  handleReset = () => {
    this.setState({
      min: 0,
      sec: 0,
      msec: 0,

      start: false
    });

    clearInterval(this.interval);

    this.lapArr = [];
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <Text> Created by Himanshu </Text>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {this.state.min}: {this.state.sec}: {this.state.msec}
                </Text>
                <Text style={styles.sectionDescription} />
                <View style={styles.giveMargin}>{this.state.start? <Button title="Lap" onPress={()=>this.handleLap(this.state.min, this.state.sec, this.state.msec)} /> : <Button title="Lap" disabled />}</View>
                <View style={styles.giveMargin}><Button title={!this.state.start? 'start': 'stop'} onPress={this.handleToggle} /></View>
                <View style={styles.giveMargin}><Button title="Reset" onPress={this.handleReset} /></View>
              </View>
              <View>
                {this.lapArr.map((cur, index) => {
                  return <Text>{`# ${index}    `}
                    {cur[0]}:{cur[1]}:{cur[2]}{" "}
                  </Text>;
                })}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff'
  },
  body: {
    backgroundColor: '#fff'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: '#000'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: '#ccc'
  },
  highlight: {
    fontWeight: "700"
  },
  giveMargin: {
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    width: 200
  }
});

export default App;
