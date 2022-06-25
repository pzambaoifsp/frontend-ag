export const validEmailProf = new RegExp(
  "@ifsp([.])edu([.])br"
)

export const validEmail = new RegExp(
  /^[a-z0-9](\.?[a-z0-9]){1,}@(aluno([.]))?ifsp([.])edu([.])br$/
  // permite apenas email @ifsp.edu.br ou @aluno.ifsp.edu.b
)

export const validPassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
)

export const validPront = new RegExp(
  /^[a-zA-Z0-9]{9,}$/
)

export const validName = new RegExp(
  /^[a-zA-Z]{3,}$/
)

// !validEmail.test(email) ? setEmailErr(true) : setEmailErr(false)
// !validEmailAluno.test(email) ? setEmailProf(true) : setEmailProf(false)
// !validPassword.test(password) ? setPasswordErr(true) : setPasswordErr(false)
// !validPront.test(prontuario) ? setValidProntErr(true) : setValidProntErr(false)
// !validName.test(username) ? setValidNameErr(true) : setValidNameErr(false)
