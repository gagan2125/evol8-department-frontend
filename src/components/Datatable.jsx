/* eslint-disable react/jsx-key */
import { useTable, usePagination, useGlobalFilter } from "react-table";

// eslint-disable-next-line react/prop-types
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search your Queries..."
      className="border p-2 rounded mb-4 w-96"
    />
  );
};

// eslint-disable-next-line react/prop-types
const Datatable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // eslint-disable-next-line no-unused-vars
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table {...getTableProps()} className="table-auto w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border px-4 py-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const { key, ...restProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restProps} className="border px-4 py-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="bg-slate-300 text-white py-2 px-4 rounded hover:bg-slate-400"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-slate-300 text-white py-2 px-4 rounded hover:bg-slate-400"
        >
          {"<"}
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-slate-300 text-white py-2 px-4 rounded hover:bg-slate-400"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
          className="bg-slate-300 text-white py-2 px-4 rounded hover:bg-slate-400"
        >
          {">>"}
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-2 rounded w-52"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Datatable;
