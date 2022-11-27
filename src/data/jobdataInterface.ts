export interface JobData {
  year: string;
  occupation: string;
  value: string;
}

export interface JobDataInterface {
  Alberta: JobData[];
  "British Columbia": JobData[];
  Manitoba: JobData[];
  "New Brunswick": JobData[];
  "Newfoundland and Labrador": JobData[];
  "Northwest Territories": JobData[];
  "Nova Scotia": JobData[];
  Nunavut: JobData[];
  Ontario: JobData[];
  "Prince Edward Island": JobData[];
  Quebec: JobData[];
  Saskatchewan: JobData[];
  Yukon: JobData[];
}
