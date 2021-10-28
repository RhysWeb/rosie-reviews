import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  media: {
    height: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function LessSimpleCard2(props) {
  const classes = useStyles();
  
  return (
    <Card elevation={4} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {props.header}
        </Typography>
        <Typography className={classes.pos} style={{'color': 'green'}}>
        {props.subheader1}
        </Typography>
        <Typography variant="body2" component="p">
          {props.text1}
        </Typography>
        <br/>
        <Typography className={classes.pos} style={{'color': 'green'}}>
        {props.subheader2}
        </Typography>
        <Typography variant="body2" component="p">
          {props.text2}
        </Typography>
        <br/>
        <Typography className={classes.pos} style={{'color': 'green'}}>
        {props.subheader3}
        </Typography>
        <Typography variant="body2" component="p">
          {props.text3}
        </Typography>
        <br/>
      </CardContent>
    </Card>
  );
}