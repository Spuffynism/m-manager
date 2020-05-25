import React from "react";

class PrecisePropertyTypeForm extends React.Component {
  state = {};

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  render() {
    const { type } = this.props;

    let morePreciseTypeForm;
    switch (type) {
      case 'radio':
        morePreciseTypeForm = <p>Radio selected</p>;
        break;
      case 'checkbox':
        morePreciseTypeForm = <p>Checkbox selected</p>;
        break;
      default:
        morePreciseTypeForm = 'Basic type selected';
        break;
    }

    return (
      <div>
        {morePreciseTypeForm}
      </div>
    );
  }
}

export default PrecisePropertyTypeForm;