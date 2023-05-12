import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/core";
import { SaleOrderItem } from "~/utility/interface";
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useModalForm, List } from "@refinedev/mantine";
import { Button } from "@mantine/core";
import { CreateSaleOrderModal } from "~/components/sale-orders";
import { randomId } from "@mantine/hooks";
import { EditSaleOrderModal } from "~/components/sale-orders";
import { LoadingOverlay } from "@mantine/core";

export const SaleOrderItemList: React.FC<IResourceComponentsProps> = () => {
  const { tableQueryResult } = useTable<SaleOrderItem>({
    resource: "sale_order_items",
    meta: {
      fields: [
        "id",
        "product.name",
        "sale_order.customer.name",
        "sale_order.date_created",
        "unit_price",
        "quantity",
        "sale_order.id",
      ],
    },
    queryOptions: {
      onSuccess: (data) => {},
    },
  });
  const partners = tableQueryResult?.data?.data ?? [];
  const initialValues = {
    customer: 0,
    sale_order_items: [
      {
        product: 1,
        quantity: 0,
        unit_price: 0,
        key: randomId(),
      },
    ],
  };

  const createModalForm = useModalForm({
    refineCoreProps: { action: "create", resource: "sale_orders" },
    initialValues,
  });
  const {
    modal: { show: showCreateModal },
  } = createModalForm;

  const editModalForm = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "sale_orders",
      meta: {
        fields: [
          "id",
          "customer",
          "sale_order_items.id",
          "sale_order_items.product",
          "sale_order_items.product",
          "sale_order_items.quantity",
          "sale_order_items.unit_price",
        ],
      },
    },
    initialValues,
  });
  const {
    modal: { show: showEditModal },
  } = editModalForm;

  const columns = useMemo<MRT_ColumnDef<SaleOrderItem>[]>(
    () => [
      {
        accessorKey: "sale_order.date_created", //access nested data with dot notation
        header: "Ngày tạo",
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return <div>{date.toLocaleDateString("vi-VN")}</div>;
        },
      },
      {
        accessorKey: "sale_order.customer.name", //access nested data with dot notation
        header: "Khách hàng",
      },
      {
        accessorKey: "product.name", //access nested data with dot notation
        header: "Sản phẩm",
      },
      {
        accessorKey: "unit_price",
        header: "Đơn giá",
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
      },
    ],
    []
  );

  return (
    <List>
      <LoadingOverlay
        visible={tableQueryResult?.isLoading}
        opacity={0.8}
        zIndex={100}
      />
      {/* <CreateSaleOrderModal {...createModalForm} />
      <EditSaleOrderModal {...editModalForm} /> */}
      <MantineReactTable
        columns={columns}
        data={partners}
        enableFilters={false}
        globalFilterModeOptions={["fuzzy", "startsWith"]}
        enableFullScreenToggle={false}
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => showCreateModal()}>+ Tạo đối tác </Button>
        )}
        enableColumnResizing
        mantinePaperProps={{
          shadow: "none", //use a larger shadow
          //customize paper styles
          sx: {
            borderRadius: "0",
            border: "none",
          },
        }}
        enableEditing
        initialState={{
          showGlobalFilter: true, //show the global filter by default
        }}
        enableRowNumbers
        enablePinning
        mantineTableBodyRowProps={({ row }) => ({
          onClick: () => showEditModal(row.original.sale_order.id),
          sx: {
            cursor: "pointer", //you might want to change the cursor too when adding an onClick
          },
        })}
        mantineTopToolbarProps={{
          sx: {
            ".mantine-1knjhw7": {
              paddingRight: 0,
              paddingLeft: 0,
              flexDirection: "row-reverse",
            },
          },
        }}
      />
    </List>
  );
};
