import { Avatar, Card, CardContent, CardHeader, Typography, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';
import { User } from '@type/user';
import { FC } from 'react';

export const CardUser: FC<{ user?: User }> = ({ user }) => {
  const theme: Theme = useTheme();
  return (
    <Card sx={{ maxWidth: 345, marginBlock: theme.spacing(4) }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={user?.avatar} />}
        title={user?.name}
        subheader={user?.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          SocialId: {user?.socialId}
        </Typography>
      </CardContent>
    </Card>
  );
};
