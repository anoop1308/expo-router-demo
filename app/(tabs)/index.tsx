import { Button, Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='abcdef' style={styles.input} />
      <Button
        // onPress={onPressLearnMore}
        title="ADD ITEM"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        touchSoundDisabled={true}
      />
      <View style={styles.innerDiv}>
        <View style={styles.itemDiv}>
          <Text>Todo - 1</Text>
          <Text>x</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  innerDiv: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  input: {
    fontSize: 20,
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingLeft: 5,
    borderRadius: 5
  },
  itemDiv: {
    width: '100%',
    backgroundColor: '#b9e2f5',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    borderColor: '#50b8e7',
    padding: 5
  },
  addBtn: {
    width: "100%",
    borderWidth: 1
  }
});
