/* eslint-disable standard/array-bracket-even-spacing */
import cssVars from 'css-vars-ponyfill'
import { generate, presetPalettes } from '@ant-design/colors'

export const lightThemeColors = {
  'textColor': 'rgba(0,0,0,0.6)',
  'lineColor': '#F3F3F3',
  'labelColor': 'rgba(0,0,0,0.26)'
}

export const darkThemeColors = {
  'textColor': 'rgba(255,255,255,0.55)',
  'lineColor': '#383838',
  'labelColor': 'rgba(255,255,255,0.22)'
}

export const defaultLightTheme = {
  '#165DFF': ['#E8F3FF', '#DBECFF', '#BEDAFF', '#86AFFF', '#4080FF', '#165DFF', '#0E42D1', '#022FAC', '#002897', '#00217B'],
  '#39C9C2': ['#E8FFFB', '#C2FCF3', '#85F4EA', '#82E6E1', '#43D5CE', '#39C9C2', '#2BBDB6', '#1AABA4', '#0D9992', '#007D76'],
  '#D8C300': ['#F6F4E0', '#FAF3C3', '#FAF2A6', '#F5E891', '#E8D866', '#D8C300', '#C1AF00', '#AD9D00', '#988A00', '#7F7300'],
  '#5760FE': ['#F2F3FF', '#D9D9FF', '#AAB4FF', '#8996F9', '#7980FE', '#5760FE', '#454CCB', '#3F3F9F', '#2F2F93', '#1E1E71' ]
}

export const defaultDarkTheme = {
  '#4582E6': ['#1B2F51', '#173463', '#143975', '#103D88', '#2667D4', '#4582E6', '#699EF5', '#96BBF8', '#C1D9FF', '#E2EDFF'],
  '#9ACFC7': ['#003936', '#004F4B', '#0A6C67', '#2A958F', '#59BDB7', '#9ACFC7', '#A9D9D2', '#CAD9D6', '#DAE5E3', '#F0F3F3'],
  '#D1C23B': ['#4B4300', '#685D00', '#8D7F00', '#9D8D0B', '#BAAC26', '#D1C23B', '#E4D651', '#F2EAA4', '#F9F3C4', '#FDF9DD'],
  '#5C74E9': ['#082164', '#102C75', '#183580', '#1F3D8B', '#4162BA', '#5C74E9', '#7C90F0', '#909EE4', '#B3BCEC', '#D4DAFB']
}

export const getPrimaryList = function (color, theme) {
  if (theme == 'dark') {
    // 暗色四种
    if (defaultDarkTheme[color]) {
      return defaultDarkTheme[color]
    }
    return generate('color', {
      theme,
      backgroundColor: '#242424'
    })
  } else {
    // 亮色四种，
    if (defaultLightTheme[color]) {
      return defaultLightTheme[color]
    }
    return generate(color)
  }
}

export const initTheme = (color, theme) => {
  theme = theme ? theme : localStorage.getItem('themeMode')
  if (!theme || theme == 'undefined') {
    theme = 'light'
  }
  color = color ? color : localStorage.getItem('themeColor')
  if (!color || color == 'undefined') {
    color = theme == 'light' ? '#165DFF' : '#4582E6'
  }
  localStorage.setItem('themeMode', theme)
  localStorage.setItem('themeColor', color)
  let primaryList = getPrimaryList(color, theme)
  let themeObj = {}
  // for(let i=0;i<primaryList.length;i++){
  //   themeObj[`--primary-color-${i+1}`] = primaryList[i]
  // }
  themeObj['--primary-color-light'] = primaryList[0]
  themeObj['--primary-color-focus'] = primaryList[1]
  themeObj['--primary-color-disabled'] = primaryList[2]
  themeObj['--primary-color-hover'] = primaryList[4]
  themeObj['--primary-color-normal'] = primaryList[5]
  themeObj['--primary-color'] = primaryList[5]
  themeObj['--primary-color-active'] = primaryList[6]
  themeObj['--bg-global'] = theme == 'light' ? '#EEE' : '#181818' // 全局背景
  themeObj['--bg-main'] = theme == 'light' ? '#FFF' : '#242424' // 主要容器背景
  themeObj['--bg-secondary'] = theme == 'light' ? '#F3F3F3' : '#383838'  // 次要容器背景
  themeObj['--bg-section'] = theme == 'light' ? '#E7E7E7' : '#242424' // 组件背景
  themeObj['--split-default'] = theme == 'light' ? '#E7E7E7' : 'rgba(255,255,255,0.22)' // 默认分割线
  themeObj['--border-default'] = theme == 'light' ? '#DCDCDC' : '#5E5E5E'  // 默认边框
  themeObj['--text-color-main'] = theme == 'light' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'  // 主要字体颜色
  themeObj['--text-color-secondary'] = theme == 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.55)'  //次要字体颜色
  themeObj['--text-color-placeholder'] = theme == 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)' //占位符文颜色
  themeObj['--text-color-disabled'] = theme == 'light' ? 'rgba(0,0,0,0.26)' : 'rgba(255,255,255,0.22)' //文字disabled颜色
  themeObj['--text-color-reversed'] = theme == 'light' ? '#fff' : '#000' // 文字反颜色
  themeObj['--warn-color'] = '#F38100'
  themeObj['--warn-color-focus'] = '#FFECD6'
  themeObj['--warn-color-light'] = '#FEF5EA'
  themeObj['--success-color'] = '#00B57D'
  themeObj['--success-color-focus'] = '#D8F9F2'
  themeObj['--success-color-light'] = '#E6F8F4'
  themeObj['--error-color'] = '#ED453C'
  themeObj['--error-color-focus'] = '#FFDCD9'
  themeObj['--error-color-light'] = '#FFEEED'
  cssVars({
    watch: true, // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
    variables: {
      ...themeObj
    },
    onlyLegacy: true // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
  })
}
