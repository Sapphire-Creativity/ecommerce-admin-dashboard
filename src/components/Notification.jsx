import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Your Dashboard",
      message: "Thanks for joining! Explore your account settings.",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Password Changed",
      message: "Your password was successfully updated.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "New Message",
      message: "You have received a message from John Doe.",
      time: "3 days ago",
      read: false,
    },
  ]);

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <List>
            {notifications.map((notif) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: notif.read ? "#f5f5f5" : "#e3f2fd",
                    borderRadius: 2,
                    mb: 1,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 2 },
                  }}
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip
                        title={notif.read ? "Mark as Unread" : "Mark as Read"}
                      >
                        <IconButton
                          color={notif.read ? "warning" : "primary"}
                          onClick={() => toggleReadStatus(notif.id)}
                        >
                          {notif.read ? (
                            <MarkEmailUnreadIcon />
                          ) : (
                            <MarkEmailReadIcon />
                          )}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => deleteNotification(notif.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: notif.read ? "grey.400" : "primary.main" }}
                    >
                      {notif.title.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: notif.read ? "normal" : "bold",
                            color: notif.read
                              ? "text.secondary"
                              : "text.primary",
                          }}
                        >
                          {notif.title}
                        </Typography>
                        {!notif.read && (
                          <Chip
                            label="New"
                            color="primary"
                            size="small"
                            sx={{ fontWeight: "bold" }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {notif.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.disabled",
                            mt: 0.5,
                            display: "block",
                          }}
                        >
                          {notif.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notification;
