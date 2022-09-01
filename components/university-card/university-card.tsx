import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: "auto"
  }
});

type CardProps = {
  name: string;
  country: string;
  web: string;
  onFavouritesClick: () => void;
}

const UniversityCard = ({ name, country, web, onFavouritesClick }: CardProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Card className={classes.card} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {country}
          </Typography>
          <a href={web}>{web}</a>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onFavouritesClick()}>
          Add to Favorites
        </Button>
      </CardActions>
    </Card>
  );
}

export { UniversityCard };