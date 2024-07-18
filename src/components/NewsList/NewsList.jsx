import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../NewsCard/NewsCard';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { fetchNews, setQuery, setFromDate, setToDate, setPage } from '../../redux/newsSlice';
import './NewsList.css'

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

const NewsList = (props) => {
  const dispatch = useDispatch();
  const { articles, totalPages, query, from, to, page, status } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ query, from, to, page }));
  }, [dispatch, query, from, to, page]);

  const handleSearchChange = (event) => {
    dispatch(setQuery(event.target.value));
  };

  const handleFromDateChange = (event) => {
    dispatch(setFromDate(event.target.value));
  };

  const handleToDateChange = (event) => {
    dispatch(setToDate(event.target.value));
  };

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <>
     <CssBaseline />
      <AppBar color='inherit'>
        <Toolbar>
          <Typography variant="h6" component="div">
            <div className='text-boxes-container'>
                <TextField label="Search" variant="outlined" value={query} onChange={handleSearchChange} />
                <TextField label="From" type="date" InputLabelProps={{ shrink: true }} value={from} onChange={handleFromDateChange} />
                <TextField label="To" type="date" InputLabelProps={{ shrink: true }} value={to} onChange={handleToDateChange} />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    <div className='main-container'>

      <Stack spacing={2}>
        {/* <div className='flex-container'>
            <TextField label="Search" variant="outlined" value={query} onChange={handleSearchChange} />
            <TextField label="From" type="date" InputLabelProps={{ shrink: true }} value={from} onChange={handleFromDateChange} />
            <TextField label="To" type="date" InputLabelProps={{ shrink: true }} value={to} onChange={handleToDateChange} />
        </div> */}
        {status === 'loading' && <p>Loading...</p>}
        <div className='flex-container'>
            {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
            ))}
        </div>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Stack>
    </div>
    <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default NewsList;