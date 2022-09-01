import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchField: {
    minWidth: 400,
    marginRight: 20,
    [theme.breakpoints.down('md')]: {
      minWidth: 300
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: 20
    }
  },
  searchDropdown: {
    minWidth: 150
  }
}));

type SearchBarProps = {
  search: string,
  searchBy: string,
  onSearchChange: (value: string) => void,
  onSearchByChange: (value: string) => void,
}

const SearchBar = ({ search, searchBy, onSearchChange, onSearchByChange}: SearchBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <TextField
        id="search"
        placeholder="Search university here.."
        variant="outlined"
        InputProps={{
          endAdornment: <SearchIcon />
        }}
        className={classes.searchField}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel id="search-by-label">Search By</InputLabel>
        <Select
          labelId="search-by-label"
          id="search-by"
          label="Search By"
          value={searchBy}
          onChange={e => onSearchByChange(e.target.value as string)}
          className={classes.searchDropdown}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"country"}>Country</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export { SearchBar };