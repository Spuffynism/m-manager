import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        metafield(key: "properties", namespace: "property_manager_936") {
          value
        }
      }
    }
  }
`;

/*

        metafield(namespace: "propmanager", key: "properties") {
          value
        }
 */

class ResourceListWithProducts extends React.Component {

  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-products'
      );
    };

    return (
      <Query query={GET_PRODUCTS_BY_ID} variables={{
        ids: store.get('ids')
      }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data);
          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{singular: 'Product', plural: 'Products'}}
                items={data.nodes}
                renderItem={(item) => {
                  const media = (
                    <Thumbnail
                      source={item.images.edges[0]
                        ? item.images.edges[0].node.originalSrc
                        : ''
                      }
                      alt={item.images.edges[0]
                        ? item.images.edges[0].node.altText
                        : ''
                      }
                    />
                  );
                  return (
                    <ResourceList.Item
                      id={item.id}
                      media={media}
                      accessibilityLabel={`View details for ${item.title}`}
                      onClick={() => {
                        store.set('item', item);
                        redirectToProduct();
                      }}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.title}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                        <Stack.Item>
                          <p>Has properties metafield? : {item?.metafield?.value ? 'yes' : 'no'}</p>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          )
        }}
      </Query>
    )
  }
}

export default ResourceListWithProducts;