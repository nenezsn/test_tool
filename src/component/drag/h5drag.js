// HTML Drag
export default function() {
  function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
  }
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
  }
  const styles = {
    item: { width: 50, height: 50, background: '#3dcc51', float: 'left', margin: 10 },
    box: { margin: '100px', border: '1px solid black', width: 300, height: 300, float: 'left', margin: 10 }
  }
  return <div style={{ verticalAlign: 'top' }}>
    <div id="drag1"
      style={styles.item}
      draggable={true}
      onDragStart={drag}
    >1</div>
    <div id="drag2"
      style={styles.item}
      draggable={true}
      onDragStart={drag}
    >2</div>
    <div id="div1"
      style={styles.box}
      onDrop={drop}
      onDragOver={e => e.preventDefault()}
    ></div>
    <div id="div2"
      style={styles.box}
      onDrop={drop}
      onDragOver={e => e.preventDefault()}
    ></div>
  </div>
}
