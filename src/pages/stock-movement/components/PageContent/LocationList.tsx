import { LOCAL_STORAGE_KEYS } from "@/constant";
import { useLocalStorage, useMessageWrapper } from "@/hooks";
import generateMockLocation, { LocationType } from "@/mocks/location";
import { Form, Modal, Table, TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import { TaskFields } from ".";

type locationListProps = {
  open?: boolean;
  onClose?: VoidFunction;
  itemId?: React.Key;
};

export const columns: TableColumnsType<LocationType> = [
  {
    title: "Nama Lokasi",
    dataIndex: "namaLokasi",
    key: "namaLokasi",
  },
  {
    title: "Gudang",
    dataIndex: "gudang",
    key: "gudang",
  },
  {
    title: "Jenis",
    dataIndex: "jenis",
    key: "jenis",
  },
  {
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "Deskripsi",
    dataIndex: "deskripsi",
    key: "deskripsi",
  },
];

const LocationList: React.FC<locationListProps> = (props) => {
  const form = Form.useFormInstance<TaskFields>();
  const [modal, contextHolder] = Modal.useModal();
  const { messageApi, contextHolder: ctxMessage } = useMessageWrapper();
  const { retrieveItem, setItem } = useLocalStorage();

  const [_, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<LocationType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedItems, setSelectedItems] = useState<LocationType[]>([]);

  const rowSelection: TableProps<LocationType>["rowSelection"] = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: LocationType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedItems(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: form
        .getFieldValue("itemList")
        ?.find((item: any) => item.key === props.itemId)
        ?.locationList?.some((item: any) => item.key === record.key),
    }),
  };

  const handleSubmit = () => {
    const itemList = form.getFieldValue("itemList");
    const updatedItemList = itemList.map((item: any) => {
      if (item.key === props.itemId) {
        return {
          ...item,
          locationList: selectedItems,
        };
      }
      return item;
    });

    form.setFieldsValue({
      itemList: updatedItemList,
    });

    messageApi.success("Lokasi berhasil ditambahkan");

    props.onClose?.();
  };

  const handleCancel = () => {
    modal.confirm({
      centered: true,
      title: "Batalkan Penambahan Lokasi?",
      content: "Apakah Anda yakin ingin membatalkan penambahan lokasi?",
      onOk: () => {
        props.onClose?.();
      },
    });
  };

  useEffect(() => {
    if (!props.open) {
      setSelectedRowKeys([]);
      setCurrentPage(1);
    }

    if (props.open) {
      const selectedItems = form.getFieldValue("itemList") || [];
      const findData = selectedItems.find(
        (item: any) => item.key === props.itemId
      );
      if (findData) {
        setSelectedRowKeys(findData.locationList?.map((item: any) => item.key));
      }
    }
  }, [props.open]);

  useEffect(() => {
    if (!retrieveItem(LOCAL_STORAGE_KEYS.LOCATION_LIST)) {
      const data = generateMockLocation(15);
      setItem(LOCAL_STORAGE_KEYS.LOCATION_LIST, JSON.stringify(data));
    } else {
      const data = JSON.parse(
        retrieveItem(LOCAL_STORAGE_KEYS.LOCATION_LIST) ?? "[]"
      );
      setDataSource(data);
    }
  }, []);

  return (
    <Modal
      centered
      title="Pilih Lokasi"
      onCancel={handleCancel}
      open={props.open}
      cancelText="Batal"
      okText="Tambahkan"
      okButtonProps={{ disabled: selectedItems.length === 0 }}
      onOk={handleSubmit}
      width={"80%"}
    >
      {contextHolder}
      {ctxMessage}
      <Table<LocationType>
        dataSource={dataSource}
        columns={columns}
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
    </Modal>
  );
};

export default LocationList;
