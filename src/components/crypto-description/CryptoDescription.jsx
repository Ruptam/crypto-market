import { Box, Link, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import { theme } from '../../theme';

const CryptoDescription = (props) => {

    const [ selectedCoinDetail, setSelectedCoinDetail ] = useState({});

    const showFBIcon = () => {
        if (selectedCoinDetail.links.facebook_username !== undefined && selectedCoinDetail.links.facebook_username !== '') {
            const fbUrl = `https://www.facebook.com/${selectedCoinDetail.links.facebook_username}`;
            return (
                <FacebookIcon color='appSecondary' onClick={ () => {window.open(fbUrl, '_blank', 'noopener, noreferrer');
            } }/>
            )
        }
    }

    const showGithubIcon = () => {
        if (selectedCoinDetail.links.repos_url.github.length > 0) {
            const githubUrl = selectedCoinDetail.links.repos_url.github[0];
            return (
                <GitHubIcon color='appSecondary' onClick={ () => {window.open(githubUrl, '_blank', 'noopener, noreferrer');
            } }/>
            )
        }
    }

    const showTwitterIcon = () => {
        if (selectedCoinDetail.links.twitter_screen_name !== undefined && selectedCoinDetail.links.twitter_screen_name !== '') {
            const twitterUrl = `https://www.x.com/${selectedCoinDetail.links.twitter_screen_name}`;
            return (
                <XIcon color='appSecondary' onClick={ () => {window.open(twitterUrl, '_blank', 'noopener, noreferrer');
            } }/>
            )
        }
    }


    const showArticleIcon = () => {
        if (selectedCoinDetail.links.whitepaper !== undefined && selectedCoinDetail.links.whitepaper !== '') {
            const articleUrl = `${selectedCoinDetail.links.whitepaper}`;
            return (
                <ArticleIcon color='appSecondary' onClick={ () => {window.open(articleUrl, '_blank', 'noopener, noreferrer');
            } }/>
            )
        }
    }

    const showCoinImage = () => {
        if (selectedCoinDetail.image != undefined) {
            return (
                <Box>
                    <Box sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        padding: '5%', 
                        flexDirection: 'column', 
                        alignItems: 'center'
                    }}>
                        <img src={selectedCoinDetail.image.large} style={{ height: '20%', width: '30%' }} />
                        <Typography variant="h3" component="h2" >
                            <Link 
                                href={selectedCoinDetail.links.homepage[0]} 
                                underline="none" 
                                target='_blank'
                                color={ (theme) => theme.palette.appSecondary.main }
                            >
                                {selectedCoinDetail.name}
                            </Link>
                        </Typography>
                        <Box sx={{ display: 'flex'}}>
                            {
                                showTwitterIcon()
                            }
                            {
                                showFBIcon()
                            }
                            {
                                showGithubIcon()
                            }
                            {
                                showArticleIcon()
                            }
                        </Box>
                        
                    </Box>
                    <Box sx={{ padding: '2%'}}>
                        <Typography variant="body2" gutterBottom color={(theme) => theme.palette.appSecondary.main}>
                            {selectedCoinDetail.description.en.split('.')[0]}.
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h4" gutterBottom color={(theme) => theme.palette.appSecondary.main}>
                                Rank:
                            </Typography>
                            <Typography variant="h4" gutterBottom color={(theme) => theme.palette.appSecondary.main}>
                                {selectedCoinDetail.market_cap_rank}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h4" gutterBottom color={(theme) => theme.palette.appSecondary.main}>
                                Current Price:
                            </Typography>
                            <Typography variant="h4" gutterBottom color={(theme) => theme.palette.appSecondary.main}>
                                {selectedCoinDetail.market_data.current_price.ars}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
            )
        } 
        return(
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '5%', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="circular" width={100} height={100} /> <br />
                <Skeleton variant="rectangular" width={100} height={60} /> <br />
                <Skeleton variant="rectangular" width={100} height={60} /> <br />
                <Skeleton variant="rectangular" width={200} height={60} /> <br />
                <Skeleton variant="rectangular" width={150} height={60} /> <br />
                <Skeleton variant="rectangular" width={150} height={60} /> <br />
            </Box>
        )
    }

    useEffect(() => {
        const descriptionUrl = `https://api.coingecko.com/api/v3/coins/${props.selectedCoin.id}`;
        fetch(descriptionUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSelectedCoinDetail(data)
            }); 
    },[])
  return (
    <Box>
        {
            showCoinImage()
        }
    </Box>
  )
}

export default CryptoDescription