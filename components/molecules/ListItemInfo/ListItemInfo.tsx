import { Divider, ListItem, Typography, ListItemText, Avatar, ListItemAvatar, Icon } from "@mui/material";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TextComponent from '../../atoms/Text/TextComponent'
import React from "react";

type Props = {
    infos?: Array<any>

}
function ListItemInfo({ infos }: Props) {
    return (
        <>
            {infos && infos.length > 0 ? (
                <TextComponent textAlign="left" description="Ficha técnica" />
            ) : (<div>
                <MusicNoteIcon></MusicNoteIcon>

                Oops, I did it again</div>)}
            {infos && infos.length > 0 ?
                (infos.map((info) => (
                    <>
                        <ListItem alignItems="flex-start">
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

                ))) : (
                    <>
                        <div>
                            Houve um problema, tente mais tarde!

                        </div>
                    </>
                )
            }

        </>
    )
}

export default ListItemInfo;