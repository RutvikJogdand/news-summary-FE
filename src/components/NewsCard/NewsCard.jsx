import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchSummary } from '../../redux/newsSlice';
import newsDefault from '../../assets/newsDefault.webp'
import './NewsCard.css'

const NewsCard = ({ article }) => {
  const [showSummary, setShowSummary] = useState(false);
  const dispatch = useDispatch();
  const { summaryStatus } = useSelector((state) => state.news);

  const handleSummaryClick = async () => {
    if (!article.summary) {
      await dispatch(fetchSummary(article));
    }
    setShowSummary(!showSummary);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className='main-card'>
        <CardMedia
        sx={{ height: 140 }}
        image={article.urlToImage ? article.urlToImage : newsDefault}
        title={article.title}
        />
        <CardContent className='description-box'>
            <Typography gutterBottom variant="h5" component="div">
                {article.title}
            </Typography>
              <small className='small-heading'>Source: {article.source.name}</small> <br/>
              <small className='small-heading'>Published on: {new Date(article.publishedAt).toDateString()} </small>
            <hr/>
            <Typography variant="body2" color="text.secondary">
                {article.description}
            </Typography>
        </CardContent>
        <CardActions>
            {showSummary && (
                <div className="summary" style={{ maxHeight: '50%', overflow: 'hidden' }}>
                {summaryStatus === 'loading' ? (
                <p>Loading summary...</p>
                ) : summaryStatus === 'failed' ? (
                <p>Error loading summary</p>
                ) : (
                article.summary
                )}
                </div>
            )}
        </CardActions>
        <div className='btn'>
            <Button onClick={handleSummaryClick} variant="outlined" size="small">
                {article.summary && showSummary ? 'Close Summary' : 'View Summary'}
            </Button>
        </div>
    </Card>
  );
};

export default NewsCard;
