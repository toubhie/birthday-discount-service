const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };

interface Status {
  success: number;
  error: number;
  notfound: number;
  unauthorized: number;
  conflict: number;
  created: number;
  bad: number;
  nocontent: number;
  forbidden: number;
}

const status: Status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
  forbidden: 403,
};

interface TripStatuses {
  active: number;
  cancelled: number;
}

const trip_statuses: TripStatuses = {
  active: 1.0,
  cancelled: 2.0,
};

export {
  successMessage,
  errorMessage,
  status,
  trip_statuses,
};
