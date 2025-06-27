import fs from 'fs/promises';
import path from 'path';
import Countdown from './components/Countdown';
import CommunityInfo from './components/CommunityInfo';

export default async function HomePage() {
  const dataPath = path.join(process.cwd(), 'public', 'cosc.json');
  const fileContents = await fs.readFile(dataPath, 'utf8');
  const data = JSON.parse(fileContents);

  return (
    <main style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
      <CommunityInfo data={data} />
      <Countdown endDate={data.date} />
    </main>
  );
}

