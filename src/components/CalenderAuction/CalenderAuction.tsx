import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import useAuctionDate from "../../hooks/useAuctionDate";
import { Link } from "react-router-dom";

const CalenderAuction = () => {
  const [events, setEvents] = useState<{}[]>([]);

  const CalenderRef = React.useRef<any>();
  const { data } = useAuctionDate();
  React.useEffect(() => {
    if ((data as [])?.length > 0) {
      setEvents(
        data?.map((event) => ({ title: event.title, date: event.date })) as []
      );
    }
  }, [data?.length]);
  console.log(data);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          sx={{ backgroundColor: "#242424" }}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5" sx={{ color: "#fff" }}>
            Events
          </Typography>

          <List>
            {data?.map((event: any) => (
              <Link
                to={
                  event.extendedProps.status === "live auction"
                    ? "/AuctionLive/" + event.id
                    : "/Auctions/" + event.id
                }
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: "#ffcb3c",
                    color: "#242424",
                    margin: "10px 0",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    "@media (min-width: 600px)": {
                      flexDirection: "row",
                      alignItems: "flex-start",
                      textAlign: "left",
                    },
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.date, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={event.extendedProps.status}
                    secondary={
                      <Typography>
                        <span>Conditions book</span>
                        <br />
                        {event.extendedProps.notebook_conditions}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 70%" ml="10px" sx={{ width: "100%" }}>
          <FullCalendar
            ref={CalenderRef}
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CalenderAuction;
