import React from "react";
import { enqueueSnackbar } from 'notistack';
import TextField from "components/textField";
import TimePicker from "components/timePicker";
import DatePicker from "components/datePicker";
import FileUpload from "components/fileUpload";
import CustomCheckbox from "components/checkbox";
import SelectField from "components/selectField";
import RadioButtons from "components/radioButtons";
import SearchSelect from "components/searchSelect";
import { multiple } from 'provider/features/upload/upload.service';

// Function to get the access token from local storage
export const getAccessToken = () => {
  const auth_token = localStorage.getItem("auth_token");
  if (auth_token !== null) {
    return JSON.parse(auth_token);
  }
  return null;
};

// Function to get user data from local storage
export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  }
  return null;
};

// Function to generate uniqueId
export const generateUniqueId = (prefix) => {
  const randomId = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}${randomId}`;
}

// Function to truncate a string if it exceeds 30 characters
export const truncatedString = (str) => {
  const truncatedText = str?.length > 60 ? `${str.slice(0, 55)}...` : str;
  return truncatedText;
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.toLowerCase().substring(1);
};

// Function to format bytes to human-readable size.
export const formatBytes = (bytes) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Function to handle formControl
export const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <TextField {...rest} />;
    case 'select':
      return <SelectField {...rest} />;
    case 'checkbox':
      return <CustomCheckbox {...rest} />;
    case 'radio':
      return <RadioButtons {...rest} />;
    case 'searchSelect':
      return <SearchSelect {...rest} />;
    case 'file':
      return <FileUpload {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    case 'time':
      return <TimePicker {...rest} />;
    default:
      return null;
  }
};

// Function to handle file uploads
export const handleMultipleFiles = async (acceptedFormats, files, setFileLoader, setAttachments) => {
  try {
    setFileLoader(true);
    let hasUnsupportedFile = false;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    }

    if (Object.keys(files).length > 5) {
      enqueueSnackbar("You cannot upload more than 5 files", { variant: "error" });
      setFileLoader(false);
      return;
    }

    Object.values(files).forEach((file) => {
      const fileExtension = file.name?.split(".").pop().toLowerCase();
      if (!acceptedFormats.includes(fileExtension)) {
        enqueueSnackbar("Unsupported file format.", { variant: "error" });
        hasUnsupportedFile = true;
        return;
      }
      formData.append("files", file);
    });

    if (hasUnsupportedFile) {
      setFileLoader(false);
      return;
    }

    const res = await multiple(formData);
    const updatedAttachs = res?.data?.data?.files.map((file) => ({
      key: file.key,
      size: file.size,
      url: file.location,
      name: file.originalname,
    }));

    setFileLoader(false);
    setAttachments(prev => [...prev, ...updatedAttachs]);
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ?? "Something went wrong. Please try again";
    enqueueSnackbar(errorMessage, { variant: "error" });
    setFileLoader(false);
  }
};
