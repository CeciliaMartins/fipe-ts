import { Divider, ListItem, Typography, ListItemText, Avatar, ListItemAvatar, Icon } from "@mui/material";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TextComponent from '../../atoms/Text/TextComponent'
import React from "react";

type Props = {
    infos?: Array<any>

}
function ListItemInfo({ infos }: Props) {
    let title;
    let component;
    if (infos && infos.length > 0) {

        title = <TextComponent textAlign="left" description="Ficha técnica" />;
        component = (infos.map((info, i) => (
            <>
                <ListItem alignItems="flex-start" key={i}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp">
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="subtitle1"
                                color="primary">{info.firstLetter}
                            </Typography>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={info.titlePrimary}
                        secondary={<React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="subtitle1"
                                color="primary"
                            >
                                {info.value}
                            </Typography>
                        </React.Fragment>} />
                </ListItem>
                <Divider variant="inset" component="li" />
            </>

        )))
    } else {
        title = <div>
            <MusicNoteIcon></MusicNoteIcon>
            Oops, I did it again
        </div>;
        component = <div>Houve um problema, tente mais tarde!</div>
    }

    return (
        <>
            {title}
            {component}
        </>
    )
}

export default ListItemInfo;