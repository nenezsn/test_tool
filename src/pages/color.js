import React from 'react';
import { SketchPicker } from 'react-color';

export default function () {
  const [color, setColor] = React.useState('#fff')
  return <SketchPicker
    color={color}
    onChangeComplete={(color) => setColor(color.hex)}
  />

}
