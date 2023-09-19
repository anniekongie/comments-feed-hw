import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid, TextField, Typography } from '@mui/material';
import CommentBox from '../components/CommentBox';
import { useEffect, useState } from 'react';


export const CommentsPage = () => {
    const [ comments, setComments ] = useState([{name: "Fake Author", message: "Message 1", created: "2023-08-19 15:15:00"}, {name: "Fake Author 2", message: "Message 2", created: "2023-07-4 1:09:00"}]);
    const [ formValues, setFormValues ] = useState({ name: '', message: ''});

    useEffect(() => {
        fetch(`/getComments`)
      .then((res) => res.json())
      .then((data) => { if (data.length) {setComments([...comments, ...data])}});
    }, []);
    
    const handleSubmit = async () => {
        await fetch('/createComment', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          });
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
                            onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                        />
                        <Box sx={{marginTop: 1}}> 
                            <TextField multiline sx={{ width: 400}} 
                                name='message'
                                type='text'
                                onChange={(e) => setFormValues({...formValues, message: e.target.value})}
                            />
                        </Box>
                        <Box sx={{ marginTop: 1 }}>
                            <Button variant='contained' type='submit'>Submit</Button>
                        </Box> 
                        </Box>
                    </form>
                
            </Grid>
            <Grid container item direction="column" justifyContent='center' alignContent='center' sx={{
                my: 3
            }}>
            {comments.map((comment) => 
                <Grid item key={`${comment.name}-${comment.created}`} sx={{ marginTop: 2 }}> <CommentBox name={comment.name} message={comment.message} created={comment.created}/></Grid>
            )} 
            </Grid>
        </Grid> 
    );
}