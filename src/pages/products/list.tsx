import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/core";
import { Item } from "./interface";
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useModalForm, List } from "@refinedev/mantine";
import { Button } from "@mantine/core";
import { CreateItemModal } from "~/components/items";
import { isNotEmpty } from "@mantine/form";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { tableQueryResult } = useTable<Item>({
    resource: "items",
    filters: {
      permanent: [
        {
          field: "type",
          operator: "eq",
          value: "product",
        },
      ],
    },
  });
  const items = tableQueryResult?.data?.data ?? [];
  const initialValues = {
    name: "",
    type: "",
    category: "",
    price: 0,
    cost: 0,
  };

  const createModalForm = useModalForm({
    refineCoreProps: { action: "create", resource: "items" },
    initialValues,
    validate: {
      name: isNotEmpty("Tên sản phẩm không được bỏ trống"),
      type: isNotEmpty("Loại sản phẩm không được bỏ trống"),
    },
  });
  const {
    modal: { show: showCreateModal },
  } = createModalForm;

  const columns = useMemo<MRT_ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Tên",
      },
      {
        accessorKey: "type",
        header: "Loại",
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Nhóm",
      },
      {
        accessorKey: "price",
        header: "Giá bán",
      },
      {
        accessorKey: "cost",
        header: "Chi phí",
      },
    ],
    []
  );
  if (tableQueryResult?.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <List>
      <CreateItemModal {...createModalForm} />
      <MantineReactTable
        columns={columns}
        data={items}
        enableFullScreenToggle={false}
        enableColumnResizing
        mantinePaperProps={{
          shadow: "none", //use a larger shadow
          //customize paper styles
          sx: {
            borderRadius: "0",
            border: "none",
          },
        }}
        localization={MRT_Localization_VI}
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
