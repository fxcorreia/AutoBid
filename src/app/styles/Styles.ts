import Fonts from "@assets/fonts";
import Colors from "./Colors";

const text = {
  frontTitle: {
    ...Fonts?.SofiaPro.bold,
    fontSize: 20,
    color: Colors.primary,
  },
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
  values: {
    ...Fonts?.SofiaPro.bold,
    fontSize: 16,
    color: Colors.primary,
  },
  header: {
    ...Fonts?.SofiaPro.bold,
    fontSize: 20,
    color: Colors.secondary,
  },
  button: {
    ...Fonts?.SofiaPro.bold,
    fontSize: 16,
    color: Colors.white,
  },
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
  optionTitle: {
    ...Fonts?.SofiaPro.medium,
    fontSize: 16,
    color: Colors.black,
  },
};

const Styles = {
  text,
};

export default Styles;