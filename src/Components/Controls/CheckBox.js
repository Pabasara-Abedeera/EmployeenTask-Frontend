import React from 'react';
import { FormControlLabel,FormGroup,Checkbox} from '@material-ui/core';

export default function CheckBox(props) {
    const{label,name,value,onChange}=props;
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    });
    return(
        <FormGroup>
        <FormControlLabel control={<Checkbox name={name} color='primary' checked={value}
        onChange={(e)=>onChange(convertToDefEventPara(name, e.target.checked))} 
        />} label={label}/>
  </FormGroup>
    )

    
    
    
}