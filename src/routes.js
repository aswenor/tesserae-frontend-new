import About from './components/about';
import Corpus from './components/corpus';
import Downloads from './components/download';
import Multitext from './components/multitext';
import ReaderRouter from './components/reader';
import Search from './components/search';
import Sources from './components/sources';
import Tutorial from './components/tutorial';


const routes = [
  {name: 'About', url: '/about', component: About, show: true},
  {name: 'Corpus', url: '/corpus', component: Corpus, show: true},
  {name: 'Search', url: '/', component: Search, show: true},
  {name: 'Multitext', url: '/multitext', component: Multitext, show: true},
  {name: 'Downloads', url: '/download', component: Downloads},
  //{name: 'Reader', url: '/reader/:textId', component: Reader},
  {name: 'Reader', url: '/reader', component: ReaderRouter},
  {name: 'Sources', url: '/sources', component: Sources, show: true},
  {name: 'Tutorial', url: '/tutorial', component: Tutorial, show: true},
  {name: 'Version 3', url: 'https://tesseraev3.caset.buffalo.edu/', component: null, show: true, external: true}
]


export default routes;
