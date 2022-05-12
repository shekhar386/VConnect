import React, { useState } from "react";
import {Text, Switch, View} from "react-native";
import { black } from "react-native-paper/src/styles/colors";

const SettingScreen = ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
      <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 100}}>
        <Text style={{fontSize: 20, color: 'black', marginRight: 50}}>Disable Account</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
}

export default SettingScreen;