import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Schedules from '~/components/Schedule';

import { Container, Title, List } from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
    return (
        <Background>
            <Container>
                <Title>Schedules</Title>
                <List
                    data={data}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) => <Schedules data={item} />}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Schedules',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={20} color={tintColor} />
    ),
};
