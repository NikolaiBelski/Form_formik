import { Formik, Form, Field, ErrorMessage,useField } from 'formik';
import { Children } from 'react/cjs/react.development';
import * as Yop from 'yup'

const MyTextInput = ({label,...props}) => {
const [field,meta] = useField(props)

    return (
        <>
        <label htmlFor={props.name}>{label}</label>
        <input {...props} {...field} />
        {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>) :null}
         
        </>
    )
}
 
const MyCheckInput = ({children,...props}) => {
    const [field,meta] = useField({...props,type:'checkbox'})
    
        return (
            <>
            <label className='checkbox'>
            
            <input type = 'checkbox' {...props} {...field} />
            {children}
            </label>
            {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>) :null}
             
            </>
        )
    }
    


const Forms= () => {


    return (
        <Formik
            initialValues={{
    name:'',
    email:'',
    amount:0,
    currency:'',
    text:'',
    terms:false
}}

validationSchema = { Yop.object({
    name: Yop.string()
             .min(2,"Недопустимая длинна строки")
             .required('Обязательное поле'),
    email : Yop.string()
                .email('Недопустимый адресс email') 
                .required('Обязательное поле'),
    amount : Yop.number()
                .min(2,"Не менее 5 символов")
                .required('Обязательное поле'),
    currency : Yop.string()
                  .required('Выберите валюту'),
    text : Yop.string()
                .min(10,"Не менее 10 символов"),
    terms : Yop.boolean()
                .required('Необходимо согласие')
                .oneOf([true],'Необходимо согласие')

                


})}

onSubmit = {values => console.log(JSON.stringify(values, null, 2))}    

>
        <Form className="form">
            <h2>Форма регистрации</h2>
            <MyTextInput label = 'Ваше имя' 
                         id="name"
                         name="name"
                         type="text"              
            />

               <MyTextInput label = 'Ваша почта' 
                           id="email"
                           name="email"
                           type="email"             
            />

              <MyTextInput label = 'Количество' 
                            id="amount"
                            name="amount"
                            type="number"           
            />
            <label htmlFor="currency">Валюта</label>
            <Field
                id="currency"
                name="currency" 
                as  = 'select' >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage className="error" name='currency' component={'div'}/>

            <label htmlFor="text">Ваше сообщение</label>
            <Field 
                id="text"
                name="text"
                as = 'texarea' />

             <ErrorMessage className="error" name='text' component={'div'}/>

       
                      
              <MyCheckInput  name="terms">
                 'Соглашаетесь с политикой конфиденциальности?'
              </MyCheckInput>
            <button type="submit">Отправить</button>
        </Form>
        </Formik>
    )
}

export default Forms;