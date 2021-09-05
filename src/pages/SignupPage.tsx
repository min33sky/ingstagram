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
import { doesUsernameExist } from '../services/firebase';

function SignupPage() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' || username === '' || fullName === '';

  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleSignup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists) {
        try {
          const createdUserResult = await firebase
            ?.auth()
            .createUserWithEmailAndPassword(emailAddress, password);

          // authentication
          // -> emailAddress & password & username (displayName)
          await createdUserResult?.user?.updateProfile({
            displayName: username,
          });

          // firebased user collection (create a document)
          await firebase?.firestore().collection('users').add({
            userId: createdUserResult?.user?.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            dateCreated: Date.now(),
          });

          history.push(Routes.DASHBOARD);
        } catch (error: any) {
          setEmailAddress('');
          setUsername('');
          setPassword('');
          setFullName('');
          setError(error.message);
        }
      } else {
        setError('이미 존재하는 username입니다. 다른 username을 입력하세요.');
      }
    },
    [username, emailAddress, firebase, fullName, history, password]
  );

  useEffect(() => {
    document.title = 'Signup - Ingstagram';
  }, []);

  //* 로그인 실패시 Email Input으로 Autofucus
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="IPhone with Ingstargam App" />
      </div>
      <div className="flex flex-col w-2/5 mr-4">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-200 mb-4">
          <img src="/images/logo.png" alt="Ingstagram" className="mt-2 w-6/12 mb-4" />

          {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              aria-label="Enter your Username"
              value={username}
              placeholder="Username"
              className="text-sm outline-none text-gray-600 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              aria-label="Enter your Full Name"
              value={fullName}
              placeholder="Full Name"
              className="text-sm outline-none text-gray-600 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              ref={emailInputRef}
              type="text"
              aria-label="Enter your Email Address"
              value={emailAddress}
              placeholder="Email Address"
              className="text-sm outline-none text-gray-600 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              type="password"
              aria-label="Enter your Password"
              value={password}
              placeholder="Password"
              className="text-sm outline-none text-gray-600 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50 cursor-not-allowed`
              }`}
            >
              가입
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-200">
          <p className="text-sm">
            계정이 있으신가요?{' '}
            <Link to="/login" className="font-bold text-blue-500">
              로그인
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
