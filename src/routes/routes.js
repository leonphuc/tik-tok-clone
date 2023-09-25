import config from '~/config';

//Layouts
import { HeaderOnly } from '~/layouts';
import Home from '~/page/Home';
import Following from '~/page/Following';
import Profile from '~/page/Profile';
import Upload from '~/page/Upload';
import Live from '~/page/Live';
import ProtectedRoute from './ProtectedRoute';

//Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    {
        path: config.routes.profile,
        component: Profile,
    },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
