import React from 'react'
import PropTypes from 'prop-types';
import ListSort from './ListSort';

const dataArray = [
  {
    color: '#FF5500',
    title: 'Senior Product Designer',
  },
  {
    color: '#5FC296',
    title: 'Senior Animator',
  },
  {
    color: '#2DB7F5',
    title: 'Visual Designer',
  },
  {
    color: '#FFAA00',
    title: 'Computer Engineer',
  },
];
class ListSortDemo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'list-sort-demo',
  };
  onChange=(data)=>{
    console.log('data',data)
  }
  render() {
    const childrenToRender = dataArray.map((item, i) => {
      const { color, title } = item;
      return (
        <div key={item.color}>
            <p style={{color:color,padding:4,border:'1px solid '+color,width:150}}>{title}</p>
        </div>
      );
    });
    return (
        <div>
          <ListSort
            dragClassName="list-drag-selected"
            onChange={this.onChange}
            appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
          >
            {childrenToRender}
          </ListSort>
        </div>
    );
  }
}
export default ListSortDemo
