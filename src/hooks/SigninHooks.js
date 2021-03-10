import {useState} from 'react';
import { useAuth } from '../Contexts/AuthContext'

const useForm = (initialValues,validate) => {
	const [inputs,setInputs] = useState(initialValues);
	const [errors,setErrors] = useState({});
	const {signin}=useAuth();

  
	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
    console.log(validationErrors,noErrors)
		setErrors(validationErrors);
		if(noErrors){
			console.log("Authenticated",inputs);
			signin(inputs.email,inputs.password);
      initialValues.props.history.push("/converter");
		}else{
			console.log("errors try again",validationErrors);
		}
		
	}

	const handleInputChange = (event) => {
    	event.persist();
    	setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  	}

	return {
    	handleSubmit,
   		handleInputChange,
    	inputs,
    	errors
  	};
}

export default useForm;