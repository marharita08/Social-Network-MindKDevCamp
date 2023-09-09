import React from "react";
import {Autocomplete} from "@mui/material";
import PropTypes from "prop-types";
import {usersForSearchPropTypes} from "../../../propTypes/userPropTypes";
import SearchField from "./SearchField";
import SearchUsersOption from "./SearchUsersOption";
import {useStyles} from "./style";

const SearchUsers = ({users, addToFriends, accept, deleteFromFriends, isFetching}) => {

    const classes = useStyles();

    return (
        <>
            <Autocomplete
                className={classes.search}
                options={users}
                freeSolo
                getOptionLabel={(option) => `${option.name} ${option.email}`}
                groupBy={(option) => option.name[0].toUpperCase()}
                renderOption={
                    (props, option) => (
                        <SearchUsersOption
                            key={option.user_id}
                            user={option}
                            addToFriends={addToFriends}
                            deleteFromFriends={deleteFromFriends}
                            accept={accept}
                        />
                    )
                }
                renderInput={
                    props =>
                        <SearchField
                            isFetching={isFetching}
                            {...props}
                        />
                }
            />
        </>
    );
};

SearchUsers.propTypes = {
    addToFriends: PropTypes.func.isRequired,
    accept: PropTypes.func.isRequired,
    deleteFromFriends: PropTypes.func.isRequired,
    users: usersForSearchPropTypes,
    isFetching: PropTypes.bool
};

export default SearchUsers;
