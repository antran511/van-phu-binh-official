import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/core";
import { SaleOrder } from "~/utility/interface";
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { List, useModalForm } from "@refinedev/mantine";
import { Button } from "@mantine/core";
import { CreateSaleOrderModal } from "~/components/sale-orders";
import { isNotEmpty } from "@mantine/form";
import { randomId } from '@mantine/hooks';
interface SaleOrderItem {
  product: number;
  quantity: number;
  unit_price: number;
  key: string;
}
export const SaleOrderList: React.FC<IResourceComponentsProps> = () => {
  const { tableQueryResult } = useTable<SaleOrder>({
    resource: "sale_orders",
    meta: {
      fields: ["*","customer.name"],
    },
    syncWithLocation: true,
  });
  const saleOrders = tableQueryResult?.data?.data ?? [];
  const initialValues = {
    customer: 0,
    sale_order_items: [{
      product: 0,
      quantity: 0,
      price: 0,
      unit_price: 0,
      key: randomId()
    } as SaleOrderItem]
  };

  const createModalForm = useModalForm({
    refineCoreProps: { action: "create", resource: "sale_orders"},
    initialValues
  });
  const {
    modal: { show: showCreateModal },
  } = createModalForm;

  const columns = useMemo<MRT_ColumnDef<SaleOrder>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
      },
      {
        accessorKey: "customer.name", //access nested data with dot notation
        header: "Khách hàng",
      },

    ],
    []
  );
  if (tableQueryResult?.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <List>
      <CreateSaleOrderModal {...createModalForm} />
      <MantineReactTable
        columns={columns}
        data={saleOrders}
        enableFullScreenToggle={false}
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => showCreateModal()}>+ Tạo đơn hàng </Button>
        )}
        mantinePaperProps={{
          shadow: "none", //use a larger shadow
          //customize paper styles
          sx: {
            borderRadius: "0",
            border: "none",
          },
        }}
        initialState={{
          showGlobalFilter: true, //show the global filter by default
        }}
        
        mantineTopToolbarProps={{
          sx: {
            ".mantine-1knjhw7": {
              paddingRight: 0,
              paddingLeft: 0,
              flexDirection: "row-reverse",
            }
          },
        }}
      />
    </List>
  );
};
