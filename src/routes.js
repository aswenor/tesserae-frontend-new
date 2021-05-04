import About from './components/about';
import Corpus from './components/corpus';
import Download from './components/download';
import Multitext from './components/multitext';
import Reader from './components/reader';
import Search from './components/search';


const routes = [
  {name: 'About', url: '/about', component: About, show: true},
  {name: 'Corpus', url: '/corpus', component: Corpus, show: true},
  {name: 'Search', url: '/', component: Search, show: true},
  {name: 'Multitext', url: '/multitext', component: Multitext, show: true},
  {name: 'Download', url: '/download', component: Download, show: true},
  {name: 'Reader', url: '/reader', component: Reader}
]


export default routes;