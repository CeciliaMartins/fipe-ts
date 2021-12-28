import { Box, CircularProgress } from "@mui/material";

type Props = {
    loading?: boolean
}
function Loading({ loading }: Props) {
    console.log('loading', loading);

    let component;
    if (loading == true) {
        component = <Box sx={{
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '200px',
        }}>
            <CircularProgress sx={{
                color: '#00c5ff',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '200px',
                marginLeft: '50%',
            }} />
        </Box>

    }
    return <>
        {component}
    </>
}

export default Loading;