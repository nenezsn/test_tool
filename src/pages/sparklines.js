import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

function Index() {
  const [dynamicData, setDynamicData] = React.useState([1,5])

  return <div style={{ width: 300, height: 300, margin: '50px auto' }}>

    <Sparklines data={[4, 5, 2, 3, 1, 7, 3, 5, 3, 8]}>
      <SparklinesLine color="#253e56" />
    </Sparklines>

    {/*  动态生成数据 */}
    <Sparklines data={dynamicData} limit={20}>
      <SparklinesLine color="#1c8cdc" />
      <SparklinesSpots />
    </Sparklines>
    <button onClick={() => setDynamicData(dynamicData.concat(Math.floor(Math.random() * 10 + 1)))}>生成数据</button>

  </div>
}
export default Index
