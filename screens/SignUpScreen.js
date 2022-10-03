import React from 'react';
import AppView from '../components/AppView';
import Header from '../components/Header';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ContainedButton} from '../components/ContainedButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const SignUpScreen = ({navigation}) => {
  return (
    <AppView>
      <Header />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.textOne}>Create a free account</Text>
          <Text style={styles.textTwo}>
            Join Notely for free. Create and share {'\n'} unlimited notes with
            your friends.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.editInput}
            placeholder={'Enter your Full Name'}
            placeholderTextColor={'#595550'}
          />
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.editInput}
            keyboardType={'email-address'}
            placeholder={'Enter your Email Address'}
            placeholderTextColor={'#595550'}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.editInput}
            secureTextEntry={true}
            placeholder={'************'}
            placeholderTextColor={'#595550'}
          />
        </View>
        <View style={styles.bottomButtons}>
          <ContainedButton
            title={'Create Account'}
            onClick={() => {
              navigation.navigate('HomeScreen');
            }}
          />
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.textLabel}>Already Have an Account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  textContainer: {
    marginTop: Dimensions.get('window').height * 0.05,
    marginVertical: Dimensions.get('window').width * 0.05,
  },
  textOne: {
    fontFamily: 'Nunito-Black',
    fontSize: Dimensions.get('window').fontScale * 24,
    color: '#403B36',
    fontStyle: 'normal',
    lineHeight: 33,
    textAlign: 'center',
  },
  textTwo: {
    color: '#595550',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height * 0.02,
    fontSize: Dimensions.get('window').fontScale * 16,
    fontFamily: 'Nunito-Bold',
    lineHeight: 22,
  },
  inputContainer: {
    marginTop: Dimensions.get('window').height * 0.03,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
  },
  inputLabel: {
    marginHorizontal: 5,
    fontSize: Dimensions.get('window').fontScale * 14,
    color: '#403B36',
    fontFamily: 'Nunito-Bold',
    lineHeight: 15,
    letterSpacing: 0.5,
    fontStyle: 'normal',
  },
  editInput: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFDFA',
    borderRadius: 13,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#F2E5D5',
    color: '#595550',
    paddingHorizontal: 19,
    paddingVertical: 16,
    marginTop: 8,
    fontFamily: 'Nunito-Bold',
    marginBottom: Dimensions.get('window').height * 0.03,
  },
  bottomButtons: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.04,
  },
  textLabel: {
    color: '#D9614C',
    marginVertical: Dimensions.get('window').height * 0.03,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: Dimensions.get('window').fontScale * 16,
    textAlign: 'center',
    lineHeight: 20.8,
  },
  container: {
    flex: 1,
  },
});
