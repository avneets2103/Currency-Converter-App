import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { currency } from '../interfaces'

interface Props {
  currency: currency;
  setSelectedFromCurrency: React.Dispatch<React.SetStateAction<currency>>;
  setSelectedToCurrency: React.Dispatch<React.SetStateAction<currency>>;
  setFromSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setToSelected: React.Dispatch<React.SetStateAction<boolean>>;
  fromSelected: boolean;
  toSelected: boolean;
  selectedFromCurrency: currency;   
  selectedToCurrency: currency;
  toValue: number;
  setToValue: React.Dispatch<React.SetStateAction<number>>;
  fromValue: number;  
  setFromValue: React.Dispatch<React.SetStateAction<number>>;
}

const FlagButton = (props: Props) => {
    const { setSelectedFromCurrency, setSelectedToCurrency, setFromSelected, setToSelected, fromSelected, toSelected, selectedFromCurrency, selectedToCurrency, toValue, setToValue } = props;
    const onPress = () => {
        if(!fromSelected && !toSelected){
            setFromSelected(true);
            setSelectedFromCurrency(currency);
            setToValue(0);
        }else if(fromSelected && !toSelected){
            setFromSelected(false);
            setToSelected(false);
            setSelectedToCurrency(currency);
        }
    }
    const backgroundColor = () => {
        if(selectedFromCurrency.id === currency.id){
            return '#AEDCC0';
        }else if(selectedToCurrency.id === currency.id){
            return '#E5625E';
        }
    }
    const { currency } = props;
    return (
        <View style={[styles.buttonStyle, {backgroundColor: backgroundColor()}]}>
            <Pressable onPress={onPress} style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{currency.flag}</Text>
                <Text>{currency.name}</Text>
            </Pressable>
        </View>
    )
}

export default FlagButton

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1, alignItems: 'center', justifyContent: 'center', height: 70, borderWidth: 1, borderColor: 'gray', borderRadius: 10, margin: 10
    },
    fromSelectedStyle: {
        backgroundColor: 'green'
    },
    toSelectedStyle: {
        backgroundColor: 'red'
    }
})