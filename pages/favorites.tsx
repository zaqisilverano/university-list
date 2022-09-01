import { Typography } from '@material-ui/core';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { UniversityCard } from '../components/university-card/university-card';
import useStyles from '../styles/pages/home.styles';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { getLocalStorage } from '../services/local-storage';
import { IUniversity } from '../types/types';
import { isObjectEmpty } from '../utils/utils';

const Favourites: NextPage = () => {
  const classes = useStyles();
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  
  const getFavoritesData = async () => {
    const favData = await getLocalStorage("favData");
    if (!isObjectEmpty(favData)) setUniversities(favData.data);
  }

  useEffect(() => {
    getFavoritesData();
  }, []);

  return (
    <>
      <h1>Favourites</h1>
      {universities.length ? (
          <div className={classes.listGrid}>
            {universities.map((item, index) => (
              <UniversityCard
                name={item.name}
                country={item.country}
                web={item.web_pages[0]}
                key={index + item.name}
                onFavouritesClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className={classes.noData}>
            <>
              <CloudOffIcon className={classes.noDataIcon} />
              <Typography variant="h5">No data available.</Typography>
            </>
          </div>
        )}
    </>
  );
}

export default Favourites
