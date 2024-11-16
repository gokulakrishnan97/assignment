import { useState } from "react";
import "./styles.css";
import { Filter } from "./components/filter/filter";
import { Chart } from "./components/chart/chart";
import * as Styles from "./style";
import Loader from "./helper/loader";

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading]: any = useState(false);
  let handleReport: any = (data: any) => {
    if(data.length === 0) {
    setChartData(data);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setChartData(data);
      }, 3000);
    }
    
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Styles.Container>
        <Filter report={handleReport} />
        {chartData.length > 0 ? <Chart chartData={chartData} /> : null}
      </Styles.Container>
    </div>
  );
}
