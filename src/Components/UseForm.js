import { useState } from 'react';

export default function UseForm(getFreshModelObject) {

    const [values, setValues] = useState(getFreshModelObject);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const resetForm = () => {
        setValues(getFreshModelObject);
        setErrors({});
      };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}