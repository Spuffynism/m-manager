import { TextStyle } from "@shopify/polaris";
import React from "react";

class Property extends React.Component {
  render() {
    const {
      label,
      name,
      type: {
        element,
        precise,
      },
      htmlClass,
    } = this.props.property;

    return (
      <div>
        <h3>
          <TextStyle variation="strong">{name} (<TextStyle
            variation="code">{label}</TextStyle>)</TextStyle>
        </h3>
        <p>Element: {element} - ({precise})</p>
        {htmlClass && <p>Html class: {htmlClass}</p>}
      </div>
    )
  }
}

export default Property;