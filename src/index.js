import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Login from './view/Login';
import Home from './view/Home';
import Popover from './view/Popover';
import Profile from './view/Profile';
import * as serviceWorker from './serviceWorker';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import store from './_store/index'
import Content from './components/Content'
import Categorypage from './view/Categorypage';
import Eventdetail from './view/Eventdetail'
import Payment from './view/Payment'
import Paymentlist from './view/Paymentlist'
import Myticket from './view/Myticket'
import Addevent from './view/Addevent'
import Addeventform from './view/Addeventform'
import Header from './components/Header'
import Formeditprofile from './view/Formeditprofile'


const Routing =(
<Provider store={store}>
    <Router>
            <Switch>
                <Route path="/Eventdetail" component={Eventdetail} />
                <Route path="/Categorypage" component={Categorypage} />
                <Route path="/Profile" component={Profile} />
                <Route path="/Popover" component={Popover} />
                <Route path="/Register" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/Content" component={Content} />
                <Route path="/Payment" component={Payment} />
                <Route path="/Paymentlist" component={Paymentlist} />
                <Route path="/Myticket" component={Myticket} />
                <Route path="/Addevent" component={Addevent} />
                <Route path="/Addeventform" component={Addeventform} />
                <Route path="/header" component={Header} />
                <Route path="/Formeditprofile" component={Formeditprofile} />
                <Route path="/" component={Home} />
            </Switch>
    </Router>
</Provider>
)

ReactDOM.render(Routing, document.getElementById('Home'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
