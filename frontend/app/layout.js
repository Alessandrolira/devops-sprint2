export const metadata = {
  title: "PetCare",
  description: "Cadastro de usuários",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
