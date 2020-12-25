/**
 * @desc 拖拽
 */
import React from 'react'
import PropTypes from 'prop-types';
import Sortable from 'sortablejs'

function SortItem(props) {
  React.useEffect(() => {
    const { sortId, disabled, onChooseItem, onSortAdd, onSortRemove, onSortEnd } = props
    const dom = document.getElementById(sortId)
    if (!dom) {
      console.error('未找到对应dom')
      return
    }
    new Sortable(dom, {
      group: 'shared',
      animation: 150,
      sort: true,
      disabled,
      onChoose: () => {
        onChooseItem && onChooseItem(sortId)
      },
      onAdd: item => {
        onSortAdd && onSortAdd(sortId, item)
      },
      onRemove: () => {
        onSortRemove && (sortId)
      },
      onEnd: () => {
        onSortEnd && onSortEnd(sortId)
      }
    });
  }, [])
  return <div style={props.wrapStyle}>
    {
      React.Children.map(props.children, child => child)
    }
  </div>
}

SortItem.defaultProps = {
  id: '',
  disabled: false
}
SortItem.propTypes = {
  // 组件唯一标示
  id: PropTypes.string.isRequired,
  // 是否允许拖拽
  disabled: PropTypes.bool
}

export default function () {
  const styles = {
    box: { width: 200, height: 100, border: '1px solid red',cursor:'pointer' },
    item: { width: 50, height: 50, display: 'inline-block', margin: '4px', border: '1px solid black' }
  }
  return <div>
    <SortItem
      sortId='team'
      children={<ul id='team' style={styles.box} >
        <li style={styles.item}>1</li>
        <li style={styles.item}>2</li>
      </ul>}
    />

    <SortItem
      sortId='main_bank'
      children={<ul id='main_bank' style={styles.box} >
        <li style={styles.item}>3</li>
        <li style={styles.item}>4</li>
      </ul>}
    >
    </SortItem>

  </div>
}
