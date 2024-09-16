import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTE, SIGHNUP_ROUTE } from "@/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {

  let [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()

  const toggle = () => {
    setIsLogin(!isLogin);
  }

  const validateSignup = () => {
    if (!email.length || !password.length) {
      alert('Email is required');
      return false
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true
  }

  const validateLogin = () => {
    if (!email.length || !password.length) {
      alert('Email is required');
      return false
    }

    return true
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        alert("Login successful");


        if (response.data.user.id) {
          if (response.data.user.profileSetup) {
            setUserInfo(response.data.user)
            navigate('/chat');
          }
          else {
            setUserInfo(response.data.user)
            navigate('/profile');
          }
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during logging in.");
      }
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGHNUP_ROUTE, { email, password }, { withCredentials: true });
        alert("Signup successful");

        if (response.status === 201) {
          setUserInfo(response.data.user)
          navigate("/profile")
        }

      } catch (error) {
        console.error(error);
        alert("An error occurred during signing up.");
      }
    }

  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid'>
        <div className='flex gap-10 items-center justify-center'>
          <div className='flex items-center  justify-center flex-col'>
            <div className="flex items-center justify-center">
              <h1 className='text-5xl font-bold md:text-6xl'>Welcome to CHARCHA</h1>
            </div>
            <p className="font-medium text-center">Fill the details to getting started in the best chat app!</p>
            <div className="flex items-center justify-center w-full flex-col">
              <div className="flex gap-10 m-4 w-[200px]">
                <Button className="h-[30px]" onClick={toggle}>Login</Button>
                <Button className="h-[30px]" onClick={toggle}>SignUp</Button>
              </div>
              <div className={`login ${isLogin ? '' : 'hidden'} flex items-center justify-center flex-col w-full`}>
                <form action="" className="flex items-center justify-center flex-col w-full">
                  <input className="m-4 border-2 rounded-2xl p-2 text-black"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required />

                  <input className="m-4 border-2 rounded-2xl p-2 text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required />

                  <input className="bg-black text-white border-2 rounded-2xl p-2" type="submit" onClick={handleLogin} />
                </form>
              </div>
              <div className={`signup ${isLogin ? 'hidden' : ''} flex items-center justify-center flex-col w-full`}>
                <form action="" className="flex items-center justify-center flex-col w-full">
                  <input className="m-4 border-2 rounded-2xl p-2 text-black"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required />

                  <input className="m-4 border-2 rounded-2xl p-2 text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required />

                  <input className="m-4 border-2 rounded-2xl p-2 text-black"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    required />

                  <input className="bg-black text-white border-2 rounded-2xl p-2 cursor-pointer" type="submit" value="Register" onClick={handleSignup} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
