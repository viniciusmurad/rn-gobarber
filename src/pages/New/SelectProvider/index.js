import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

import Background from '~/components/Background';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function loadProviders() {
            const response = await api.get('providers');
            setProviders(response.data);
        }
        loadProviders();
    }, []);

    return (
        <Background>
            <Container>
                <ProvidersList
                    data={providers}
                    keyExtractor={provider => String(provider.id)}
                    renderItem={({ item: provider }) => (
                        <Provider
                            onPress={() =>
                                navigation.navigate('SelectDateTime', {
                                    provider,
                                })
                            }
                        >
                            <Avatar
                                source={{
                                    uri: provider.avatar
                                        ? provider.avatar.url
                                        : `https://api.adorable.io/avatars/50/{${provider.name}}.png`,
                                }}
                            />
                            <Name>{provider.name}</Name>
                        </Provider>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
    title: 'Select a provider',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});

SelectProvider.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
