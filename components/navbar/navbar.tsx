import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const Navbar = (): JSX.Element => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.logo} >
          <Image
            onClick={() => router.push('/')}
            src="/xendit-logo.svg" alt="Xendit Logo" width={130} height={30}
          />
        </div>
        <Button color="inherit" onClick={() => router.push('/favorites')}>Favourites</Button>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };