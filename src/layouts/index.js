import React from 'react'
import styles from './index.less';
import { Menu } from 'antd'
import Link from 'umi/link'

const menu = [
  { title: '首页', link: '/' },
  { title: 'drag', link: '/drag' },
  { title: '拾色器', link: '/color' },
  { title: 'intl', link: '/intl' },
  { title: '微线图', link: '/sparklines' },
  { title: '图片裁剪', link: '/imgCrop' },
  { title: '图片缩放', link: '/zoomImage' },
  { title: '文字loop', link: '/textLoop' },
  { title: '文字拷贝', link: '/textCopy' },
  { title: '画板', link: '/drawboard' },
  { title: 'html2canvas', link: '/html2canvas' },
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
