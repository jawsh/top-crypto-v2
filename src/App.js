import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function App() {
    const [coins, setCoins] = useState([]);

    const getData = () => {
        axios.get("https://api.coincap.io/v2/assets?limit=10").then((res) => {
            setCoins(res.data.data);
        });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <List>
                {coins?.length ? (
                    coins?.map((coin) => {
                        const price = coin?.priceUsd.startsWith("0")
                            ? Number(coin?.priceUsd).toFixed(6)
                            : Number(coin?.priceUsd).toFixed(2);
                        const Change = () => {
                            return (
                                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                                    <span>{`${Number(coin?.changePercent24Hr).toFixed(2)}%`}</span>
                                    {coin?.changePercent24Hr.startsWith("-") ? (
                                        <ArrowDropDownIcon fontSize="small" sx={{ color: "red" }} />
                                    ) : (
                                        <ArrowDropUpIcon fontSize="small" sx={{ color: "green" }} />
                                    )}
                                </Box>
                            );
                        };

                        return (
                            <ListItem
                                onClick={() => window.open(coin?.explorer, "_blank")}
                                key={coin?.symbol}
                                sx={{
                                    borderBottom: "1px solid #c5c5c5",
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: "#c5c5c5",
                                    },
                                }}
                                secondaryAction={
                                    <ListItemText
                                        primary={`$${price}`}
                                        secondary={<Change />}
                                        secondaryTypographyProps={{ color: "white", textAlign: "right" }}
                                    />
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                                    ></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={coin?.name}
                                    secondary={`Rank ${coin?.rank}`}
                                    secondaryTypographyProps={{ color: "white" }}
                                    sx={{ mr: 10 }}
                                />
                            </ListItem>
                        );
                    })
                ) : (
                    <CircularProgress />
                )}
            </List>
            <code className="code">Powered by Coincap.io</code>
        </div>
    );
}

export default App;
