import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/core";
import { Partner } from "~/utility/interface";
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { useModalForm, List } from "@refinedev/mantine";
import { Button } from "@mantine/core";
import { CreateItemModal } from "~/components/items";
import { isNotEmpty } from "@mantine/form";

export const PartnerList: React.FC<IResourceComponentsProps> = () => {
  const { tableQueryResult } = useTable<Partner>({
    resource: "partners",
  });
  const partners = tableQueryResult?.data?.data ?? [];
  const initialValues = {
    name: "",
    phone: "",
    country: "",
    is_customer: 0,
    is_supplier: 0,
  };

  const createModalForm = useModalForm({
    refineCoreProps: { action: "create" },
    initialValues,
    validate: {
      name: isNotEmpty("Tên sản phẩm không được bỏ trống"),
    },
  });
  const {
    modal: { show: showCreateModal },
  } = createModalForm;

  const columns = useMemo<MRT_ColumnDef<Partner>[]>(
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
        accessorKey: "address",
        header: "Địa chỉ",
      },
      {
        accessorKey: "phone",
        header: "Số điện thoại",
      },
      {
        accessorKey: "country", //normal accessorKey
        header: "Quốc gia",
      },
      {
        accessorKey: "is_customer",
        header: "Khách hàng",
      },
      {
        accessorKey: "is_supplier",
        header: "Nhà cung cấp",
      },
    ],
    []
  );
  if (tableQueryResult?.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <List>
      {/* <CreateItemModal {...createModalForm} /> */}
      <MantineReactTable
        columns={columns}
        data={partners}
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
