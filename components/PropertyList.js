import Property from "./Property";
import React from "react";
import { ResourceItem, ResourceList } from "@shopify/polaris";

class PropertyList extends React.Component {
  state = {
    selectedProperties: [],
  }

  render() {
    const { selectedProperties } = this.state;
    const properties = this.props.properties;

    const bulkActions = [
      {
        content: 'Deactivate properties',
        onAction: () => console.log('Deactivating properties!'),
      },
      {
        content: 'Delete properties',
        onAction: () => console.log('Deleting properties!'),
      },
    ];

    return (
      <ResourceList
        resourceName={{ singular: 'property', plural: 'properties' }}
        items={properties}
        selectedItems={selectedProperties}
        onSelectionChange={(selectedProperties) => this.setState({ selectedProperties })}
        bulkActions={bulkActions}
        selectable
        renderItem={(property) => (
          <ResourceItem
            id={property.id}
            name={property.name}
          >
            <Property property={property}/>
          </ResourceItem>)}
      />
    );
  }
}

export default PropertyList;