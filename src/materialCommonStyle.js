import { makeStyles } from "@material-ui/core/styles";
import flagImage from "./assets/arrow.jpeg";
//import { colors } from "../constant/constant";
const materialCommonStyle = makeStyles((theme) => ({
  customSelect: {
    FormControl:{
        styleOverrides:{
            root:{},
        },
    },
    MuiInputBase:{
        styleOverrides:{
          root:{},
        }
    },
    
    "& .MuiSvgIcon-root": {
      opacity: "0",
    },
    "& .MuiSelect-root": {
      paddingRight: "30px",
      "&:after": {
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        content: " '' ",
        width: "15px",
        height: "15px",
        backgroundImage: "url(" + flagImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: "10px",
      },
    },
    customFormControl: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    " & .sortByLabel": {
      marginTop: "50px !important",

      marginRight: theme.spacing(1), // Adjust as needed
    },
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: colors.grayBorder + "!important",
      borderRadius: "4px",
    },
    "& li": {
      fontSize: "16px",
      padding: "10px 15px",
      backgroundColor: "transparent !important",
      "&:hover": {
        // color: colors.primary,
        backgroundColor: "rgba(241,77,84,0.1) !important",
      },
      "&.MuiListItem-root.Mui-focusVisible": {
        backgroundColor: "transparent",
      },
      "&.Mui-disabled": {
        display: "none",
      },

      "&.Mui-selected, &.Mui-selected:hover": {},
      "& .MuiListItemText-root .MuiTypography-body1": {
        fontSize: "16px",
        lineHeight: "1.3",
      },
    },
  },
}));

export { materialCommonStyle };