import React from "react";

import { Cards, CountryPicker, Charts } from "./Components";
import { fetchData } from "./Api";
import styles from "./App.module.css";
import image from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    country:""
  };

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleCountryChange= async (country)=>{
   const fetchedData = await fetchData(country);
   console.log(fetchedData);

   this.setState({ data: fetchedData , country : country});

  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
      <img className = {styles.coronoImage} alt="COVID-19" src={image}/>
        <Cards data={data} />
        <CountryPicker handleCountryChange = {this.handleCountryChange}/>
        <Charts data={data} country={country}/>
      </div>
    );
  }
}

export default App;
