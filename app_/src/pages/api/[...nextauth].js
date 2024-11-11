import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
            console.log('Tentando autenticar', credentials);
            const user = users.find((user) => user.email === credentials.email);
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
              console.log('Usuário autenticado', user);
              return { id: user.id, name: user.name, email: user.email };
            }
            console.log('Autenticação falhou');
            return null;
          },
      }),
    ],
    pages: {
      signIn: '/login',
    },
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // <-- Adicione isso
  });
  