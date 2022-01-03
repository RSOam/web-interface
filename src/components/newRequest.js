import React, { useEffect } from 'react';
import { CircularProgress,TextField,Button,makeStyles,FormControl } from '@material-ui/core';
import './css/newRequest.css'
import {newRequest} from '../context'
import {useSelector,useDispatch} from 'react-redux'
import {isEmpty} from "lodash"
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 210,
      minHeight: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
    resultText:{
        minWidth:300
    },
    inputField:{
        minWidth:300,
        marginTop:theme.spacing(3)
    }
  }));
const initialFormValues ={
    chargerID:"",
}

export const NewRequest = () => {
    const classes = useStyles();
    const [formValues,setFormValues] = React.useState(initialFormValues);
    const [ result,setResult] = React.useState({}); 
    const [show,setShow] = React.useState(false);
    const [displayed,setDisplayed] = React.useState("");
    const loadingRequest = useSelector((state)=> state.user.loadingRequest);
    const dispatchR = useDispatch()
    const handleChange= e =>{
        const { name,value} = e.target
        setFormValues({
            ...formValues,
            [name]:value
        })
    }
    const handleRequest = () => {
        setShow(false)
        var tmpProps = {chargerID:formValues.chargerID}
        newRequest(dispatchR,tmpProps).then(res=> {setResult(res)})
        
    }
    useEffect(() => {
        if(!isEmpty(result)){
            setShow(true)
        }
    }, [result]);

    const showLoading = () => {
        return (
            <div>
                <CircularProgress size={60}/>
            </div>
        )
    }
    useEffect(() => {
        if(loadingRequest){
            setDisplayed("loading")
        }else if(!loadingRequest&&show){
            setDisplayed("result")
        }
    }, [loadingRequest,show]);
    const showResult = () => {
        return (
        <div>
            <h3>Name</h3>
            <TextField
                className={classes.resultText}
                variant="outlined"
                value={result.name}
                InputProps={{
                    readOnly: true,
                  }}
            ></TextField>
            <h3>Longitude</h3>
            <TextField
                className={classes.resultText}
                variant="outlined"
                value={result.longitude}
                InputProps={{
                    readOnly: true,
                  }}
            ></TextField>
            <h3>Latitude</h3>
            <TextField
                className={classes.resultText}
                variant="outlined"
                value={result.latitude}
                InputProps={{
                    readOnly: true,
                  }}
            ></TextField>
            <h3>averageRating</h3>
            <TextField
                className={classes.resultText}
                variant="outlined"
                value={result.averageRating}
                InputProps={{
                    readOnly: true,
                  }}
            ></TextField>
        </div>
                )
    }
    return (
        <div className="flexDir" >
            <div className="divOne" data-testit="requests" align="center">
                <h1 data-testid="requests-title">Get Charger</h1>
                <form>
                    <FormControl variant="outlined">
                        <TextField
                            variant="outlined"
                            label="Enter charger ID"
                            name="chargerID"
                            className={classes.inputField}
                            value={formValues.chargerID}
                            onChange={handleChange}>
                        </TextField>                        
                        <div style={{padding:"30px"}}>
                        <Button disabled={loadingRequest} variant="outlined" size="large" onClick={()=>handleRequest()}>Submit</Button>
                        </div>
                    </FormControl>    
                </form>
            </div>
            <div className="divTwo" align="center">
            <h1 data-testid="requests-title">Charger</h1>
            {{
                "": null,
                "loading": showLoading(),
                "result": showResult(),
                default: (
                null
                )
            }[displayed]}
            </div>
        </div>
    )
}