import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignIn() {
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Email"
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Password"
                    />

                    <SubmitButton onPress={() => {}}>Login</SubmitButton>
                </Form>
                <SignLink onPress={() => {}}>
                    <SignLinkText>Create account</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
