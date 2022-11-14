import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Home({navigation}) {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={homeStyles.firstView}>
        <Text style={homeStyles.text}>DESKTIME</Text>
    </View>
    <View style={homeStyles.btnStyle}>
        <Button title='SignIn' onPress={()=> navigation.navigate('Login')} />
        <Button title='SignUp' onPress={()=> navigation.navigate('Register')} />
    </View>
    <View>
        <Text style={homeStyles.secondText}>“DeskTime” is an automated attendance management system app which 
            will help faculty reduce manual attendance taking through face detection and recognition.
        </Text>
    </View>
    <View>
        <Image source={require('../assets/attend.png')} style={homeStyles.Image}></Image>
    </View>
    <View  style={homeStyles.thirdText}>
        <Text style={{marginLeft: 45, color:'white'}}>Wesley Lewis</Text>
        <Text style={{marginLeft: 48, color:'white'}}>Amey Bagwe</Text>
        <Text style={{marginLeft: 30, color:'white'}}>Vailantan Fernandes</Text>
        <Text style={{marginLeft: 46, color:'white'}}>Sandesh Raut</Text>
    </View>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#705DE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const homeStyles = StyleSheet.create({
    text: {
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      marginLeft: 15,
    },
    btnStyle: {
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      marginLeft: 12
    },

      thirdText: {
        marginTop: 20
      },
      secondText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom:50
      },

      Image: {
        width:395
      }
  });