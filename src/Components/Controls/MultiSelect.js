import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import {Box,Chip} from '@material-ui/core';
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
export default function MultiSelect(props) {
  const classes = useStyles();
  const{name,label,options,value,error=null,onChange}=props;
  return (
    <FormControl variant='outlined' className={classes.formControl}
      {...(error && {error:true})}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} style={{backgroundColor:"#daecf7"}}/>
            ))}
          </Box>
        )}
        label={label}
        value={value}
        name={name}
        onChange={onChange}
      >
        <MenuItem value=" "> </MenuItem>
        {
                    options.map(
                        item=>(<MenuItem className={classes.mItems} key={item.id} value={item.title} >{item.title}</MenuItem>)
                    ) 
                }
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

