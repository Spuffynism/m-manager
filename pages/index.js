import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from 'store-js';
import ResourceListWithProducts from "../components/ResourceListWithProducts";

const emptyStateImage = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };

  render() {
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          title="Title bar title"
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="Edit product properties"
              action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
              }}
              image={emptyStateImage}
            >
              <p>Select products to edit their properties!</p>
            </EmptyState>
          </Layout>
        ) : (
          <ResourceListWithProducts/>
        )}
      </Page>
    );
  }

  handleSelection = (resources) => {
    console.log('selected resources', resources.selection);
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    console.log('resources', idsFromResources);
    store.set('ids', idsFromResources);
  }
}

export default Index;