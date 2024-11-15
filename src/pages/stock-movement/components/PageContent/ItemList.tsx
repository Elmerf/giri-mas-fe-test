import { LOCAL_STORAGE_KEYS } from "@/constant";
import { useLocalStorage, useMessageWrapper } from "@/hooks";
import generateMockItems from "@/mocks/items";
import { Input, Modal, Table, TableColumnsType, TableProps } from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { ChangeEvent, useEffect, useState } from "react";
import { TaskFields } from ".";

type ItemListProps = {
  open?: boolean;
  onClose?: VoidFunction;
};

type ItemData = ReturnType<typeof generateMockItems>[0];

export const itemColumns: TableColumnsType<ItemData> = [
  {
    title: "Kode Barang",
    dataIndex: "kodeBarang",
    key: "kodeBarang",
  },
  {
    title: "Nama Barang",
    dataIndex: "namaBarang",
    key: "namaBarang",
  },
  {
    title: "Merk",
    dataIndex: "merk",
    key: "merk",
  },
  {
    title: "Jenis Barang",
    dataIndex: "jenisBarang",
    key: "jenisBarang",
  },
  {
    title: "Gudang",
    dataIndex: "gudang",
    key: "gudang",
  },
  {
    title: "Total Stock",
    dataIndex: "totalStock",
    key: "totalStock",
  },
];

const ItemList: React.FC<ItemListProps> = (props) => {
  const [modal, contextHolder] = Modal.useModal();
  const form = useFormInstance<TaskFields>();

  const { setItem, retrieveItem } = useLocalStorage();
  const { messageApi, contextHolder: ctxMessage } = useMessageWrapper();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [dataSource, setDataSource] = useState<ItemData[]>([]);

  const rowSelection: TableProps<ItemData>["rowSelection"] = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: ItemData[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedItems(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: form
        .getFieldValue("itemList")
        ?.some((item: ItemData) => item.key === record.key),
    }),
  };

  const handleCancel = () => {
    modal.confirm({
      centered: true,
      title: "Batalkan Penambahan Barang?",
      content: "Apakah Anda yakin ingin membatalkan penambahan barang?",
      onOk: () => {
        props.onClose?.();
      },
    });
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (value: string) => {
    const data = JSON.parse(retrieveItem(LOCAL_STORAGE_KEYS.ITEM_LIST) ?? "[]");
    const filteredData = data.filter((item: ItemData) => {
      return item.kodeBarang.includes(value) || item.namaBarang.includes(value);
    });

    setDataSource(filteredData);
  };

  const handleSubmitItem = () => {
    const currentItems = form.getFieldValue("itemList") || [];
    const updatedItems = selectedItems.map((selectedItem) => {
      const existingItem: ItemData = currentItems.find(
        (item: ItemData) => item.key === selectedItem.key
      );
      if (existingItem) {
        if (existingItem.locationList) {
          return existingItem;
        } else {
          return selectedItem;
        }
      }
      return selectedItem;
    });
    form.setFieldValue("itemList", updatedItems);

    messageApi.success("Barang berhasil ditambahkan ke daftar pemindahan.");

    props.onClose?.();
  };

  useEffect(() => {
    if (!props.open) {
      setSelectedRowKeys([]);
      setCurrentPage(1);
      setKeyword("");
    }

    if (props.open) {
      const selectedItems: ItemData[] | undefined =
        form.getFieldValue("itemList");
      if (selectedItems) {
        setSelectedRowKeys(selectedItems.map((item) => item.key));
      }
    }
  }, [props.open]);

  useEffect(() => {
    if (!retrieveItem(LOCAL_STORAGE_KEYS.ITEM_LIST)) {
      const data = generateMockItems(178);
      setItem(LOCAL_STORAGE_KEYS.ITEM_LIST, JSON.stringify(data));
    } else {
      const data = JSON.parse(
        retrieveItem(LOCAL_STORAGE_KEYS.ITEM_LIST) ?? "[]"
      );
      setDataSource(data);
    }
  }, []);

  return (
    <Modal
      open={props.open}
      title={"Tambah Barang"}
      onCancel={handleCancel}
      cancelText="Batal"
      okText="Tambah ke Daftar Pemindahan"
      okButtonProps={{ disabled: selectedRowKeys.length === 0 }}
      onOk={handleSubmitItem}
      width={"80%"}
    >
      {ctxMessage}
      {contextHolder}
      <Input.Search
        value={keyword}
        placeholder="Cari kode/nama barang"
        style={{ maxWidth: "48ch", marginBlock: "1em" }}
        onSearch={handleSearch}
        onChange={handleChangeSearch}
      />
      <Table<ItemData>
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        dataSource={dataSource}
        columns={itemColumns}
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
    </Modal>
  );
};

export default ItemList;
