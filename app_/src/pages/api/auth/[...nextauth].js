import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    name: 'unesc',
    email: 'trabalho@unesc.com',
    password: bcrypt.hashSync('senha', 10),
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
        const user = users.find((user) => user.email === credentials.email);
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email }; // Retorne o usuário se autenticar corretamente
        }
        return null; // Retorne null se não encontrar o usuário ou falhar na autenticação
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redireciona para a página de login
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
  debug: true,
});