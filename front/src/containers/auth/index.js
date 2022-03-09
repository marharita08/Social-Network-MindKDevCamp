import React from "react";
import {useMutation} from "react-query";
import PropTypes from 'prop-types';

import AuthComponent from "../../components/authComponent";
import {googleAuth, auth} from "../../api/auth";

const AuthContainer = ({setAuthContext}) => {

    const { mutate: googleAuthMutate } = useMutation(
        googleAuth, {
            onSuccess: data => {
                const { data: {user, accessToken, refreshToken}} = data;
                setAuthContext({
                    authenticated: true,
                    user,
                    accessToken,
                    refreshToken
                })
            }
        });

    const { mutate: authMutate } = useMutation(
        auth, {
            onSuccess: data => {
                const { data: {user, accessToken, refreshToken}} = data;
                setAuthContext({
                    authenticated: true,
                    user,
                    accessToken,
                    refreshToken
                })
            }
        });

    const onGoogleSuccess = (response) => {
        const token = response.tokenObj;
        let data = {'token': token};
        googleAuthMutate(data);
    }

    const onGoogleFailure = (response) => {
        window.location.reload();
        window.localStorage.setItem('alertMessage', response.message);
        window.localStorage.setItem('alertSeverity', 'error');
    }

    const onFormSubmit = (data) => {
        authMutate(data);
    }

    const initialUser = {
        email:'',
        password:''
    }

    return (
        <AuthComponent
            onGoogleSuccess={onGoogleSuccess}
            onGoogleFailure={onGoogleFailure}
            onFormSubmit={onFormSubmit}
            initialUser={initialUser}
        />
    )
}

AuthContainer.propTypes = {
    setAuthContext: PropTypes.func.isRequired,
}

export default AuthContainer;
