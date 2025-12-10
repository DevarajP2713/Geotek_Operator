/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import DynamicSignaturePad from "../DynamicSignaturePad/DynamicSignaturePad";

interface SignatureValue {
  isTab: boolean;
  value: string;
}

interface GroupSignaturePadProps {
  label?: string;
  initialCount?: number;
  readOnly?: boolean;
  onChange?: (signatures: SignatureValue[]) => void;
  required?: boolean;
  errorMsg?: string;
  width?: string;
  isRequired?: boolean;
}

const SignaturePadGroup: React.FC<GroupSignaturePadProps> = ({
  label = "Crew Name/Signature",
  initialCount = 3,
  readOnly = false,
  onChange,
  required = false,
  width = "300px",
  errorMsg = "At least one signature is required.",
  isRequired = false,
}) => {
  const [signatures, setSignatures] = useState<SignatureValue[]>(() =>
    Array(initialCount).fill({ isTab: false, value: "" })
  );

  useEffect(() => {
    onChange?.(signatures);
  }, [signatures]);

  const updateSignature = (index: number, value: SignatureValue): void => {
    const updated = [...signatures];
    updated[index] = value;
    setSignatures(updated);
  };

  const addMember = (): void => {
    setSignatures([...signatures, { isTab: false, value: "" }]);
  };

  const removeMember = (index: number): void => {
    const updated = signatures.filter((_, idx) => idx !== index);
    setSignatures(updated);
  };

  const showError =
    required &&
    signatures.length > 0 &&
    signatures.every((sig) => !sig?.value?.trim?.());

  return (
    <div>
      {label && (
        <label className="inputLabels">
          {label}
          {isRequired && <span className="requiredIcon">*</span>}
        </label>
      )}

      <Row gutter={[16, 16]}>
        {signatures.map((sig, idx) => (
          <Col key={idx} xs={24} sm={12} md={8}>
            <div style={{ position: "relative" }}>
              <DynamicSignaturePad
                label={`member ${idx + 1}`}
                value={sig}
                onChange={(val) => updateSignature(idx, val)}
                customReadOnly={readOnly}
                isValid={!showError}
                width={width}
                errorMsg={showError && idx === 0 ? errorMsg : ""}
              />

              {!readOnly &&
                idx === signatures.length - 1 &&
                signatures.length !== 1 && (
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeMember(idx)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#ff4d4f",
                      zIndex: 1,
                    }}
                  >
                    Remove
                  </Button>
                )}
            </div>
          </Col>
        ))}
      </Row>

      {!readOnly && (
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={addMember}
          style={{ marginTop: 12, color: "#1677ff" }}
        >
          Add member
        </Button>
      )}
    </div>
  );
};

export default SignaturePadGroup;
