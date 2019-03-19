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
query Company($id: ID!) {
  company(id: $id) {
    id
    color
    name
    image
    catchPhrase
    bs
    suffice
    address {
      streetAddress
      streetName
      city
      county
      state
      country
      zipCode
    }
    employees {
      name
      image
      id
      friends {
        name
        id
      }
    }
  }
}
`;

const styles = StyleSheet.create({
  companyCard: {
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
    marginVertical: 20,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  companyData: {
    padding: 20,
    width: '100%',
    marginBottom: 20,
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

export default class CompanyScene extends PureComponent {

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // todo: 2. would be really cool to show the company info here.
    // todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.
    return (
      <Query query={query} variables={{id}}>
        {({ loading, error, data }) => {

          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }
          const company = data.company
          console.log(company, 'COMPSPSP')
          return (
            <ScrollView contentContainerStyle={[styles.companyCard, {backgroundColor: company.color}]}>
              <ImageBackground style={styles.imageWrapper} imageStyle={styles.image} source={{ uri: company.image }} />
              <View style={styles.companyData}>
                <Text style={styles.textId}>Company ID: {company.id}</Text>
                <Text style={styles.textName}>{company.name} {company.suffice}</Text>
                <Text style={styles.textEmail}>{company.catchPhrase}</Text>
                <Text style={styles.textEmail}>{company.bs}</Text>
                {company.employees && company.employees.length > 0 && <View style={styles.sectionWrapper}>
                  <Text style={styles.sectionHeading}>Employees</Text>
                  {company.employees.map((employee, index) => (
                    <TouchableOpacity key={employee.id} onPress={() => this.props.navigation.navigate('UserScene', { id: employee.id})}>
                      <Text style={styles.textEmail}>{index + 1}. {employee.name}</Text>
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
