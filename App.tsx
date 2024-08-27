import { FlatList, StyleSheet, Text, TextInput, View, SafeAreaView, Pressable, Touchable, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { currencies } from './contants'; // Assuming the file path and spelling are correct
import FlagButton from './Components/FlagButton'; // Assuming the file path is correct

const App = () => {
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(0);
  const [selectedFromCurrency, setSelectedFromCurrency] = React.useState(currencies[0]);
  const [selectedToCurrency, setSelectedToCurrency] = React.useState(currencies[0]);
  const [fromSelected, setFromSelected] = React.useState(false);
  const [toSelected, setToSelected] = React.useState(false);

  const chooseText = () => {
    if (!fromSelected && !toSelected) {
      return 'Choose currency to convert from: ';
    } else if (fromSelected && !toSelected) {
      return 'Choose currency to convert to: ';
    }
  };

  const renderHeader = () => (
    <View style={styles.upperContainer}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20 , fontWeight: 'bold' }}>Currency Converter</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Text>From</Text>
          <TextInput
            value={fromValue.toString()}
            onChangeText={(text) => setFromValue(Number(text))}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={{fontWeight: 'bold'}}>{selectedFromCurrency.symbol}</Text>
        </View> 
        <Text style={{fontWeight: 'bold'}}>{"-->"}</Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Text>To</Text>
          <Text>{toValue.toFixed(2)}</Text>
          <Text style={{fontWeight: 'bold'}}>{selectedToCurrency.symbol}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={()=>{
        const convRate = selectedToCurrency.conversion / selectedFromCurrency.conversion;
        setToValue(fromValue * convRate);
      }}>
        <View style={{width: 100, height: 50, backgroundColor: '#7D8CC4', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{"Convert"}</Text>
        </View>
      </TouchableOpacity>
      <Text style={{fontWeight: "bold"}}>{chooseText()}</Text>
  </View>
  );

  const renderFooter = () => (
    <></>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        numColumns={3}
        data={currencies}
        renderItem={({ item }) => (
          <FlagButton
            currency={item}
            selectedFromCurrency={selectedFromCurrency}
            selectedToCurrency={selectedToCurrency}
            setSelectedFromCurrency={setSelectedFromCurrency}
            setSelectedToCurrency={setSelectedToCurrency}
            fromSelected={fromSelected}
            toSelected={toSelected}
            setFromSelected={setFromSelected}
            setToSelected={setToSelected}
            toValue={toValue}
            setToValue={setToValue}
            fromValue={fromValue}
            setFromValue={setFromValue}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    padding: 20,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  upperContainer: {
    flex: 1,
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
