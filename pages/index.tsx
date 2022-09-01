import { debounce, FormControl, InputLabel, MenuItem, Select, Typography, Snackbar } from '@material-ui/core';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../components/searchbar/searchbar';
import { UniversityCard } from '../components/university-card/university-card';
import useStyles from '../styles/pages/home.styles';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { Search } from '@material-ui/icons';
import { getLocalStorage, setLocalStorage } from '../services/local-storage';
import { IFavData, IUniversity } from '../types/types';
import { isObjectEmpty } from '../utils/utils';

const Home: NextPage = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortBy, setSortby] = useState("name");
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [open, setOpen] = useState(false);
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const fetchData = (search: string, searchBy: string) => {
    fetch(`http://universities.hipolabs.com/search?${searchBy}=${search}`)
      .then(res => res.json())
      .then((data: IUniversity[]) => {
        const universitiesSorted: IUniversity[] = data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        setUniversities(universitiesSorted);
      })
  }

  const debounceSearch = useCallback(
    debounce((search: string, searchBy: string) => fetchData(search, searchBy), 800),
    [],
  )

  const addToFavourites = async (university: IUniversity) => {
    const favData: IFavData = await getLocalStorage("favData") as IFavData;
    if (!isObjectEmpty(favData)) {
      if (favData.data.findIndex(item => item.name === university.name) === -1)
        setLocalStorage("favData", { data: [...favData.data, university] });
    } else {
      setLocalStorage("favData", { data: [university] });
    }

    setOpen(true);
  }

  useEffect(() => {
    if (search) debounceSearch(search, searchBy);
  }, [search, searchBy]);

  useEffect(() => {
    if (universities.length) {
      const universitiesSorted: IUniversity[] = universities.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      setUniversities([...universitiesSorted]);
    }
  }, [sortBy]);

  return (
    <>
      <Head>
        <title>Xendit | University List App</title>
        <meta name="description" content="University List App" />
      </Head>

      <main className={classes.main}>
        <div className={classes.searchWrapper}>
          <SearchBar
            search={search}
            searchBy={searchBy}
            onSearchChange={(value) => setSearch(value)}
            onSearchByChange={(value) => setSearchBy(value)}
          />
        </div>

        <div className={classes.listTitle}>
          <Typography variant="h4">University Lists</Typography>
          <FormControl variant="outlined">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortby(e.target.value as string)}
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"country"}>Country</MenuItem>
            </Select>
          </FormControl>
        </div>
        {universities.length ? (
          <div className={classes.listGrid}>
            {universities.map((item, index) => (
              <UniversityCard
                name={item.name}
                country={item.country}
                web={item.web_pages[0]}
                key={index + item.name}
                onFavouritesClick={() => addToFavourites(item)}
              />
            ))}
          </div>
        ) : (
          <div className={classes.noData}>
            {search ? (
              <>
                <CloudOffIcon className={classes.noDataIcon} />
                <Typography variant="h5">No data available.</Typography>
              </>
            ) : (
              <>
                <Search className={classes.noDataIcon} />
                <Typography variant="h5">Search Universities.</Typography>
              </>
            )}
          </div>
        )}
      </main>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Sucessfully Added to Favorites"
      />
    </>
  );
}

export default Home
