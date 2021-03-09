import {useState} from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useForm = (initialValues,validate) => {
	const [inputs,setInputs] = useState(initialValues);
	const [errors,setErrors] = useState({});

	toast.configure();

  
	const handleSubmit = (event) => {
		event.preventDefault();
		const validationErrors = validate(inputs);
		const noErrors = Object.keys(validationErrors).length === 0;
    console.log(validationErrors,noErrors)
		setErrors(validationErrors);
		if(noErrors){
			console.log("Authenticated",inputs);
      let user={name:inputs.name,mobile:inputs.mobile,email:inputs.email};
      localStorage.setItem('user',JSON.stringify(user));
			toast.success("Account Created Successfully");
      // initialValues.props.history.push("/signin");
		}else{
			console.log("errors try again",validationErrors);
			toast.error("Check your Inputs");
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
