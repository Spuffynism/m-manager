import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Spinner,
  Stack,
  TextField,
  TextStyle,
} from '@shopify/polaris';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_SHOP_APP_METAFIELDS = gql`
  query {
    shop {
      id
      name,
      metafields(first: 10, namespace: "property_manager_936") {
        edges {
          node {
            key,
            value
          }  
        }
      }
    }
  }
`;

const ENABLE_APP = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;

class Settings extends React.Component {
  state = {
    enabled: false,
    message: 'Default message',
    loading: false,
  };

  render() {
    const { message, enabled, loading } = this.state;
    const activationStatusAction = loading
      ? <Spinner accessibilityLabel="Loading activation status" size="small" color="teal"/>
      : enabled ? 'Disable' : 'Enable';
    const activationStatus = enabled ? 'enabled' : 'disabled';

    return (
      <Query
        query={GET_SHOP_APP_METAFIELDS}
        onCompleted={(data) => {
          const activationMetafield = data.shop.metafields.edges.find((edge) => {
            return edge.node.key === 'enabled';
          });

          this.setState(() => ({
            enabled: activationMetafield?.node?.value === 'true' || false,
            hasFetchedSettings: true,
          }));

          console.log(activationMetafield, data);
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;

          return (
            <Page>
              <Layout>
                <Layout.AnnotatedSection
                  title="Enable app"
                  description="Globally enable or disable product properties."
                >
                  <SettingToggle
                    action={{
                      content: activationStatusAction,
                      onAction: this.handleToggle,
                    }}
                    enabled={enabled}
                  >
                    Product properties are {' '}
                    <TextStyle variation="strong">{activationStatus}</TextStyle>
                  </SettingToggle>
                </Layout.AnnotatedSection>
                <Layout.AnnotatedSection
                  title="Set a message"
                  description="Globally set a message"
                >
                  <Card sectioned>
                    <Form onSubmit={this.handleSubmitMessage}>
                      <FormLayout>
                        <TextField
                          value={message}
                          onChange={this.handleChange('message')}
                          label="Message"
                          type="text"
                        />
                        <Stack distribution="trailing">
                          <Button primary submit>
                            Save
                          </Button>
                        </Stack>
                      </FormLayout>
                    </Form>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </Page>
          );
        }}
      </Query>
    );
  }

  handleSubmitMessage = () => {
    this.setState((state) => ({
      message: state.message,
    }));
    console.log('submission', this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = async () => {
    this.setState(({ loading }) => {
      return { loading: true };
    });
    const request = await fetch(`/${this.state.enabled ? 'disable' : 'enable'}`, {
      method: 'put',
    });

    const response = await request.json();

    this.setState(({ enabled, loading }) => {
      return {
        enabled: !enabled,
        loading: false,
      };
    });
  }
}

export default Settings;