import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./home.css";
import Steppr from "./stepper";
import { useEffect, useState } from "react";
import axios from "axios";
import Bottomnav from "./bottomnavbar";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import styled from "@emotion/styled";
import Navbar from "./navbar";
import { URL } from "../constants/userConstants";
import { useSelector } from "react-redux";
import extractColors from "extract-colors";
import Loader from "./loader";
import {
  getDisplayDate,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from "../utils/dateformat";

const RightSide = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Account = styled.h3`
  font-size: 12px;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const AddButton = styled(Button)`
  background-color: #008a36;
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: #008a36;
    color: #ffffff;
  }
`;

const Deatil = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  text-align: left;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const DeatilTop = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(170, 170, 170, 0.15);
  padding: 5px 20px;
`;

const Dot = styled.div`
  background-color: #1ca14d !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const Home = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(user, "user");
  const [upcoming, setUpcoming] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  console.log(URL, "url");
  const navigate = useNavigate();
  useEffect(() => {
    async function getupcoming() {
      if (user?._id) {
        const data = await axios.get(`${URL}/home/${user._id}`);
        const userdata = await axios.get(`${URL}/userdata`);
        console.log(userdata.data);
        setUpcoming(data.data.upcoming.results);
        setLive(data.data.live.results);
        setPast(data.data.past.results);
      }
    }
    getupcoming();
  }, [user]);
  useEffect(() => {
    const servertoken =
      localStorage.getItem("token") && localStorage.getItem("token");
    if (!servertoken) {
      navigate("/login");
    }
  }, []);
  console.log(past, live);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Navbar />

      <div className="matches">
        {past?.length > 0 ? (
          <>
            <h3>Completed matches</h3>
            {past.map((u) => (
              <div
                className="matchcontainer"
                onClick={() => navigate(`/contests/${u.id}`)}
              >
                <Top>
                  <h5
                    style={{
                      color: "#595959",
                      height: "3vh",
                      fontSize: "12px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {u.away.code} vs {u.home.code}
                  </h5>
                  <NotificationAddOutlinedIcon style={{ fontSize: "18px" }} />
                </Top>
                <div className="match">
                  <div className="matchcenter">
                    <div className="matchlefts">
                      <img src={u.teamAwayFlagUrl} alt="" width="40" />
                      <h5>{u.away.code}</h5>
                    </div>
                    <div className={u.result == "Yes" ? "completed" : "time"}>
                      {u.result === "Yes" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              textTransform: "uppercase",
                            }}
                          >
                            <Dot />
                            <h5 style={{ fontWeight: "600 !important" }}>
                              Completed
                            </h5>
                          </div>
                          <p
                            style={{ color: "#5e5b5b", textTransform: "auto" }}
                          >
                            {getDisplayDate(u.date, "i")}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="matchrights">
                      <h5> {u.home.code}</h5>
                      <img src={u.teamHomeFlagUrl} alt="" width="40" />
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div
                    style={{
                      display: "flex",
                      width: "150px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {u.teams.length > 0 && (
                      <div className="">{u.teams.length} teams</div>
                    )}
                    <div className="meg">
                      {u.contests.length > 0 && (
                        <h5>{u.contests.length} contests</h5>
                      )}
                    </div>
                  </div>
                  <div className="icon">
                    <PersonOutlineOutlinedIcon
                      style={{ color: "#595959", fontSize: "18px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className="matches">
        {upcoming?.length > 0 ? (
          <>
            <h3>Upcoming matches</h3>
            {upcoming.map((u) => (
              <div
                className="matchcontainer"
                onClick={() => navigate(`/contests/${u.id}`)}
              >
                <Top>
                  <h5
                    style={{
                      color: "#595959",
                      height: "3vh",
                      fontSize: "12px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {u.away.code} vs {u.home.code}
                  </h5>
                  <NotificationAddOutlinedIcon style={{ fontSize: "18px" }} />
                </Top>
                <div className="match">
                  <div className="matchcenter">
                    <div className="matchlefts">
                      <img
                        src={u.teamAwayFlagUrl}
                        alt=""
                        width="40"
                        height="40"
                        style={{ objectFit: "contain" }}
                      />
                      <h5>{u.away.code}</h5>
                    </div>
                    <h5 className={u.result == "Yes" ? "completed" : "time"}>
                      {!(u.result === "Yes") ? (
                        sameDayorNot(new Date(), new Date(u.date)) ||
                        isTommorrow(new Date(), new Date(u.date)) ? (
                          <div>
                            <p>{hoursRemaining(u.date)}</p>
                            <p
                              style={{
                                color: "#5e5b5b",
                                textTransform: "auto",
                              }}
                            >
                              {getDisplayDate(u.date, "i")}
                            </p>
                          </div>
                        ) : (
                          <p
                            style={{ color: "#e10000", textTransform: "auto" }}
                          >
                            {getDisplayDate(u.date, "i")}
                          </p>
                        )
                      ) : (
                        "Completed"
                      )}
                    </h5>
                    <div className="matchrights">
                      <h5> {u.home.code}</h5>
                      <img
                        src={u.teamHomeFlagUrl}
                        alt=""
                        width="40"
                        height="40"
                      />
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="meta">
                    <div className="mega">Mega</div>
                    <div className="meg">
                      <h5>59 crores</h5>
                    </div>
                  </div>
                  <div className="icon">
                    <PersonOutlineOutlinedIcon
                      style={{ color: "#595959", fontSize: "18px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Bottomnav />
    </>
  );
};

export default Home;
