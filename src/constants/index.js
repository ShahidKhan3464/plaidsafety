// Default payload data used for API requests
export const PAYLOAD_DATA = {
  page: 1,
  pageSize: 5,
  condition: {},
  sortOrder: 'DESC',
  sortColumn: 'name'
};

export const STATUS_COLORS = {
  NOTSTARTED: {
    color: '#1972F9',
    background: '#DDEBFF'
  },
  COMPLETED: {
    color: '#00A64D',
    background: '#D7FFDF'
  },
  DELAYED: {
    color: '#D84343',
    background: '#FFE2E2'
  },
  INPROGRESS: {
    color: '#FF8A00',
    background: '#FFE9CF'
  },
  CLOSED: {
    color: '#00A64D',
    background: '#D7FFDF'
  },
  ACTIVE: {
    color: '#00A64D',
    background: '#D7FFDF'
  },
  INACTIVE: {
    color: '#D84343',
    background: '#FFE2E2'
  },
};

export const PRIORITY_STATUS = {
  LOW: {
    color: '#FFF',
    background: '#00A64D'
  },
  HIGH: {
    color: '#FFF',
    background: '#D84343'
  },
  MEDIUM: {
    color: '#4E4D4D',
    background: '#FCDB2C'
  }
};
export const INDUSTRY = [
  {
    text: "IT",
    value: "IT",
  },
  {
    text: "R & D",
    value: "R & D",
  },
  {
    text: "Educational",
    value: "Educational",
  },
  {
    text: "Marketing",
    value: "Marketing",
  },
];

export const sizeOfComapny = [
  {
    text: "5-10",
    value: "5-10",
  },
  {
    text: "10-50",
    value: "10-50",
  },
  {
    text: "50-100",
    value: "50-100",
  },
  {
    text: "100-500",
    value: "100-500",
  },
];