import React from "react";
import {CircularProgress} from "@mui/material";
import FriendRequestBtn from "../../atoms/buttons/FriendRequestBtn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PropTypes from "prop-types";
import {currentRequestPropTypes} from "../../../propTypes/currentRequestPropTypes";

const ProfileFriendRequestBtnContainer = ({
    currentRequest,
    handleAddToFriends,
    handleAccept,
    handleDeleteFromFriends,
    isCurrentUser,
    requestFetching,
    isLoading
}) => {
    return (
        <>
            {
                !isCurrentUser && (requestFetching ? <CircularProgress color="inherit" size={25}/> :
                        <>
                            <FriendRequestBtn
                                isLoading={isLoading}
                                onClick={handleAddToFriends}
                                isVisible={!!currentRequest?.is_not_friends}
                                text={"Add to friends"}
                                icon={<PersonAddIcon/>}
                            />
                            <FriendRequestBtn
                                isLoading={isLoading}
                                onClick={handleAccept}
                                isVisible={!!currentRequest?.is_incoming_request}
                                text={"Accept request"}
                                icon={<PersonAddIcon/>}
                            />
                            <FriendRequestBtn
                                isLoading={isLoading}
                                onClick={handleDeleteFromFriends}
                                isVisible={!!currentRequest?.is_friends}
                                text={"Delete from friends"}
                                icon={<PersonRemoveIcon/>}
                            />
                            <FriendRequestBtn
                                isLoading={isLoading}
                                onClick={handleDeleteFromFriends}
                                isVisible={!!currentRequest?.is_outgoing_request}
                                text={"Delete request"}
                                icon={<PersonRemoveIcon/>}
                            />
                        </>
                )
            }
        </>
    )
}

ProfileFriendRequestBtnContainer.propTypes = {
    currentRequest: currentRequestPropTypes,
    handleAddToFriends: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleDeleteFromFriends: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool,
    requestFetching: PropTypes.bool,
    isLoading: PropTypes.bool
}

ProfileFriendRequestBtnContainer.defaultProps = {
    isCurrentUser: false,
    requestFetching: false,
    isLoading: false
}

export default ProfileFriendRequestBtnContainer;
