import * as React from 'react';

import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    IconButton,
    Grid
} from "@mui/material";
import { Link } from "react-router-dom";


// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AllTask({ TaskData, Title, handleDelete }) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: "3%",
                '& > :not(style)': {
                    m: 1,
                    width: "50%"

                }
            }}
        >
            <h2>{Title}</h2>
            {
                TaskData.map((element, index) => (
                    <Card elevation={1} style={{ marginTop: "4%" }} key={element.id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                id : {element.id}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Title :  {element.title}
                            </Typography>
                            <Typography variant="h7">
                                <Typography variant="h5">Description :</Typography>
                                <br />
                                {element.description}
                            </Typography>
                        </CardContent>
                        <CardHeader
                            action={
                                <>
                                    <IconButton
                                        component={Link}
                                        to={`/edit/${element.id}`}
                                        color="primary"
                                        aria-label="settings"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(element.id, index)}
                                        color="secondary"
                                        aria-label="settings"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        />
                    </Card>
                ))
            }
        </Grid>
    );
}
