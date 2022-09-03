export function RegisterMessages(error) {
  switch(error.code) {
    case "auth/email-already-in-use":
      return "E-mail em uso";
    case "auth/invalid-email":
      return "E-mail invalido";
    default:
      return "Ocorreu um erro ao fazer seu cadastro!";
  }
}