import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Can, useAbility } from "@/app/casl/Can";
import axiosInstance from "@/services/axiosInstance";

export default function TableCellInput({ inputValue, item, columnKey }) {
  const ability = useAbility();

  const [value, setValue] = useState(inputValue);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (
      (columnKey === "text" && ability.can("update", "Tables", "text")) ||
      (columnKey === "link" && ability.can("update", "Tables", "link"))
    ) {
      setValue(newValue);

      if (e.type === "blur") {
        const updateData = {
          [columnKey]: newValue,
        };
        if (
          columnKey === "text" ||
          (columnKey === "link" && /^(https?:\/\/)/.test(newValue))
        )
          axiosInstance.put(`/operations/${item.id}`, updateData);
      }
    }
    switch (columnKey) {
      case "link":
        const isValidUrl = /^(https?:\/\/)/.test(newValue);
        setIsInvalid(!isValidUrl);
        break;
      default:
        setIsInvalid(false);
        break;
    }
  };

  let name = "";
  let inputType = "text";
  let label = "Введите текст";
  switch (columnKey) {
    case "text":
      name = "text";
      inputType = "text";
      label = "Введите текст";
      break;

    case "link":
      name = "link";
      inputType = "url";
      label = "Введите URL";
      break;

    default:
      break;
  }

  return (
    <Can I="read" a="Tables">
      <Input
        name={name}
        type={inputType}
        label={label}
        variant="bordered"
        value={value}
        onBlur={handleInputChange}
        onChange={handleInputChange}
        isInvalid={isInvalid && value.length > 0}
        className="max-w-xs"
      />
    </Can>
  );
}
