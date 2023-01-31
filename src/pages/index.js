import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Icon from 'src/@core/components/icon'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import FooterCopyright from 'src/@core/layouts/components/shared-components/FooterCopyright'
import { Paper, Card, CardMedia, CardContent, List, ListItem } from '@mui/material'

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: `${theme.spacing(20)} !important`,
  paddingBottom: `${theme.spacing(20)} !important`,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: `${theme.spacing(20)} !important`,
    paddingRight: `${theme.spacing(20)} !important`
  }
}))
function IndexHome() {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Image src={'/images/front/logo.png'} width={50} height={60} />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 1 }} color='common.white'>
              Sadek Filling Station
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <Icon icon={'tabler:menu-2'} fontSize='1.625rem' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>wewqeqw</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key={1}
                component={Link}
                href='/aa'
                variant='contained'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                3123123
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth='sm'>
          <Typography component='h1' variant='h2' align='center' color='text.primary' gutterBottom>
            Album layout
          </Typography>
          <Typography variant='h5' align='center' color='text.secondary' paragraph>
            Something short and leading about the collection below—its contents, the creator, etc. Make it short and
            sweet, but not too short so folks don&apos;t simply skip over it entirely.
          </Typography>
          <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
            <Button variant='contained'>Main call to action</Button>
            <Button variant='outlined'>Secondary action</Button>
          </Stack>
        </Container>
      </Box>

      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          height: 500,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${'/slide-1.jpg'})`
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={'/slide-1.jpg'} alt={'Petrol Pump'} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)'
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 }
              }}
            ></Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ pt: 8, pb: 8 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 6,
                height: '100%',
                display: 'flex',
                // borderRadius: 1,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                // border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant='h3' component='h2' sx={{ mb: 1.5, fontWeight: 700 }} color='#7367f0'>
                SADEK FILLING STATION
              </Typography>

              <Typography variant='h6' sx={{ mb: 1.5 }}>
                Sadek Filling Station is one of the pioneers in the filling station industry of Dhaka. Sadek Filling
                Station is founded by renowned politician and Parliament Member Alhaj Mohammad Sadek Khan (Dhaka-13).
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 6,
                height: '100%',
                display: 'flex',
                // borderRadius: 1,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                // border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant='body1' sx={{ mb: 1.5 }}>
                At Sadek Filling Station we provide the best possible service. We are the proud dealer of Padma Oil Co.
                Ltd. One of the best in the country. Our service providers are fast and humble. We have a service rating
                of 4.7 out of 5.
              </Typography>
              <List>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='3.225rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    At Sadek Filling Station we maintain community standards at the highest level. Our filling station
                    is not only safe but also well maintained.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='5.225rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    Our goal is to not only to provide a safe environment and services but to ensure the prosperity of
                    our community. That is why we arrange charity programs every season. Because we love to spread
                    happiness.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='2.1rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    You are cordially invited to our filling center and experience it yourself.
                  </Typography>
                </ListItem>
              </List>
              <Typography sx={{ color: '#7367f0', mb: 1.5, ml: 4, fontWeight: 700, fontSize: '1.6rem' }}>
                Address : 32/A/18 SADEK FILLING STATION, RAYER BAZAR, BERIBADH ROAD, MOHAMMADPUR
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Card>
        <StyledCardContent>
          <Typography
            sx={{
              color: '#a6a0e0',
              mb: 6,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '2.625rem',
              textDecoration: 'underline',
              lineHeight: 1.385
            }}
          >
            OUR SERVICES
          </Typography>
          <Typography sx={{ mb: 6, fontWeight: 500, textAlign: 'center', fontSize: '1.225rem', lineHeight: 1.385 }}>
            We provide 3 types of fuel All of our fuels are tested by BUET and a purity rate of 97%. At Sadek Filling
            Station we do not only provide fuels but also provide car and bike washing service.
          </Typography>
          <Grid container spacing={6} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sm={12} lg={4} key={1}>
              <Box
                sx={{
                  p: 6,
                  height: '100%',
                  display: 'flex',
                  borderRadius: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                  // border: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ mb: 1.5, minHeight: 58, display: 'flex' }}>
                  {/* <img height='58' src={} alt={article.title} /> */}
                  <Icon icon={'mdi:oil-truck'} color='black' fontSize='3.625rem' />
                </Box>

                <Typography variant='h6' sx={{ mb: 1.5 }}>
                  Diesel
                </Typography>
                <Typography
                  sx={{
                    my: 'auto',
                    // overflow: 'hidden',
                    WebkitLineClamp: '2',
                    display: '-webkit-box',
                    color: 'text.secondary',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    color: 'black'
                  }}
                >
                  Diesel engines in trucks, trains, boats, and barges help transport nearly all products people consume.
                  Diesel fuel is commonly used in public buses and school buses.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} key={1}>
              <Box
                sx={{
                  p: 6,
                  height: '100%',
                  display: 'flex',
                  borderRadius: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                  // border: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ mb: 1.5, minHeight: 58, display: 'flex' }}>
                  <Icon icon={'openmoji:oil-drum'} color='black' fontSize='4.625rem' />
                </Box>

                <Typography variant='h6' sx={{ mb: 1.5 }}>
                  Octane
                </Typography>
                <Typography
                  sx={{
                    my: 'auto',
                    // overflow: 'hidden',
                    WebkitLineClamp: '2',
                    display: '-webkit-box',
                    color: 'text.secondary',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    color: 'black'
                  }}
                >
                  Octane is a gasoline additive that is needed for the proper functioning of modern engines. Octane
                  sources have taken many forms throughout the years, both renewable and petroleum-based.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} key={1}>
              <Box
                sx={{
                  p: 6,
                  height: '100%',
                  display: 'flex',
                  borderRadius: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                  // border: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ mb: 1.5, minHeight: 58, display: 'flex' }}>
                  <Icon icon={'ri:oil-fill'} color='black' fontSize='3.625rem' />
                </Box>

                <Typography variant='h6' sx={{ mb: 1.5 }}>
                  Mobil
                </Typography>
                <Typography
                  sx={{
                    my: 'auto',
                    overflow: 'hidden',
                    WebkitLineClamp: '2',
                    display: '-webkit-box',
                    color: 'text.secondary',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    color: 'black'
                  }}
                >
                  Mobil 1's robust antioxidant system resists oxidation and oil thickening better than conventional
                  oils, resulting in lower friction and better fuel economy.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledCardContent>
      </Card>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} sx={{ pt: 8, pb: 8 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 6,
                height: '100%',
                display: 'flex',
                // borderRadius: 1,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                // border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant='h3' component='h2' sx={{ mb: 1.5, fontWeight: 700 }} color='#7367f0'>
                SADEK FILLING STATION
              </Typography>

              <Typography variant='h6' sx={{ mb: 1.5 }}>
                Sadek Filling Station is one of the pioneers in the filling station industry of Dhaka. Sadek Filling
                Station is founded by renowned politician and Parliament Member Alhaj Mohammad Sadek Khan (Dhaka-13).
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 6,
                height: '100%',
                display: 'flex',
                // borderRadius: 1,
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                // border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant='body1' sx={{ mb: 1.5 }}>
                At Sadek Filling Station we provide the best possible service. We are the proud dealer of Padma Oil Co.
                Ltd. One of the best in the country. Our service providers are fast and humble. We have a service rating
                of 4.7 out of 5.
              </Typography>
              <List>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='3.225rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    At Sadek Filling Station we maintain community standards at the highest level. Our filling station
                    is not only safe but also well maintained.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='5.225rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    Our goal is to not only to provide a safe environment and services but to ensure the prosperity of
                    our community. That is why we arrange charity programs every season. Because we love to spread
                    happiness.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Icon icon='mdi:tick-all' color='#7367f0' fontSize='2.1rem' />
                  <Typography sx={{ mb: 1.5, ml: 4 }}>
                    You are cordially invited to our filling center and experience it yourself.
                  </Typography>
                </ListItem>
              </List>
              <Typography sx={{ color: '#7367f0', mb: 1.5, ml: 4, fontWeight: 700, fontSize: '1.6rem' }}>
                Address : 32/A/18 SADEK FILLING STATION, RAYER BAZAR, BERIBADH ROAD, MOHAMMADPUR
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, backgroundColor: 'black' , textAlign:"center"}}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{color:"white"}}>
            1
          </Grid>
          <Grid item xs={4}>
            2
          </Grid>
          <Grid item xs={4}>
            3
          </Grid>
        </Grid>
      </Box>

      <Container
        maxWidth='md'
        component='footer'
        sx={{
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6]
        }}
      >
        <Grid container spacing={4} justifyContent='space-evenly'>
          <Grid item xs={6} sm={3}>
            <Typography variant='h6' color='text.primary' gutterBottom>
              asdas
            </Typography>
            <ul>
              <li>
                <Link href='#' variant='subtitle1' color='text.secondary'>
                  sadd
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <FooterCopyright sx={{ mt: 5 }} />
      </Container>
    </>
  )
}
IndexHome.getLayout = page => <BlankLayout>{page}</BlankLayout>
IndexHome.guestGuard = true
export default IndexHome
