import { BaseRecord, HttpError } from "@refinedev/core";
import { UseModalFormReturnType, SaveButton } from "@refinedev/mantine";
import {
  Select,
  Box,
  Text,
  NumberInput,
  Drawer,
  Divider,
  Table,
  Button,
  ActionIcon
} from "@mantine/core";
import { IconTrash } from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import { PartnerSelect } from "~/components/partners";
import { LoadingOverlay } from '@mantine/core';
interface SaleOrderItem {
  id: number;
  product: number;
  quantity: number;
  unit_price: number;
  key: string;
}
interface FormValues {
  customer: number ;
  sale_order_items: SaleOrderItem[]
}

export const EditSaleOrderModal: React.FC<UseModalFormReturnType<BaseRecord, HttpError, FormValues>> = ({
  getInputProps,
  errors,
  modal: { visible, close },
  saveButtonProps,
  removeListItem,
  insertListItem,
  values,
  refineCore: { formLoading } 
}) => {
  console.log('values', values)
  const saleLineFields = values.sale_order_items?.map((saleLine, index) =>(
    <tr key={saleLine.key}>
      <td>
        <Select
          placeholder="Chọn sản phẩm"
          variant="unstyled"
          {...getInputProps(`sale_order_items.${index}.product`)}
          data={[
            { value: '1', label: 'React' },
            { value: '2', label: 'Angular' },
            { value: '3', label: 'Svelte' },
            { value: '4', label: 'Vue' },
          ]}/>
      </td>
      <td><NumberInput
        sx={{ flex: 1 }}
        variant="unstyled"
        {...getInputProps(`sale_order_items.${index}.quantity`)}
      /></td>
      <td><NumberInput
        sx={{ flex: 1 }}
        variant="unstyled"
        {...getInputProps(`sale_order_items.${index}.unit_price`)}
      /></td>
      <td><NumberInput
        sx={{ flex: 1 }}
        variant="unstyled"
        {...getInputProps(`sale_order_items.${index}.unit_price`)}
      /></td>
      <td>
        <ActionIcon color="red" onClick={() => removeListItem('sale_order_items', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </td>
    </tr>
  ))
  return (
    <Drawer opened={visible} onClose={close} title={"Tạo đơn bán hàng"} position="right" padding="xl"size="65%">
      <LoadingOverlay visible={formLoading} opacity={0.8} zIndex={100} />
      <PartnerSelect {...getInputProps("customer")}/>
      <Divider my="sm" />
      <Text fz="sm" fw={500}>Chi tiết đơn hàng</Text>
      <Box sx={{overflow: "auto", maxHeight: "400px"}}><Table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn vị</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {saleLineFields}           */}
        </tbody>
      </Table></Box>
      <Button
        variant="subtle"
        compact
        size="xs"
        color="gray"
        onClick={
          () => {
            insertListItem('sale_order_items', {
              product: 0,
              quantity: 0,
              price: 0,
              unit_price: 0,
              key: randomId()
          })}
      }>
        + Thêm dòng
      </Button>
      {errors.content && (
        <Text mt={2} weight={500} size="xs" color="red">
          {errors.content}
        </Text>
      )}
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Drawer>
  );
};
