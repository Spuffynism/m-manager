import React from "react";
import { Button, FormLayout, Select, Stack, TextField } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";
import PrecisePropertyTypeForm from "./PrecisePropertyTypeForm";

class PropertyInConstruction extends React.Component {
  state = {
    labelHasBeenTouched: false,
    id: this.props.property.id,
    name: '',
    label: '',
    enabled: false,
    type: {
      element: 'input',
      precise: 'text', // TODO(nich) change this name
    },
    htmlClass: '',
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleNameChange = (name) => {
    this.setState(() => ({ name }));

    if (!this.state.labelHasBeenTouched) {
      const label = name.toLowerCase()
        .replace(/\s/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '');

      this.setState(() => ({ label }));
    }
  };

  propertyIsValid = () => {
    const { name, label } = this.state;
    return name.length && label.length;
  }

  handleLabelChange = (label) => {
    this.setState(() => ({
      labelHasBeenTouched: true,
      label,
    }));
  };

  render() {
    const { onRemoval, onSave } = this.props;
    const { id, name, label, type, htmlClass } = this.state;

    return (
      <div>
        <Stack distribution="fill">
          <TextField
            label="Name"
            value={name}
            type="text"
            placeholder="Ex.: Property Name"
            focused
            onChange={this.handleNameChange}
          />
          <Stack.Item>
            <Select
              label="Type"
              options={[
                {
                  label: 'Text (text input)',
                  value: {
                    element: 'input',
                    precise: 'text',
                  },
                },
                { label: 'Single choice (radio buttons)', value: 'radio' },
                { label: 'Multiple choices (checkboxes)', value: 'checkbox' },
              ]}
              value={type}
              onChange={this.handleChange('type')}
            />
            <PrecisePropertyTypeForm type={type}/>
          </Stack.Item>
          <TextField
            label="Label"
            value={label}
            clearButton={true}
            pattern="/[a-zA-Z0-9_]*/g"
            onChange={(label) => this.handleLabelChange(label)}
            onClearButtonClick={() => this.handleLabelChange('')}
            placeholder="Ex.: property_name"
          />
          <TextField
            label="HTML Class"
            value={htmlClass}
            placeholder="Ex.: .class-name"
            type="text"
            onChange={this.handleChange('htmlClass')}
          />
        </Stack>
        <Stack>
          <Button
            icon={DeleteMinor}
            onClick={() => onRemoval(id)}
            accessibilityLabel="Delete property"
          />
          <Button
            primary
            onClick={() => onSave({ id, name, label, htmlClass, type })}
            disabled={!this.propertyIsValid()}
          >
            Add
          </Button>
        </Stack>
      </div>
    );
  }
}

export default PropertyInConstruction;