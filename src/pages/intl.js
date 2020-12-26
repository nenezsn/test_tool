import React from 'react'
import intl from 'react-intl-universal';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import { ConfigProvider, DatePicker } from 'antd';
import { Select } from 'antd'
const Option = Select.Option
const locales = {
  "en-US": require('../utils/locales/en-US.js'),
  "zh-CN": require('../utils/locales/zh-CN.js'),
};
const antdLocales = {
  "en-US": en_US,
  "zh-CN": zh_CN,
}

function Index() {
  const [language, setLanguage] = React.useState()
  function loadLocales(currentLocale = 'zh-CN') {
    intl.init({
      currentLocale, // TODO: determine locale here
      locales,
    }).then(() => {
      setLanguage(currentLocale)
      console.log('完成了')
    });
  }
  React.useEffect(() => {
    loadLocales()
  }, [])
  return <ConfigProvider locale={antdLocales[language]}>
    <Select onChange={loadLocales} value={language}>
      <Option value='zh-CN'>中文</Option>
      <Option value='en-US'>英文</Option>
    </Select>
    <p>
      {intl.get('HELLO', { name: 'Tony', where: 'Alibaba' })}
    </p>
    <DatePicker />
  </ConfigProvider>
}
export default Index
