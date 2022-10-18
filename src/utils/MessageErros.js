export function RegisterMessages(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "E-mail em uso!";
    case "auth/invalid-email":
      return "E-mail invalido!";
    default:
      return "Ocorreu um erro ao fazer seu cadastro!";
  }
}

export function LoginMessages(error) {
  switch (error.code) {
    case "auth/wrong-password":
      return "Senha incorreta!";
    case "auth/user-not-found":
      return "Usuário não existe!";
    default:
      return "Ocorreu um erro ao fazer login!";
  }
}

export function ForgotMessages(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "E-mail invalido!";
    case "auth/user-not-found":
      return "Usuário não existe!";
    default:
      return "Ocorreu um erro ao fazer login!";
  }
}
