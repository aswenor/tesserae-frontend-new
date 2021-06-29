import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContet';
import CardMedia from '@material-ui/core/Media';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import GetAppIcon from '@material-ui/icons/GetApp';


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