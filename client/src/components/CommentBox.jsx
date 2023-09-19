import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
import { Typography } from '@mui/material';
import { formatDtStringWithDate, formatDtStringWithDayOfWeek, isInCurrentWeek } from '../utils/dateUtils';

const CommentBox = (props) => {
    const { name, message, created } = props;

    const formattedDt = isInCurrentWeek(created) ? formatDtStringWithDayOfWeek(created) : formatDtStringWithDate(created);
    return (
        <Box sx={{ 
            border: 'solid 2px',
            borderRadius: 1,
            width: 400,
        }}>
            <Box sx={{margin: 1}} >{message}</Box>
            <Box sx={{mt: 2, mb: 1, mx: 1}}>
                <Typography variant='caption'>{`${name} on ${formattedDt}`}</Typography>
            </Box>
            
        </Box>
    )
};

CommentBox.propTypes = {
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
}

export default CommentBox;