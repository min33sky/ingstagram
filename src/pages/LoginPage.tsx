import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import * as Routes from '../constants/routes';

function LoginPage() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await firebase?.auth().signInWithEmailAndPassword(emailAddress, password);
        history.push(Routes.DASHBOARD);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      }
      setEmailAddress('');
      setPassword('');
    },
    [emailAddress, firebase, history, password]
  );

  useEffect(() => {
    document.title = 'Login - Ingstagram';
  }, []);

  //* 로그인 실패시 Email Input으로 Autofucus
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }

    return () => {
      emailInputRef.current = null;
    };
  }, [error]);

  return (
    <div className="container flex items-center h-screen max-w-screen-md mx-auto">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="IPhone with Ingstargam App" />
      </div>
      <div className="flex flex-col w-2/5 mr-4">
        <div className="flex flex-col items-center p-4 mb-4 bg-white border border-gray-200">
          <img src="/images/logo.png" alt="Ingstagram" className="w-6/12 mt-2 mb-4" />

          {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              ref={emailInputRef}
              type="text"
              aria-label="Enter your Email Address"
              value={emailAddress}
              placeholder="Email Address"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm text-gray-600 border border-gray-200 rounded outline-none"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              type="password"
              aria-label="Enter your Password"
              value={password}
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm text-gray-600 border border-gray-200 rounded outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50 cursor-not-allowed`
              }`}
            >
              로그인
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center w-full p-4 bg-white border border-gray-200">
          <p className="text-sm">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-bold text-blue-500">
              가입하기
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
