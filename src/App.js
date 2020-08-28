import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBackground: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    cardPage: {
        maxWidth: 500
    },

    formPage: {
        margin: theme.spacing(1),
    },

    formInput:{
        width: '100%'
    }
}));


function App() {
    const classes = useStyles();
    const [isMale, setMale] = useState(false);
    const [isFemale, setFemale] = useState(false);
    const [isUndefined, setUndefined] = useState(false);
    let gender = "";

    const getGenderRequest = (name) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', "https://api.genderize.io?name=" + name, false)
        xhr.send();
        if (xhr.status !== 200) {
            alert( xhr.status + ': ' + xhr.statusText );
          } else {
            let data = xhr.response;
            data = JSON.parse(data).gender;
            gender = data;
        }
    }

    const handleFindGenderByName = () => {
        let name = document.getElementById("filled-basic").value;
        getGenderRequest(name);
        if(gender === "male"){
            setMale(true);
            setFemale(false);
            setUndefined(false);
        }
        else if (gender === "female"){
            setMale(false);
            setFemale(true);
            setUndefined(false);
        }
        else if (gender === null){
            setMale(false);
            setFemale(false);
            setUndefined(true);
        }
    }

    return (
        <div className={classes.appBackground}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Узнай пол по имени
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.drawerHeader}/>
                <Container>
                    <Card className={classes.cardPage}>
                        <form className={classes.formPage} noValidate autoComplete="off">
                            <CardContent>
                                <TextField className={classes.formInput} id="filled-basic" label="Введи свое транслитерированое имя (Латиницей)" variant="filled"/>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={handleFindGenderByName}>
                                    Узнать пол
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Container>
                <div className={classes.drawerHeader}/>
                <Container className={classes.root} > 
                    {isMale === true &&
                        <Card className={classes.cardPage}>
                            <CardContent>
                                <CardHeader title="Мужчина"/>
                            </CardContent>
                         </Card>
                    }
                    {isFemale === true &&
                        <Card className={classes.cardPage}>
                            <CardContent>
                                <CardHeader title="Женщина"/>
                            </CardContent>
                        </Card>
                    }
                    {isUndefined === true &&
                        alert("Не удалось определить пол.")
                    }
                </Container>
            </main>
        </div>
    );
}

export default App;
