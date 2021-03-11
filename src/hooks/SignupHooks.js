import {useState} from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../Contexts/AuthContext'

const useForm = (initialValues,validate) => {
	const [inputs,setInputs] = useState(initialValues);
	const [errors,setErrors] = useState({});
	const {signup,SigninWithGoogle}=useAuth();
	toast.configure();

  
	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
    console.log(validationErrors,noErrors)
		setErrors(validationErrors);
		if(noErrors){
			console.log("Authenticated",inputs);
			signup(inputs.email,inputs.password,inputs.name,inputs.mobile);
			toast.success("Account Created Successfully");
      initialValues.props.history.push("/signin");
		}else{
			console.log("errors try again",validationErrors);
			toast.error("Check your Inputs");
		}
		
	}

	const handleInputChange = (event) => {
    	event.persist();
    	setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  	}

		const handleGoogle= () =>{
			SigninWithGoogle();
			initialValues.props.history.push("/converter");
		}
	return {
    	handleSubmit,
   		handleInputChange,
			handleGoogle,
    	inputs,
    	errors
  	};
}

export default useForm;
