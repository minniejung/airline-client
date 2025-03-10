import Head from "next/head";
import { useState } from "react";
import { getFlight } from "../api/FlightDataApi";
import FlightList from "./component/FlightList";
import LoadingIndicator from "./component/LoadingIndicator";
import Search from "./component/Search";
import Debug from "./component/Debug";

import { FiMenu, FiSun } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import { TbCircleLetterMFilled } from "react-icons/tb";

export default function Main() {
  const [condition, setCondition] = useState({
    departure: "ICN",
    destination: "",
  });

  const [flightList, setFlightList] = useState([]);

  const [loading, setLoading] = useState(false);

  const search = async ({ departure, destination }) => {
    setCondition({ departure, destination });

    setLoading(true);

    try {
      const flights = await getFlight({ departure, destination });
      setFlightList(flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  global.search = search; // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  return (
    <div>
      <Head>
        <title>Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="header">
          <div className="headerLeft">
            <FiMenu />
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg"
              alt="google-logo"
            />
          </div>
          <div className="headerRight">
            <FiSun />
            <CgMenuGridO />
            <TbCircleLetterMFilled />
          </div>
        </div>

        <div className="container">
          <div className="banner">
            <img
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
              alt="google-flight-banner"
            />
            <p>Flights</p>
          </div>

          <div className="content">
            <Search onSearch={search} />
            <div className="table">
              <div className="row-header">
                <div className="col">출발</div>
                <div className="col">도착</div>
                <div className="col">출발 시각</div>
                <div className="col">도착 시각</div>
                <div className="col"></div>
              </div>

              {loading ? (
                <LoadingIndicator />
              ) : (
                <FlightList list={flightList} />
              )}
            </div>
            <div className="debug-area">
              <Debug condition={condition} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
