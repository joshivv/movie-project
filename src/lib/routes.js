import { Home } from './pages/Home'
import {MovieDetails} from './pages/MovieDetails'

export default {
    routes: [
        {
            path: '$',
            component: Home
        },
        {
            path: 'movie/:id',
            component: MovieDetails
        }
    ]
}