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

export const SignUpScreen = () => {
  return (
    <AppView>
      <Header />
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
        <ContainedButton title={'Create Account'} />
        <TouchableOpacity>
          <Text style={styles.textLabel}>Already Have an Account?</Text>
        </TouchableOpacity>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  sizedBox: {
    height: Dimensions.get('window').height * 0.09,
  },
  textContainer: {
    marginTop: Dimensions.get('window').height * 0.07,
    marginVertical: Dimensions.get('window').width * 0.05,
  },
  textOne: {
    fontFamily: 'nunito',
    fontWeight: '900',
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
    fontFamily: 'nunito',
    fontWeight: '700',
    lineHeight: 22,
  },
  sizedBox2: {
    marginTop: 52,
  },
  inputContainer: {
    marginTop: Dimensions.get('window').height * 0.04,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
  },
  inputLabel: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').fontScale * 14,
    color: '#403B36',
    fontFamily: 'nunito',
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
    paddingHorizontal: 19,
    paddingVertical: 16,
    marginTop: 8,
    fontFamily: 'nunito',
    fontWeight: '700',
    marginBottom: Dimensions.get('window').height * 0.03,
  },
  bottomButtons: {
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.09,
  },
  textLabel: {
    color: '#D9614C',
    marginVertical: Dimensions.get('window').height * 0.03,
    fontFamily: 'nunito',
    fontSize: Dimensions.get('window').fontScale * 16,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 20.8,
  },
});
