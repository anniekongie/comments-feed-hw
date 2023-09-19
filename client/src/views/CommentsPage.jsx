import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import CommentBox from '../components/CommentBox';
import { useEffect, useState } from 'react';


export const CommentsPage = () => {
    const mockComments = [{name: "Fake Author", message: "Message 1", created: "2023-08-19 15:15:00"}, {name: "Fake Author 2", message: "Message 2", created: "2023-07-4 1:09:00"}];
    const [ comments, setComments ] = useState(mockComments);
    const [ formValues, setFormValues ] = useState({ name: '', message: ''});
    const [nameError, setNameError] = useState(false);
    const [msgError, setMsgError] = useState(false);

    useEffect(() => {
        fetch(`/getComments`)
      .then((res) => res.json())
      .then((data) => { if (data.length) {setComments([...mockComments, ...data])}});
    }, []);
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let error = false;
        if (!formValues.name) {setNameError(true); error = true;}

        if (!formValues.message) {setMsgError(true); error = true;}
        if (!error) {
            await fetch('/createComment', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
              });
            location.reload();
        }
    };

    const handleDelete = async () => {
        await fetch('/deleteComments', {
            method: 'DELETE',
          });
        location.reload();
    };


    return (
        <Grid container direction='column' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Grid item data-testid='header-grid-item'>
                <Typography variant='h1'>Comments</Typography>
            </Grid>
            <Grid item data-testid='comment-form-grid-item'>
                    <form onSubmit={handleSubmit}>
                    <Box data-testid='comment-form-container' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography>Name</Typography>
                        <TextField size='small' sx={{ width: 400}} 
                            name='name'
                            type='text'
                            error={nameError}
                            helperText={nameError ? 'Required' : ''}
                            onChange={(e) => {setNameError(false); setFormValues({...formValues, name: e.target.value})}}
                        />
                        <Box sx={{marginTop: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}> 
                            <Typography>Comment</Typography>
                            <TextField multiline sx={{ width: 400}} 
                                name='message'
                                type='text'
                                error={msgError}
                                helperText={msgError ? 'Required' : ''}
                                onChange={(e) => {setMsgError(false); setFormValues({...formValues, message: e.target.value})}}
                            />
                        </Box>
                        <Box sx={{ marginTop: 1 }}>
                            <Button variant='contained' type='submit' disabled={nameError || msgError}>Comment</Button>
                        </Box> 
                        </Box>
                    </form>
            </Grid>
            <Grid container item direction="column" justifyContent='center' alignContent='center' sx={{
                my: 3
            }}>
            <Divider/>
            <Box sx={{ maxHeight: 350, overflowY: 'scroll', border: '1px solid', borderRadius: 1, padding: 2}}> 
                {comments.map((comment) => 
                <Box item key={`${comment.id}`} sx={{ marginTop: 2 }}> <CommentBox name={comment.name} message={comment.message} created={comment.created}/></Box>
                )} 
            </Box>

            <Grid item><Box sx={{ display: 'flex', justifyContent: 'right', my: 1}}><Button onClick={handleDelete} size='small' variant='outlined'>Delete all comments</Button></Box></Grid>
            </Grid>
        </Grid> 
    );
}