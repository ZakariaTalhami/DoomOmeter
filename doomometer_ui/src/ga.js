import ReactGA from 'react-ga';
import {createBrowserHistory} from 'history'

ReactGA.initialize('UA-165701949-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const history = createBrowserHistory();

history.listen(location => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname)
});

export let browserHistory = history;