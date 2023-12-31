import React from 'react'
import {TextField, makeStyles} from '@material-ui/core'

export default function Input(props) {
    const { name, label, value,variant,error=null, onChange} = props;
    return (
        <TextField

            style={{width:'80%',}}
            variant={variant || "outlined"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
        
    )
}