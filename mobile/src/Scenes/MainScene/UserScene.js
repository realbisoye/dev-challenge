import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 1,
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
    height: '40%',
    zIndex: 2000,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  userData: {
    padding: 20,
    width: '100%',
  },
  textName: {
    color: '#ffffff',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 5,
  },
  textEmail: {
    color: '#ffffff',
    fontSize: 18,
  },
  textId: {
    color: '#ffffff',
    fontSize: 12,
  }
});

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    // todo: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <View style={[styles.userCard, {backgroundColor: user.color}]}>
        <ImageBackground style={styles.imageWrapper} imageStyle={styles.image} source={{ uri: user.image }} />
        <View style={styles.userData}>
          <Text style={styles.textId}>User ID: {user.id}</Text>
          <Text style={styles.textName}>{user.name}</Text>
          <Text style={styles.textEmail}>{user.email}</Text>
        </View>
      </View>
    );
  }
}
