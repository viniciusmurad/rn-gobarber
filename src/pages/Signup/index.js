import React, { useRef } from 'react';
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

export default function SignUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Full name"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Email"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Password"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Join</SubmitButton>
                </Form>
                <SignLink
                    onPress={() => {
                        navigation.navigate('SignIn');
                    }}
                >
                    <SignLinkText>I already have an account.</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
