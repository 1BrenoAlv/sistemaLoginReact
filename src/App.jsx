import { useReducer } from 'react'
import './App.css'

const loginRedutor = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }
    case "login": {
      return {
        ...state,
        error: "",
      }
    }
    case "success": {
      return {
        ...state,
        login: true,
        senha: "",
      }
    }
    case "error": {
      return {
        ...state,
        error: "Usuário ou senha incorreto!",
        login: false,
        usuario: "",
        senha: "",
      }
    }
    case "logOut": {
      return {
        ...state,
        login: false,
        usuario: "",
      }
    }
    default: return state
  }
}

function App() {
  const [state, dispatch] = useReducer(loginRedutor, {
    usuario: "",
    senha: "",
    login: false,
    error: "",
  })

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "login" })
    try {
      if (state.usuario === "Usuario" && state.senha === "123@") {
        dispatch({ type: "success" })
      } else {
        throw new Error("Credenciais inválidas")
      }
    } catch (error) {
      dispatch({ type: "error" })
    }
  }

  return (
     <>
      <div className='containerMain'>
        <h1>Sistema de Login</h1>
        <div>
          {state.login ? (
            <div className='loginFeito'>
              <h2>Bem vindo(a) {state.usuario}!</h2>
              <button onClick={() => dispatch({ type: "logOut" })}>
                Sair
              </button>
            </div>
          ) : (
            <form className='formularioLogin' onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete='username'
                placeholder='Usuário'
                value={state.usuario}
                onChange={(e) => dispatch({
                  type: "field",
                  fieldName: "usuario",
                  payload: e.target.value,
                })}
              />
              <input
                type="password"
                autoComplete='current-password'
                placeholder='senha'
                value={state.senha}
                onChange={(e) => dispatch({
                  type: "field",
                  fieldName: "senha",
                  payload: e.target.value,
                })}
              />
              <button type='submit'>
                Entrar
              </button>
              <p className='mensagemErro'>{state.error}</p>
            </form>
          )}
        </div>
        <p className='assinatura'>by: Breno</p>
      </div>
    </>
  )
}

export default App