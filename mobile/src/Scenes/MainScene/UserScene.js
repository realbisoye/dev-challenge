import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
 } from 'react-native';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { ErrorScene } from '../../components';

const query = gql`
query User($id: ID!) {
  user(id: $id) {
    id
    color
    name
    email
    image
    address {
      streetAddress
      streetName
      city
      county
      state
      country
      zipCode
    }
    friends {
      id
      name
    }
    company {
      id
      name
      suffice
    }
  }
}
`;

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
  sectionWrapper: {
    marginTop: 20,
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
  sectionHeading: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '800'
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
    const id = navigation.getParam('id');

    // todo: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <Query query={query} variables={{id}}>
        {({ loading, error, data }) => {

          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }
          const user = data.user

          return (
            <ScrollView contentContainerStyle={[styles.userCard, {backgroundColor: user.color}]}>
              <ImageBackground style={styles.imageWrapper} imageStyle={styles.image} source={{ uri: user.image }} />
              <View style={styles.userData}>
                <Text style={styles.textId}>User ID: {user.id}</Text>
                <Text style={styles.textName}>{user.name}</Text>
                <Text style={styles.textEmail}>{user.email}</Text>
                {user.company && <View style={styles.sectionWrapper}>
                  <Text style={styles.sectionHeading}>Company</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('CompanyScene', { id: user.company.id})}>
                    <Text style={styles.textEmail}>{user.company.name} {user.company.suffice}</Text>
                  </TouchableOpacity>
                </View>}
                {user.friends && user.friends.length && <View style={styles.sectionWrapper}>
                  <Text style={styles.sectionHeading}>Friends</Text>
                  {user.friends.map((friend, index) => (
                    <TouchableOpacity key={friend.id} onPress={() => this.props.navigation.navigate('UserScene', { id: friend.id})}>
                      <Text style={styles.textEmail}>{index + 1}. {friend.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>}
              </View>
            </ScrollView>
          )
        }}
      </Query>
    );
  }
}
