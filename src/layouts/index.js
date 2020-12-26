import React from 'react'
import styles from './index.less';
import { Menu } from 'antd'
import Link from 'umi/link'

const menu = [
  { title: '首页', link: '/' },
  { title: 'drag', link: '/drag' },
  { title: '拾色器', link: '/color' },
]

function BasicLayout(props) {
  const [current, setCurrent] = React.useState('index')
  return (
    <div className={styles.normal}>
      <div className={styles.left}>
        <Menu
          onClick={({ key }) => setCurrent(key)}
          selectedKeys={current}
          theme="dark"
          mode="vertical">
          {
            menu.map(item =>
              <Menu.Item key={item.title}>
                <Link to={item.link}>{item.title}</Link>
              </Menu.Item>
            )
          }
        </Menu>
      </div>
      <div className={styles.right}>
        {props.children}
      </div>
    </div>
  );
}

export default BasicLayout;
