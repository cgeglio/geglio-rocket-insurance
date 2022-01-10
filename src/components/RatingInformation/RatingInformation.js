import { Card, Form, Input, Button, InputNumber } from "antd";
import "./ratingInformation.scss";

const { Item } = Form;

function RatingInformation({ getQuote }) {
  const requiredRule = [
    {
      required: true,
      message: "Required item!",
    },
  ];

  const formSpacing = {
    span: 8,
  };

  const getFormItem = (label, name, isRequired) => {
    return (
      <Item label={label} name={name} rules={isRequired ? requiredRule : []}>
        <Input />
      </Item>
    );
  };

  return (
    <div className="rating-information">
      <div className="quote-header">
        Please complete the form below to get your quote:
      </div>
      <Card>
        <Form
          layout="horizontal"
          labelCol={formSpacing}
          wrapperCol={formSpacing}
          onFinish={getQuote}
        >
          {getFormItem("First Name", "first_name", true)}
          {getFormItem("Last Name", "last_name", true)}
          {getFormItem("Address Line 1", "line_1", true)}
          {getFormItem("Address Line 2", "line_2", false)}
          {getFormItem("City", "city", true)}
          {getFormItem("Region", "region", true)}
          <Item
            label="Postal Code"
            name="postal"
            rules={[
              ...requiredRule,
              {
                type: "integer",
                min: 10000,
                max: 99999,
                message: "Please add a valid postal code.",
              },
            ]}
          >
            <InputNumber />
          </Item>
          <Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
}

export default RatingInformation;
