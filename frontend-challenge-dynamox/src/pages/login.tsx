// import { useEffect } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeUser } from '../features/user-slice';
// import { useNavigate } from 'react-router-dom';
// import { RootState, store } from '../features/store';

// import * as z from 'zod';

// const schema = z.object({
//   email: z.string().email('Email inválido'),
//   password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
// });


// export function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
//     resolver: zodResolver(schema),
//   });
//   const dispatch = useDispatch<typeof store.dispatch>();
//   const { token } = useSelector((state: RootState) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => { 
//     if (token) {
//       navigate('/dashboard');
//     }
//   }, [token, navigate]);

//   const onSubmit = (data: { email: string; password: string }) => {
//     dispatch(changeUser(data));
//   };
 
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Container maxWidth="sm">
//         <Box 
//           component="form" 
//           onSubmit={handleSubmit(onSubmit)} 
//           sx={{ 
//             mt: 4, 
//             display: 'flex', 
//             flexDirection: 'column', 
//             justifyContent: 'center', 
//             alignItems: 'center', 
//             minHeight: '80vh'
//           }}
//         >
//           <Typography variant="h4" gutterBottom>
//             Login
//           </Typography>

//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             {...register('email')}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />

//           <TextField
//             label="Senha"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             {...register('password')}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             // disabled={status === 'loading'}
//           >
//             {/* {status === 'loading' ? <CircularProgress size={24} /> : 'Entrar'} */}
//             Entrar
//           </Button>

//           {/* {error && <Typography color="error">{error}</Typography>} */}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

import * as React from 'react';

import { Layout } from '../components/auth/layout';
import { SignInForm } from '../components/auth/sign-in-form';

export function Login(): React.JSX.Element {
  React.useEffect(() => {
    document.title = `Sign in | Auth`;
  }, []);

  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}

