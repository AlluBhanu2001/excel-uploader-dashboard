
/**
 * Utility functions for handling file operations
 */

/**
 * Validates if the file is an Excel or CSV file
 * @param {File|null} file The file to validate
 * @returns {boolean} Boolean indicating if the file is valid
 */
export const isValidExcelFile = (file) => {
  if (!file) return false;
  
  const validExcelTypes = [
    'application/vnd.ms-excel',                                         // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.oasis.opendocument.spreadsheet',                    // .ods
    'text/csv',                                                          // .csv
    'application/csv',                                                   // .csv
    'text/x-csv',                                                        // .csv
    'application/x-csv'                                                  // .csv
  ];
  
  // Check by MIME type
  if (validExcelTypes.includes(file.type)) return true;
  
  // Check by extension as fallback
  const fileName = file.name.toLowerCase();
  return (
    fileName.endsWith('.xlsx') ||
    fileName.endsWith('.xls') ||
    fileName.endsWith('.csv') ||
    fileName.endsWith('.ods')
  );
};

/**
 * Formats file size in human-readable format
 * @param {number} bytes File size in bytes
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Mocks an API call to process an Excel file
 * @param {File} file The file to process
 * @returns {Promise<Object>} Promise that resolves with mocked data after a delay
 */
export const processExcelFile = async (file) => {
  // In a real application, you would send the file to your API endpoint
  // For this example, we'll mock the API call with a delay and return sample data
  
  // Create a FormData object to simulate how you might send the file to an API
  const formData = new FormData();
  formData.append('file', file);
  
  // Mock API call with a delay to simulate network latency
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // 90% chance of success to simulate occasional failures
      if (Math.random() > 0.1) {
        // Mock successful response with random data
        resolve({
          status: 'success',
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          processedAt: new Date().toISOString(),
          summary: {
            rowCount: Math.floor(Math.random() * 1000) + 100,
            columnCount: Math.floor(Math.random() * 20) + 5,
            sheets: Math.floor(Math.random() * 5) + 1
          },
          data: Array.from({ length: 10 }, (_, rowIndex) => ({
            id: rowIndex + 1,
            name: `Item ${rowIndex + 1}`,
            category: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'][Math.floor(Math.random() * 5)],
            price: +(Math.random() * 1000).toFixed(2),
            quantity: Math.floor(Math.random() * 100) + 1,
            total: +((Math.random() * 1000) * (Math.floor(Math.random() * 100) + 1)).toFixed(2)
          }))
        });
      } else {
        // Mock error response
        reject({
          status: 'error',
          message: 'Failed to process file. Server error.',
          code: 500
        });
      }
    }, 2000); // 2 second delay
  });
};
