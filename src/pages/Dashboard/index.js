import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Schedules from '~/components/Schedule';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
    const [schedules, setSchedules] = useState([]);

    async function loadAppointments() {
        const response = await api.get('appointments');
        setSchedules(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadAppointments();
        }
    }, [isFocused]);

    async function handleCancel(id) {
        const response = await api.delete(`appointments/${id}`);

        setSchedules(
            schedules.map(schedule =>
                schedule.id === id
                    ? { ...schedule, canceled_at: response.data.canceled_at }
                    : schedule
            )
        );
    }

    return (
        <Background>
            <Container>
                <Title>Schedules</Title>
                <List
                    data={schedules}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Schedules
                            onCancel={() => handleCancel(item.id)}
                            data={item}
                        />
                    )}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={20} color={tintColor} />
    ),
};

export default withNavigationFocus(Dashboard);
