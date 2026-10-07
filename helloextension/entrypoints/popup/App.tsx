import { useState, useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
  const [website,setWebsite] = useState('');
  const [blockedSites,setblockedsites] = useState<string[]>([]);

  useEffect(() => {
    loadBlockedSites();
  }, []);


async function loadBlockedSites() {
    const result = await browser.storage.local.get('blockedSites');

    const sites = (result.blockedSites as string[] | undefined) ?? [];
    setblockedsites(sites);
  }

async function addWebsite() {
    if (website.trim() === '') {
      return;
    }

    const result = await browser.storage.local.get('blockedSites');

    const sites = (result.blockedSites as string[] | undefined) ?? [];
    sites.push(website);

    await browser.storage.local.set({
      blockedSites: sites,
    });

  setblockedsites(sites);
  setWebsite('');
}
async function deletewebsite (){
  let blockedSites: string[]  =[]
  setblockedsites([])
}
return (
    <>

      <h1>Internet safety thingy</h1>
      <div className="card">
      <input type="text"
      placeholder='Website to be blocked'
      value = {website}
      onChange={(event) => setWebsite(event.target.value)}
      />
      <button onClick={addWebsite}>
          Block Website
      </button>
      <p>Blocked websites:</p>

      <ul>
        {blockedSites.map((site, index) => (
          <li key={index}>{site}</li>
        ))}
      </ul>
        <button onClick={deletewebsite}>
          Clear List
      </button>
      </div>
      
      <p className="read-the-docs">
        Welcome!
      </p>
    </>
  );
}



export default App;
