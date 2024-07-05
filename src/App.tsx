import { useState } from 'react'
import { generateDummyData } from './data/generate_data';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import QueryFilterInput from './query_filter_input/QueryFilterInput';
import { Query, Column, ColumnType } from './types';
import './App.css'



// const dummyData = generateDummyData(50)
function App() {
  // console.log('dummyData',dummyData)
  const columns: Column<ColumnType>[] = [
    { name: "Deal ID", type: "number" },
    { name: "Contact Name", type: "string" },
    { name: "Company Name", type: "string" },
    { name: "Email", type: "string" },
    { name: "Phone Number", type: "string" },
    { name: "Deal Stage", type: "string" },
    { name: "Deal Value", type: "number" },
    { name: "Close Date", type: "date" },
    { name: "Last Contact Date", type: "date" },
    { name: "Next Follow-up Date", type: "date" },
    { name: "Notes", type: "string" },
    { name: "Assigned To", type: "string" },
    { name: "Source", type: "string" },
    { name: "Industry", type: "string" },
    { name: "Region", type: "string" },
    { name: "Priority", type: "string" },
    { name: "Status", type: "string" },
    { name: "Tags", type: "string" },
    { name: "Created Date", type: "date" },
    { name: "Modified Date", type: "date" },
    { name: "Communication Channel", type: "string" },
    { name: "Follow-up Count", type: "number" },
    { name: "Deal Type", type: "string" },
    { name: "Product Interest", type: "string" },
    { name: "Competitor", type: "string" },
    { name: "Probability of Closing", type: "number" },
    { name: "Sales Cycle Length", type: "number" },
    { name: "Meeting Scheduled", type: "boolean" },
    { name: "Proposal Sent Date", type: "date" },
    { name: "Contract Sent Date", type: "date" },
    { name: "Deal Won Date", type: "date" },
    { name: "Deal Lost Date", type: "date" },
    { name: "Reason for Loss", type: "string" },
    { name: "Renewal Date", type: "date" },
    { name: "Lead Source Campaign", type: "string" },
    { name: "Initial Contact Date", type: "date" },
    { name: "Contact Role", type: "string" },
    { name: "Decision Maker", type: "boolean" },
    { name: "Customer Segment", type: "string" },
    { name: "Deal Duration", type: "number" },
    { name: "Customer Satisfaction Score", type: "number" },
    { name: "Renewal Likelihood", type: "number" },
    { name: "Customer Feedback", type: "string" },
    { name: "Attachments", type: "string" },
    { name: "Team Members", type: "string" },
    { name: "Budget", type: "number" },
    { name: "Competitor Pricing", type: "number" },
    { name: "Pain Points", type: "string" },
    { name: "Product Demo Date", type: "date" },
    { name: "Contract Value", type: "number" },
    { name: "Implementation Start Date", type: "date" },
    { name: "Implementation End Date", type: "date" },
    { name: "Service Level Agreement", type: "string" },
    { name: "Training Required", type: "boolean" },
    { name: "Training Date", type: "date" },
    { name: "Support Contact", type: "string" },
    { name: "Onboarding Status", type: "string" },
    { name: "Product Usage Frequency", type: "string" },
    { name: "Churn Risk", type: "number" },
    { name: "Referral Potential", type: "string" },
    { name: "Case Studies Available", type: "boolean" },
    { name: "Case Study Date", type: "date" },
    { name: "Event Participation", type: "string" },
    { name: "Marketing Material Sent", type: "boolean" },
    { name: "Custom Field 1", type: "string" },
    { name: "Custom Field 2", type: "string" },
    { name: "Custom Field 3", type: "string" },
    { name: "Custom Field 4", type: "string" },
    { name: "Custom Field 5", type: "string" },
  ];
  
  const handleQueryChange = (queries: Query[]) => {
    console.log('Updated Queries:', queries);
  };
  // const table = useReactTable({
  //   data: dummyData,
  //   columns: columns.map(c => ({accessorKey: c.name})),
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <>
      <div>
        <QueryFilterInput
          columns={columns}
          onQueryChange={handleQueryChange}
        />
        {/* <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>   */}
      </div>
      
    </>
  )
}

export default App
