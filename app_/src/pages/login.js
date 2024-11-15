import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log(result);
  
    console.log("SignIn Result:", result);
  
    if (result && result.ok) {
      router.push('/admin');
    } else {
      alert('Login failed');
      console.error("Error during login:", result?.error || "Unknown error");
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center p-2">
            <div className="col-md-4">
              <div>
                <h2>Login</h2>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="submit">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}