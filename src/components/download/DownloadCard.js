import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContet';
import CardMedia from '@mui/material/Media';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import GetAppIcon from '@mui/icons-material/GetApp';


const useStyles = makeStyles(theme => ({

}));


function DownloadCard(props) {
  const { description, image, imageTooltip, url } = props;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          image={image}
          title={imageTooltip}
        />
        <CardContent>
          {description}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="primary"
          component={Link}
          href={url}
          size="medium"
          variant="contained"
        >
          <GetAppIcon />
          <Typography>
            Download
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}


DownloadCard.propTypes = {
  /**
   * Card body text.
   */
  description: PropTypes.string,

  /**
   * Image to display at the top.
   */
  image: PropTypes.string,

  /**
   * Image descriptive text.
   */
  imageTooltip: PropTypes.string,

  /**
   * Download url.
   */
  url: PropTypes.string
};


export default DownloadCard;