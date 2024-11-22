import { Card, Skeleton, Box } from '@mui/material';

// Loading Card
const LoadingCard = () => (
    <Card  variant={"outlined"}  sx={{ height: '30%', width: '100%', padding: '16px' }}>
        <Box display="flex" alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Box ml={2} flex={1}>
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="text" width="30%" height={15} />
            </Box>
        </Box>
        <Skeleton variant="text" width="80%" height={30} sx={{ mt: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={20} sx={{ mt: 2 }} />
    </Card>
);

export default LoadingCard;
