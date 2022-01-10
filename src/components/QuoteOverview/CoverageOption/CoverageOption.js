import { Card, Select } from "antd";
import "./coverageOption.scss";

const { Option } = Select;

function CoverageOption({
  option,
  details,
  currentValue,
  setCoverageSelections,
}) {
  const { description, title, values } = details;

  const handleCoverageChange = (value) => {
    setCoverageSelections((prev) => ({ ...prev, [option]: value }));
  };

  return (
    <Card className="coverage-option">
      <div className="option-title">{title}</div>
      <div className="option-description">{description}</div>
      <Select
        defaultValue={currentValue}
        style={{ width: 120 }}
        onChange={handleCoverageChange}
      >
        {values.map((value) => (
          <Option key={value} value={value}>
            {"$" + value.toLocaleString()}
          </Option>
        ))}
      </Select>
    </Card>
  );
}

export default CoverageOption;
