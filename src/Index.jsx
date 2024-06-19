import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaTrash, FaDownload, FaPlus } from 'react-icons/fa';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(result.meta.fields);
        setData(result.data);
      },
    });
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <Box p={4}>
      <Input type="file" accept=".csv" onChange={handleFileUpload} mb={4} />
      <Button leftIcon={<FaPlus />} onClick={handleAddRow} mb={4}>
        Add Row
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header) => (
                <Td key={header}>
                  <Input
                    value={row[header] || ''}
                    onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                  />
                </Td>
              ))}
              <Td>
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleRemoveRow(rowIndex)}
                  aria-label="Remove row"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button leftIcon={<FaDownload />} mt={4}>
        <CSVLink data={data} headers={headers} filename="edited_data.csv">
          Download CSV
        </CSVLink>
      </Button>
    </Box>
  );
};

export default Index;