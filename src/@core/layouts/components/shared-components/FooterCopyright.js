import { Link } from '@mui/material';
import Typography from '@mui/material/Typography'
function FooterCopyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Sadek Filling Station
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  export default FooterCopyright;