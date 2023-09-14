import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(0.5, 1),
        backgroundColor: theme.palette.primary.main,
        height: "70px",
        display: "grid",
        gridTemplateColumns: "auto auto auto"
    },
    button: {
        padding: theme.spacing(1, 4),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `thin solid ${theme.palette.secondary.main}`,
        borderRadius: "10px",
        margin: theme.spacing(1),
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        cursor: "pointer",
        height: "50px",
        "&:hover": {
            color: theme.palette.secondary.main
        }
    },
    username: {
        textTransform: "none",
        letterSpacing: "inherit",
        fontSize: "15px",
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "contents"
        }
    },
    logo: {
        height: "50px"
    },
    logoContainer: {
        justifySelf: "self-start",
        alignSelf: "center",
        width: "45px",
        overflow: "hidden",
        [theme.breakpoints.up("md")]: {
            width: "auto"
        }
    },
    currentUser: {
        justifySelf: "self-end",
        alignSelf: "center"
    },
    buttonsContainer: {
        placeSelf: "center",
        placeItems: "center"
    },
    userButton: {
        margin: 0,
        border: "none",
        padding: theme.spacing(1, 2),
        display: "flex",
        alignItems: "center"
    },
    buttonText: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "contents"
        }
    },
    avatar: {
        margin: theme.spacing(0, 1),
    },
    homeButton: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "inline-block"
        }
    }
}));