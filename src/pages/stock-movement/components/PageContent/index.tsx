import { useMessageWrapper } from "@/hooks";
import generateMockItems from "@/mocks/items";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import ItemList, { itemColumns } from "./ItemList";
import LocationList, { columns as locationColumns } from "./LocationList";
import useStyles from "./styles";
import { LocationType } from "@/mocks/location";
import USERS from "@/mocks/user";

type ItemList = ReturnType<typeof generateMockItems>;

export type TaskFields = {
  taskNumber: string;
  assignedTo: string;
  itemList: ItemList;
};

type TaskList = {
  key: React.Key;
  taskNumber: string;
  assignedTo: string;
  itemName: string;
  totalLocation: number;
};

const taskListColumns = [
  {
    title: "Task No",
    dataIndex: "taskNumber",
    key: "taskNumber",
  },
  {
    title: "Assigned To",
    dataIndex: "assignedTo",
    key: "assignedTo",
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Total Location",
    dataIndex: "totalLocation",
    key: "totalLocation",
  },
];

const generateTaskNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, "");
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${datePart}${timePart}${randomPart}`;
};

const PageContent: React.FC = () => {
  const [form] = useForm<TaskFields>();
  const [modal, contextHolder] = Modal.useModal();

  // Rerender the table when the item list is updated
  const [_, setCount] = useState(0);

  const { styles } = useStyles();

  const { messageApi, contextHolder: ctxMessage } = useMessageWrapper();

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [isItemListOpen, setIsItemListOpen] = useState(false);
  const [isLocationListOpen, setIsLocationListOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<React.Key>("");

  const [taskList, setTaskList] = useState<TaskList[]>([]);

  const onClickAddNewTask = () => {
    setIsAddingNewTask(true);
  };

  const onClickCancelAddNewTask = () => {
    setIsAddingNewTask(false);
  };

  const openItemListModal = () => {
    setIsItemListOpen(true);
  };

  const closeItemListModal = () => {
    setIsItemListOpen(false);
  };

  const openLocationListModal = (itemId: React.Key) => {
    setSelectedItemId(itemId);
    setIsLocationListOpen(true);
  };

  const closeLocationListModal = () => {
    setSelectedItemId("");
    setIsLocationListOpen(false);
  };

  const handledDeleteItem = (deleteItem: ItemList[number]) => {
    modal.confirm({
      centered: true,
      title: "Hapus Item",
      content: `Apakah Anda yakin ingin menghapus item ini? ${deleteItem.namaBarang}`,
      onOk: () => {
        form.setFieldValue(
          "itemList",
          form
            .getFieldValue("itemList")
            ?.filter((item: ItemList[number]) => item.key !== deleteItem.key)
        );

        messageApi.info("Barang berhasil dihapus");

        setCount((prev) => prev + 1);
      },
    });
  };

  const handleDeleteLocation = (itemKey: React.Key, locationKey: React.Key) => {
    modal.confirm({
      centered: true,
      title: "Hapus Lokasi",
      content: "Apakah Anda yakin ingin menghapus lokasi ini?",
      onOk: () => {
        const itemList = form.getFieldValue("itemList");
        const updatedItemList = itemList.map((item: ItemList[number]) => {
          if (item.key === itemKey) {
            return {
              ...item,
              locationList: item?.locationList?.filter(
                (location) => location.key !== locationKey
              ),
            };
          }
          return item;
        });
        form.setFieldsValue({
          itemList: updatedItemList,
        });

        messageApi.info("Lokasi berhasil dihapus");

        setCount((prev) => prev + 1);
      },
    });
  };

  const handleGenerateTask = () => {
    if (!form.getFieldValue("assignedTo")) {
      return messageApi.error("Karyawan belum dipilih");
    }
    if (!form.getFieldValue("itemList")?.length) {
      return messageApi.error("Tidak ada barang yang dipilih");
    }
    if (
      form.getFieldValue("itemList")?.some((item: any) => !item.locationList)
    ) {
      return messageApi.error("Belum semua barang memiliki lokasi");
    }

    setTaskList((prev) => [
      ...prev,
      {
        key: prev.length,
        taskNumber: form.getFieldValue("taskNumber"),
        assignedTo: form.getFieldValue("assignedTo"),
        itemName: form
          .getFieldValue("itemList")
          .map((item: any) => item.namaBarang)
          .join(", "),
        totalLocation: form
          .getFieldValue("itemList")
          .reduce(
            (acc: number, item: any) => acc + item.locationList.length,
            0
          ),
      },
    ]);

    form.resetFields(["taskNumber", "assignedTo", "itemList"]);

    messageApi.success("Task berhasil dibuat");
  };

  const renderAddNewItemButton = () => {
    return (
      <Button
        type="primary"
        style={{ width: "max-content" }}
        onClick={openItemListModal}
      >
        Tambah Barang
      </Button>
    );
  };

  useEffect(() => {
    if (isAddingNewTask) {
      form.setFieldsValue({
        taskNumber: generateTaskNumber(),
      });
    }
  }, [isAddingNewTask]);

  return (
    <Flex vertical style={{ padding: "2em" }} gap={"1em"}>
      {ctxMessage}
      {contextHolder}
      {!isAddingNewTask ? (
        <Button
          type="primary"
          style={{ width: "max-content" }}
          onClick={onClickAddNewTask}
        >
          Task Baru
        </Button>
      ) : (
        <Card title="Buat Task Baru">
          <Form<TaskFields>
            form={form}
            initialValues={{ taskNumber: generateTaskNumber() }}
          >
            <Space size={"middle"}>
              <Form.Item<TaskFields>
                name={"taskNumber"}
                label="Task No"
                layout="vertical"
                className={styles["input-container"]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item<TaskFields>
                name={"assignedTo"}
                label="Assigned To"
                layout="vertical"
                className={styles["input-container"]}
              >
                <Select placeholder="Pilih Karyawan">
                  {USERS.filter((user) => user.username !== "admin").map(
                    (user) => (
                      <Select.Option key={user.name} value={user.name}>
                        {user.name}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Space>
            <Divider />

            {form.getFieldValue("itemList")?.length > 0 ? (
              <Flex vertical gap={"1em"}>
                {renderAddNewItemButton()}
                <Table<ItemList[number]>
                  expandable={{
                    expandedRowRender: (record) =>
                      record?.locationList?.length &&
                      record.locationList.length > 0 ? (
                        <Table<LocationType>
                          dataSource={record.locationList.map((item) => ({
                            ...item,
                            itemKey: record.key,
                          }))}
                          columns={[
                            {
                              title: "Lokasi Awal",
                              dataIndex: "namaLokasi",
                              key: "namaLokasi",
                            },
                            {
                              title: "QTY",
                              dataIndex: "QTY (PCS)",
                              render: () => <Input type="number" />,
                            },
                            {
                              title: "Satuan",
                              dataIndex: "satuan",
                              render: () => (
                                <Select placeholder="Pilih Satuan">
                                  <Select.Option value="PCS">Pcs</Select.Option>
                                  <Select.Option value="lusin">
                                    Lusin
                                  </Select.Option>
                                  <Select.Option value="ratus">
                                    Ratus
                                  </Select.Option>
                                </Select>
                              ),
                            },
                            {
                              title: "Jumlah",
                              dataIndex: "volume",
                              key: "volume",
                            },
                            {
                              title: "Tindakan",
                              key: "action",
                              render: (_, record) => (
                                <Button
                                  icon={<DeleteOutlined />}
                                  onClick={() =>
                                    handleDeleteLocation(
                                      record.itemKey ?? 1,
                                      record.key
                                    )
                                  }
                                ></Button>
                              ),
                            },
                          ]}
                          pagination={false}
                          style={{ maxWidth: "40em" }}
                        />
                      ) : (
                        <Space direction="vertical">
                          <span>Belum ada lokasi</span>
                          <span style={{ color: "#9CA3AF" }}>
                            Silahkan pilih dan tambahkan lokasi dengan menekan{" "}
                            <b style={{ color: "black" }}>“+ Lokasi”</b>{" "}
                            terlebih dahulu untuk memindahkan barang
                          </span>
                        </Space>
                      ),
                  }}
                  dataSource={[...form.getFieldValue("itemList")]}
                  columns={[
                    Table.SELECTION_COLUMN,
                    Table.EXPAND_COLUMN,
                    ...itemColumns,
                    {
                      title: "Aksi",
                      key: "action",
                      render: (_, record) => (
                        <Space>
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => openLocationListModal(record.key)}
                          >
                            Lokasi
                          </Button>
                          <Button
                            type="default"
                            icon={<DeleteOutlined />}
                            onClick={() => handledDeleteItem(record)}
                          ></Button>
                        </Space>
                      ),
                    },
                  ]}
                  rowSelection={{ type: "checkbox" }}
                />
              </Flex>
            ) : (
              <Flex
                vertical
                align="center"
                className={styles["no-item-container"]}
              >
                <b>Belum Ada Barang</b>
                <span style={{ color: "#9CA3AF", marginBlockEnd: "0.75em" }}>
                  Silahkan tambah barang terlebih dahulu untuk mulai memindahkan
                </span>
                {renderAddNewItemButton()}
              </Flex>
            )}

            <Flex
              justify="flex-end"
              gap={"1em"}
              style={{ marginBlockStart: "1em" }}
            >
              <Button type="default" onClick={onClickCancelAddNewTask}>
                Batal
              </Button>
              <Button type="primary" onClick={handleGenerateTask}>
                Generate Task
              </Button>
            </Flex>

            <ItemList onClose={closeItemListModal} open={isItemListOpen} />
            <LocationList
              onClose={closeLocationListModal}
              open={isLocationListOpen}
              itemId={selectedItemId}
            />
          </Form>
        </Card>
      )}

      <h2>Daftar Task</h2>
      <Table<TaskList> dataSource={taskList} columns={taskListColumns} />
    </Flex>
  );
};

export default PageContent;
