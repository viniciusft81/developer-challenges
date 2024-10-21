import { Typography, Container } from '@mui/material';

export function Dashboard() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Dashboard!
      </Typography>
      <Typography variant="body1">
        Aqui você verá as informações do sistema após o login.
      </Typography>
    </Container>
  );
}
