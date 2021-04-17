import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

class EditorDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(this.props.text)
  }

  getRichText = () => {
    return this.state.editorState.toHTML()
  }

  componentWillReceiveProps(nexrProps) {
    if (nexrProps.text != this.props.text) {
      this.setState({
        editorState: BraftEditor.createEditorState(nexrProps.text)
      })
    }
  }

  handleEditorChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  myUploadFn = (param) => {
    this.props.upload(param)
    const fd = new FormData()
    fd.append('file', param.file)
    fetch('/local/uplodaImg', {
      method: 'POST',
      body: fd
    }).then(data => data.json())
      .then(data => {
        param.success({ url: 'http://localhost:3000/' + data.url })
      }).catch(err => {
        param.error({
          msg: 'unable to upload.'
        })
      })
  }
  myValidateFn = (file) => {
    return true
  }
  render() {
    return (
      <BraftEditor
        value={this.state.editorState}
        onChange={this.handleEditorChange}
        media={{
          uploadFn: this.myUploadFn,
          validateFn: this.myValidateFn
        }}
      />
    )

  }

}



class Index extends React.Component {
  state = {
    editText: '<div>123</div>'
  }
  editor=null;
  getTichText=()=>{
    console.log('2222',this.editor.getRichText())
  }
  render() {
    return <div style={{ width: 500, margin: '30px auto' }}>
      <button onClick={this.getTichText}>获取</button>
      <EditorDemo
        ref={node => this.editor = node}
        text={this.state.editText}
      />
    </div>
  }
}

export default Index
