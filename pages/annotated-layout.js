import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle,
} from "@shopify/polaris";

class AnnotatedLayout extends React.Component {
  state = {
    enabled: true,
    message: 'Default message',
  };

  render() {
    const { message, enabled } = this.state;
    const activationStatusAction = enabled ? 'Disable' : 'Enable';
    const activationStatus = enabled ? 'enabled' : 'disabled';

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
  }

  handleSubmitMessage = () => {
    this.setState({
      message: this.state.message,
    });
    console.log('submission', this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  }
}

export default AnnotatedLayout;