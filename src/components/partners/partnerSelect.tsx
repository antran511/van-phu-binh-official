import { Select, SelectItem } from "@mantine/core";
import { UseModalFormReturnType, useSelect } from "@refinedev/mantine";
import { Partner } from "~/utility/interface";
import { BaseRecord, HttpError, useCreate } from "@refinedev/core";
import { useEffect, useMemo, useState, memo } from "react";

interface PartnerSelectProps {
	[rest:string]: any
}

export const PartnerSelect = (props: any) => {
	const [partner, setPartner] = useState<string | null>(null)
	const { selectProps } = useSelect<Partner>({
    resource: "partners",
    optionLabel: "name",
    optionValue: "id",
		debounce: 500,
  });
	const { mutate } = useCreate();
	console.log('partner', partner)
	return (
		<Select
			required
			onCreate={(query) => {
        mutate({
					resource: "partners",
					values: {
							name: query,
							is_customer: true
					},
					meta: {
						select: "id, name"
					}
				}, {
					onSuccess(data) {
						const newPartner = data?.data
						const item = { value: newPartner?.id, label: newPartner?.name };
						console.log('item.value', item.value)
						setPartner(item.value as string)
					},
				});
				return '25';
      }}
			value={partner}
			onChange={setPartner}
			mt={8}
			data={selectProps?.data}
			{...props}
			searchable
			filterDataOnExactSearchMatch
			clearable
			nothingFound="No options"
			label="Khách hàng"
			placeholder="Hãy chọn một"
			creatable
			getCreateLabel={(query) => `+ Thêm ${query}`}
		/>
	)
}


