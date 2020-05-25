import {
  Banner,
  Card,
  DisplayText,
  Frame,
  Layout,
  Page,
  PageActions,
  Toast,
} from '@shopify/polaris';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import store from 'store-js';
import PropertyList from "../components/PropertyList";
import PropertyInConstructionList from "../components/PropertyInConstructionList";
import React from "react";

const DELETE_METAFIELD = gql`
mutation metafieldDelete($input: MetafieldDeleteInput!) {
  metafieldDelete(input: $input) {
    deletedId
    userErrors {
      field
      message
    }
  }
}`;

const CREATE_METAFIELD = gql`
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      metafields(first: 10, namespace: "property_manager_936") {
        edges {
          node {
            key
            value
          }  
        }
      }
    }
  }
}`;

class EditProduct extends React.Component {
  state = {
    productId: '',
    productTitle: '',
    showPropertyCreatedToast: false,
    propertiesInConstruction: [],
    properties: [
      {
        id: 1,
        label: 'label_1',
        name: 'Name 1',
        enabled: true,
        type: {
          element: 'input',
          precise: 'text',
        },
        htmlClass: 'html-class-1',
      },
      {
        id: 2,
        label: 'label_2',
        name: 'Name 2',
        enabled: false,
        type: {
          element: 'input',
          precise: 'text',
        },
        htmlClass: '',
      },
    ],
  };

  componentDidMount() {
    const item = store.get('item');
    const {
      id: productId,
      title: productTitle,
    } = item;

    this.setState({ productId, productTitle });
  }

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  createProperty = (productId) => {
    const productVariableInput = {
      id: productId,
      metafields: [
        {
          namespace: 'property_manager_936',
          key: 'properties',
          value: JSON.stringify({
            properties: [
              {
                label: 'Property label',
                name: 'property_name',
                type: {
                  element: 'input',
                  precise: 'text', // TODO(nich) change this name
                },
                htmlClass: 'class',
              },
            ],
          }),
          valueType: 'JSON_STRING',
        },
      ],
    };

    handleSubmit({
      variables: {
        input: productVariableInput,
      },
    })
  };

  addProperty = () => {
    this.setState((state) => ({
      propertiesInConstruction: [...state.propertiesInConstruction, { id: +(new Date()) }],
    }));
  };

  removeProperty = (propertyIdToDelete) => {
    this.setState((state) => ({
      propertiesInConstruction: state.propertiesInConstruction.filter((property) => {
        return property.id !== propertyIdToDelete;
      }),
    }))
  }

  saveProperty = (newProperty) => {
    console.log('new property!!!!!!', newProperty);
    console.log(this.state.properties, this.state.propertiesInConstruction);
    this.setState((state) => ({
      properties: [...state.properties, newProperty],
      propertiesInConstruction: state.propertiesInConstruction.filter((propertyInConstruction) => {
        return propertyInConstruction.id !== newProperty.id;
      }),
    }));
  }

  render() {
    const { productTitle, properties, propertiesInConstruction } = this.state;

    return (
      <Mutation mutation={CREATE_METAFIELD}
      >
        {(handleSubmit, { error, data }) => {
          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );
          const showPropertyCreatedToast = data && data.productUpdate && (
            <Toast
              content="Successfully added property"
              onDismiss={() => this.setState({ showPropertyCreatedToast: false })}
            />
          );

          return (
            <Frame>
              <Page title={productTitle}>
                <Layout>
                  {showPropertyCreatedToast}
                  <Layout.Section>
                    {showError}
                  </Layout.Section>
                  <Layout.Section>
                    <Card
                      title="Product properties"
                      primaryFooterAction={{
                        content: 'Add property',
                        onAction: this.addProperty,
                      }}
                    >
                      <PropertyList
                        properties={properties}
                      />
                      <PropertyInConstructionList
                        properties={propertiesInConstruction}
                        onRemoval={this.removeProperty}
                        onSave={this.saveProperty}
                      />
                    </Card>
                  </Layout.Section>
                </Layout>
                <PageActions
                  secondaryActions={[
                    {
                      destructive: true,
                      onAction() {
                        console.log('action!!');
                      },
                      content: 'Delete all properties',
                    },
                  ]}
                />
              </Page>
            </Frame>
          );
        }}
      </Mutation>
    );
  }
}

export default EditProduct;