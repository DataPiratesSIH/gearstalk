import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerItem = props => {
    return (
        <SketchPicker
          color={props.background}
          onChangeComplete={props.handleChangeColor}
        />
      );
}
export default ColorPickerItem;