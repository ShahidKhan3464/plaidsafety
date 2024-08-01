import React from 'react';
import { Icons } from 'assets';
import { StyledFileUpload } from './style';
import { IconButton } from '@mui/material';
import { StyledFormLabel } from 'styles/global';
import ClearIcon from '@mui/icons-material/Clear';
import { capitalizeFirstLetter, formatBytes } from 'utils';

/**
 * FileUpload component for handling file input and display.
 *
 * @param {string} label - The label for the file input.
 * @param {boolean} multiple - Whether multiple files can be selected.
 * @param {string} previewURL - URL for previewing a single file.
 * @param {Object} selectedFile - The selected file object.
 * @param {Object} fileInputRef - Reference to the file input element.
 * @param {Array} fileMaterials - Array of file objects for multiple file uploads.
 * @param {function} handleFileUpload - Function to handle file upload.
 * @param {function} handleRemoveFile - Function to handle removing a file.
 *
 * @example
 * // Example usage of FileUpload component
 * <FileUpload
 *   label="Upload File"
 *   multiple={false}
 *   previewURL="/path/to/thumbnail.jpg"
 *   selectedFile={selectedFile}
 *   fileInputRef={fileInputRef}
 *   fileMaterials={fileMaterials}
 *   handleFileUpload={(e) => handleFileUpload(e)}
 *   handleRemoveFile={(id) => handleRemoveFile(id)}
 * />
 */
const FileUpload = ({
  label,
  isLoading,
  fileMaterials,
  multiple = true,
  disabled = false,
  handleFileUpload,
  handleRemoveFile
}) => {

  const checkFileName = (item) => {
    const extension = item?.originalname?.split(".").pop().toLowerCase();
    if (extension !== 'pdf' && extension !== 'document') {
      return (
        <div className="file_uploaded_card_content_img">
          <img src={item.url} alt={item.name} />
        </div>
      );
    }
  };

  return (
    <StyledFileUpload>
      <StyledFormLabel>{label}</StyledFormLabel>
      <label htmlFor="file" className="fileUpload">
        <input
          type="file"
          name="file"
          id="file-input"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e)}
        />
        <div onClick={() => document.getElementById('file-input').click()}>
          <img alt="file" src={Icons.file} />
          <span>{isLoading ? 'Loading...' : 'Add Attachment'}</span>
        </div>
      </label>
      {!!fileMaterials.length &&
        <div className="file_uploaded">
          {fileMaterials.map((item, index) => {
            return (
              <div key={item.id} className="file_uploaded_card">
                <div className="file_uploaded_card_content">
                  {checkFileName(item)}
                  <div>
                    <h6>{capitalizeFirstLetter(item.name)}</h6>
                    <p>{formatBytes(item.size)}</p>
                  </div>
                </div>
                <div className="file_uploaded_card_clear">
                  <IconButton
                    size="large"
                    sx={{ padding: 0 }}
                    disabled={disabled}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      }
    </StyledFileUpload>
  );
};

export default FileUpload;
