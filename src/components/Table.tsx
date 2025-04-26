interface TableProps {
  tableHeaders: string[],
  dataSource: any[],
  renderRow: (data: any) => React.ReactNode
}

function Table({ tableHeaders, dataSource, renderRow }: TableProps) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {tableHeaders.map(header => (
            <th key={header} scope="col" className="px-6 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map(data => renderRow(data))}
        {/* {dataSource.map(data => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {data.full_name}
            </th>
            <td className="px-6 py-4">{data.email}</td>
            <td className="px-6 py-4">{data.address.name}</td>
            <td className="px-6 py-4">{data.city}</td>
            <td className="px-6 py-4">{data.country}</td>
            <td className="px-6 py-4">{data.state}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  )
}

export default Table