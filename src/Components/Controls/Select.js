import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  mItems:{
    opacity:0.6,
    borderRadius:'50px',
    '&:hover':{
      opacity:1,
      backgroundColor:'#cde7fa',
      fontWeight:600
    }
  }
}));
export default function Select(props) {
  const classes = useStyles();
  const{name,label,options,value,disabled,error=null,onChange,placeholder}=props;
  return (
    <div>
    <FormControl variant='outlined' className={classes.formControl}
      {...(error && {error:true})}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      >
        <MenuItem value="">None</MenuItem>
        {
                    options.map(
                        item=>(<MenuItem className={classes.mItems} key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
    </div>
  );
}

