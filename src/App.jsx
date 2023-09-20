import { useForm } from 'react-hook-form'

export default function App() {
  /*
  register=registra todos los campos del formulario
  handleSubmit=maneja el envio del formulario
  formState=es un objeto que revisa el estado del formulario el cual trae mas propiedades como el error
  */
  const { register, handleSubmit, formState: {
    errors,
  },
    watch,setValue,reset

  } = useForm({
    defaultValues:{
      nombre:"juan",
      correo:"andres@gmail.com"
    }
  })
  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    alert('enviando datos...')
    reset()
  })
  return (
    <>

    <h1>Formulario Validación </h1>
    <h2>Con React Hoook Forms</h2>
    <div className='formularioCont card'>
    <form onSubmit={onSubmit} >
      <label className='form-label' htmlFor="nombre">Nombre</label>
      <input  className='form-control' type="text" {...register("nombre", {
        required: {
          value: true,
          message: 'Nombre requerido'
        },
        minLength: {
          value: 2,
          message: 'Nombre debe tener al menos 2 caracters'
        },
        maxLength: {
          value: 20,
          message: 'Nombre debe tener maximo 20 caracteres'
        },
      })} />
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }




      <label htmlFor="correo">Correo</label>
      <input  className='form-control' type="text" {...register("correo",
        {
          required: {
            value: true,
            message: 'Correo requerido'
          },
          pattern: {
            value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]/,
            message: "correo no valido asegurate que sea en formato andres@gmail.com"
          }

        })} />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      <label htmlFor="password">Password</label>
      <input  className='form-control' type="password" {...register("password", {
        required: {
          
            value: true,
            message: 'El password es requerido'
          },
          minLength:{
            value :6 ,
            message:'El password debe tener al menos seis caracteres'
          }
      })} />
      {
        errors.password && <span>{errors.password.message}</span>
      }

      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input  className='form-control' type="password" {...register("confirmarPassword", {
        required: {
          value: true,
          message: 'El confirmar password es requerido',
        },
        validate:value=> value===watch('password')||'los password no coinciden'

      })} />
      {
        errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
      }

      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input  className='form-control' type="date"{...register("fechaNacimiento",
        {
          required: {
            value: true,
            message: 'Fecha de nacimiento es requerida'
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
            return edad >= 18 || "debe ser mayor de edad"
          },
        })} />
      {
        errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
      }


      <label htmlFor="pais">País</label>
      <select className='form-select' {...register("pais")} >
        <option value="mx">México</option>
        <option value="col">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {
        watch('pais')==='ar'&&(
        <>
          <input  className='form-control' type="text" placeholder='Provincia'
          {...register('provincia',{
            required:{
              value:true,
              message:"Provinvia requerida"
            }
          })} />

{
        errors.provincia && <span>{errors.provincia.message}</span>
      }
        </>
        )
      }

      <label htmlFor="file">Foto de perfil</label>
      <input type="file" onChange={(e)=>{
        setValue('fotousuario',e.target.files[0].name)
      }} />

      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input  className='form-check-input' type="checkbox" {...register("terminos",{
        required:{
          value:true,
          message:'debes aceptar los términos y condiciones'
        }
      })} />
      {
        errors.terminos && <span>{errors.terminos.message}</span>
      } <br />

      <button className='btn bto'>Enviar</button>
      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>

    </form>
    </div>
    </>
  )
}
