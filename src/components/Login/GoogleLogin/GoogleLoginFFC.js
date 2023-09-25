import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

function GoogleLoginFFC() {
    const user = false;

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            Hi
            <GoogleOAuthProvider clientId="347389237590-sfhcirh9s0iik7kiq4d77r53gk7kc6pc.apps.googleusercontent.com">
                <div>
                    {user ? (
                        <div>Logged In</div>
                    ) : (
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                var decoded = jwt_decode(credentialResponse.credential);
                                console.log(decoded);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    )}
                </div>
            </GoogleOAuthProvider>
        </div>
    );
}

export default GoogleLoginFFC;
