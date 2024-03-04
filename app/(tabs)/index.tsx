import { Link } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Link href='./user/1'>User - 1</Link>
      <Link href={{
        pathname: "/user/[id]",
        params: { id: '2' }
      }}>User - 2</Link>
      {/* <TextInput placeholder='abcdef' style={styles.input} />
      <Button
        title="ADD ITEM"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        touchSoundDisabled={true}
      />
      <View style={styles.innerDiv}>
        <View className='flex flex-row bg-[#b9e2f5] border-[#50b8e7] w-full border px-1'>
          <Text>Todo - 1</Text>
          <Text>x</Text>
        </View>
      </View> */}
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
    padding: 5
  },
  addBtn: {
    width: "100%",
    borderWidth: 1
  }
});
