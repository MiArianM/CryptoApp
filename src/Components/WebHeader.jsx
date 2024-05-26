import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import i18n from "./Translation/i18n";
import IranCities from "./GetIP/IranCities.json";

function WebHeader() {
  const [opened, setOpened] = useState(false);
  const [ip, setIp] = useState(null);
  const [location, setLocation] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);
  const [manualCountry, setManualCountry] = useState("");
  const [extrasidebar, setExtraSidebar] = useState(false);
  const OpenMobileMenu = () => {
    setOpened((opened) => !opened);
  };
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      }
    };

    fetchIp();
  }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (ip) {
          const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
          setLocation(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching the geolocation:", error);
      }
    };

    fetchLocation();
  }, [ip]); // Only depend on `ip`

  useEffect(() => {
    const fetchFlag = async () => {
      const countryCode = location ? location.country : manualCountry;
      try {
        if (countryCode) {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );
          setFlagUrl(response.data[0].flags.svg);
        }
      } catch (error) {
        console.error("Error fetching the country flag:", error);
      }
    };

    fetchFlag();
  }, [location, manualCountry]);
  const handleManualCountryChange = (e) => {
    setManualCountry(e.target.value);
    setLocation({ country: e.target.value });
  };
  const AtivatingSideBar = () => {
    setExtraSidebar(true);
  };
  const DeAtivatingSideBar = () => {
    setExtraSidebar(false);
  };
  return (
    <header>
      <div className="container">
        <nav className="Menu">
          <div onMouseLeave={DeAtivatingSideBar} className="ExtraInfos">
            <h4 className="sidebarButton" onMouseEnter={AtivatingSideBar}>
              ➲
            </h4>
            <div
              className={`ExtraInfos__Links ${
                extrasidebar && "ExtraInfos__Links--Activated"
              }`}
            >
              <a href="" className="Menu__Link Menu__Link--smaller">
                Login
              </a>
              <a
                href=""
                className="Menu__Link Menu__Link--Border Menu__Link--smaller"
              >
                Sign Up
              </a>
            </div>
          </div>
          <div className="Menu__wrapper">
            <a href="https://github.com/MiArianM" className="Logo">
              <img
                src="./src/Assest/Logo.png"
                alt="Mim Crypto Web"
                className="Logo__Img"
              />
            </a>

            {location ? (
              <div className="GeoInfo">
                <span className="GeoInfo__Items">
                  <img className="Nationality" src={flagUrl} />
                </span>
              </div>
            ) : (
              <img className="Nationality" src="./public/MahFlag.png" />
            )}
            <div className="Menu__Desktop">
              <ul className="DesktopMenuList">
                <li className="DesktopMenu__item">
                  <a href="" className="menuitem__link">
                    Prices
                  </a>
                </li>
                <li className="DesktopMenu__item">
                  <a href="" className="menuitem__link">
                    Products
                  </a>
                </li>
                <li className="DesktopMenu__item">
                  <a href="" className="menuitem__link">
                    Company
                  </a>
                </li>
                <li className="DesktopMenu__item">
                  <a href="" className="menuitem__link">
                    Learn
                  </a>
                </li>
              </ul>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="DesktopLanguage"
              >
                <option disabled value="en">
                  Choose Between{" "}
                </option>
                <option value="en">EN</option>
                <option value="fa">FA</option>
                <option value="de">DE</option>
              </select>
            </div>
          </div>

          <div className={`Menu__Mobile ${opened && "Menu__Mobile--Opened"}`}>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="Language"
            >
              <optgroup label="Language">
                <option disabled value="en">
                  Choose Between{" "}
                </option>
                <option value="en">English</option>
                <option value="fa">Farsi</option>
                <option value="de">Germany</option>
              </optgroup>
            </select>
            <ul className="MobileMenuList">
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link">
                  {t("Prices")}{" "}
                </a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link">
                  {t("Products")}
                </a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link">
                  {t("Company")}{" "}
                </a>
              </li>
              <li className="MobileMenu__item">
                <a href="" className="menuitem__link">
                  {t("Learn")}{" "}
                </a>
              </li>
            </ul>
            <div className="MobileMenu__Links">
              <a href="" className="MobileMenu__Link">
                {t("Login")}{" "}
              </a>
              <a href="" className="MobileMenu__Link MobileMenu__Link--Border">
                {t("Sign Up")}{" "}
              </a>
            </div>
            <hr />
            {location ? (
              <div className="GeoInfo">
                <h4>
                  <span className="GeoInfo__Text">
                    Connected From <br />
                  </span>

                  <span className="GeoInfo__Items">
                    <img className="Nationality" src={flagUrl} />
                    {location.city},{location.country}
                  </span>
                </h4>
              </div>
            ) : (
              <div className="GeoInfo">
                <div>
                  <select
                    className="manual-country"
                    value={manualCountry}
                    onChange={handleManualCountryChange}
                  >
                    <option value={""} selected disabled>
                      شما در ایران زندگی می کنید{" "}
                    </option>
                    {IranCities.map((city) => (
                      <option value={city.slug + ", ایران"} key={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="DesktopMenu__Links">
            <a href="" className="Menu__Link">
              Login
            </a>
            <a href="" className="Menu__Link Menu__Link--Border">
              Sign Up
            </a>
          </div>

          <div
            onClick={OpenMobileMenu}
            className={`Menu__MobileHamburger ${
              opened && "Menu__MobileHamburger--Opened"
            }`}
          >
            <span className="hamburgerLine"></span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default WebHeader;