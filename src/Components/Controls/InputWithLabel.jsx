import React from 'react'
import {TextField} from '@material-ui/core'

export default function InputWithLabel(props) {
    const { name, label, value,variant,error=null,onChange,defaultValue} = props;
    return (
        <TextField
            InputLabelProps={{ shrink: true }}
            style={{width:'80%',}}
            variant={variant || "outlined"}
            label={label}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
        
    )
}