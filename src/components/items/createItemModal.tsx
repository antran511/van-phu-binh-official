import { BaseRecord, HttpError } from "@refinedev/core";
import { UseModalFormReturnType, SaveButton } from "@refinedev/mantine";
import {
  Modal,
  TextInput,
  Select,
  Box,
  Text,
  NumberInput,
  Group,
} from "@mantine/core";

interface FormValues {
  name: string;
  type: string;
  price: number;
  cost: number;
  category: string;
}

export const CreateItemModal: React.FC<
  UseModalFormReturnType<BaseRecord, HttpError, FormValues>
> = ({ getInputProps, errors, modal: { visible, close }, saveButtonProps }) => {
  return (
    <Modal opened={visible} onClose={close} title={"Tạo hàng hoá"}>
      <TextInput required mt={8} label="Tên" {...getInputProps("name")} />
      <Select
        required
        mt={8}
        label="Loại sản phẩm"
        placeholder="Hãy chọn một"
        {...getInputProps("type")}
        data={[
          { label: "Thành phẩm", value: "product" },
          { label: "Nguyên vật liệu", value: "material" },
        ]}
      />

      <Group>
        <NumberInput
          label="Giá bán"
          placeholder="Giá bán"
          {...getInputProps("price")}
        />
        <NumberInput
          label="Chi phí"
          placeholder="Chi phí"
          {...getInputProps("cost")}
        />
      </Group>
      {errors.content && (
        <Text mt={2} weight={500} size="xs" color="red">
          {errors.content}
        </Text>
      )}
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Modal>
  );
};
