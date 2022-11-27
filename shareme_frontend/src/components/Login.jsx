import { useEffect } from 'react' 
import {GoogleLogin} from 'react-google-login'
import {useNavigate} from  'react-router-dom'
import {gapi} from 'gapi-script'
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import {client} from '../client';



const Login = () => {
  const clientId = import.meta.env.VITE_GOOGLE_API_ID;

  const navigate = useNavigate();
  const responseGoogle =(response)=>{
    console.log(response)
    localStorage.setItem('user',JSON.stringify(response.profileObj));
    const {name,googleId , imageUrl} = response.profileObj;
    const doc = {
      _id:googleId,
      _type: 'user',
      userName: name,
    image :imageUrl
    }
    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/',{replace:true});
    })
    


  }
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient)
  },[])

  return (
    <div className='flex justify-start items-center flex-col h-screen ' >
      <div className="relative w-full h-full">
        <video 
        className='w-full h-full object-cover'
        src={shareVideo}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width='130px' alt='logo' />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin 
            clientId={clientId}
            render={(renderProps)=>(
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} type='button' className='bg-mainColor flex justify-center outline-none items-center p-3 rounded-lg cursor-pointer '>
                <FcGoogle className='mr-4' /> Sign in with Google
              </button>


            )}
            
              isSignedIn={true}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login