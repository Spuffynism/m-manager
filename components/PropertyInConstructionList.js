import React from "react";
import { ResourceItem, ResourceList } from "@shopify/polaris";
import PropertyInConstruction from "./PropertyInConstruction";

class PropertyInConstructionList extends React.Component {
  render() {
    const { properties, onRemoval, onSave } = this.props;

    return (
      <ResourceList
        resourceName={{ singular: 'property', plural: 'properties' }}
        items={properties}
        renderItem={(property) => (
          <ResourceItem
            id={property.id}
          >
            <PropertyInConstruction
              onRemoval={onRemoval}
              onSave={onSave}
              property={property}
            />
          </ResourceItem>
        )}
      />
    );
  }
}

export default PropertyInConstructionList;