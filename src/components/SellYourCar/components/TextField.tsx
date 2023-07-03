import React from 'react'

import {TextField as MuiTextField ,TextFieldProps} from '@mui/material';


export const TextField:React.FC<Props> = (props) => {
    return ( 
        <MuiTextField
        fullWidth
        variant="filled"
        type="text"
       
        sx={{ gridColumn: "span 2" }}
        {...props}
        />
     );
}
 

type Props = TextFieldProps