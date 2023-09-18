import React from 'react';


export const CommentBox = (props) => {
    const { name, message } = props;
    return (
        <Box>
            <div> {name}</div>
            <div> {message}</div>
        </Box>
    )
};