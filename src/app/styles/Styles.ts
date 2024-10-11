import Fonts from "@assets/fonts";
import Colors from "./Colors";

const text = {
    frontTitle: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 20,
      color: Colors.primary,
    },
    // title: {
    //   ...Fonts?.SofiaPro.bold,
    //   fontSize: 14,
    //   color: Colors.black,
    // },
    subTitle: {
      ...Fonts?.SofiaPro.medium,
      fontSize: 13,
      color: Colors.secondary,
    },
    smallText: {
      ...Fonts?.SofiaPro.medium,
      fontSize: 12,
      color: Colors.grey,
    },
    bigText: {
      ...Fonts?.SofiaPro.medium,
      fontSize: 20,
      color: Colors.black,
    },
    topics: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 16,
      color: Colors.black,
    },
    values: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 16,
      color: Colors.primary,
    },
    link: {
      color: Colors.link,
    },
    header: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 20,
      color: Colors.secondary,
    },
    date: {
      ...Fonts?.SofiaPro.medium,
      fontSize: 10,
      color: Colors.black,
    },
    error: {
      ...Fonts?.SofiaPro.medium,
      fontSize: 10,
      color: Colors.red,
    },
    button: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 14,
      color: Colors.white,
    },

    ///// Updated version ///
    title: {
      ...Fonts?.SofiaPro.bold,
      fontSize: 20,
      color: Colors.black,
    },

    summary: {
      ...Fonts?.SofiaPro.light,
      fontSize: 15,
      color: Colors.black,
    },
    
  };
  const Styles = {
    text,
  };
  
  export default Styles;