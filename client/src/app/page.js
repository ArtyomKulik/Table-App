"use client";

import TableCellInput from "@/components/TableCellInput";
import { useRefreshQuery } from "@/redux/auth/authApiSlice";
import { useGetAllTableDataQuery } from "@/redux/baseSlice/apiSlice";

import { searchByColumn, sortData } from "@/redux/baseSlice/slice";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
} from "@nextui-org/react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    key: "text",
    label: "Текст",
  },
  {
    key: "link",
    label: "Ссылка",
  },
];

export default function App() {
  const dispatch = useDispatch();

  const { data } = useRefreshQuery();

  const { error, isLoading } = useGetAllTableDataQuery();

  const dataTableCell = useSelector((state) => state.slice.data);

  const filteredData = useSelector((state) => state.slice.filteredData);
  const sortOrder = useSelector((state) => state.slice.sortOrder);

  const displayData = filteredData.length > 0 ? filteredData : dataTableCell;

  const searchHandler = (e, colKey) => {
    dispatch(searchByColumn({ inputVal: e.target.value, colKey }));
  };

  const inputRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Ошибка: {error.message}
      </div>
    );
  }

  return (
    <>
      <Button
        className="z-10 border-red-500 border-4	border-solid"
        onClick={() => dispatch(sortData(dataTableCell))}
      >
        Сортировать по времени обновления {sortOrder === "asc" ? "↑" : "↓"}
      </Button>
      <Table aria-label="Example table with dynamic content">
        <TableHeader className="-pr-2 pl-0  ">
          {columns.map((column) => (
            <TableColumn className={`px-0`} key={column.key}>
              <Input
                ref={inputRef}
                onClick={() => inputRef.current.focus()}
                variant="bordered"
                onChange={(e) => searchHandler(e, column.key)}
                placeholder={`Поиск по ${
                  column.label === "Текст" ? "тексту" : "ссылке"
                }`}
                clearable
                size="md"
              />
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody items={displayData}>
          {(item) => (
            <TableRow className="border border-gray-300" key={item.key}>
              {(columnKey) => (
                <TableCell>
                  <TableCellInput
                    inputValue={getKeyValue(item, columnKey)}
                    item={item}
                    columnKey={columnKey}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
