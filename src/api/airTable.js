const Airtable = require("airtable");

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE = process.env.REACT_APP_TABLE_TASKS;

export default function handler(req, res) {
  res.status(200).json();
}

export const airtableFetchRecords = async () => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: AIRTABLE_API_KEY,
  });
  const base = Airtable.base(AIRTABLE_BASE);
  const options = [];
  const query = {
    maxRecords: 1000,
    gridView: "Main View",
  };

  return new Promise((resolve, reject) => {
    base(AIRTABLE_TABLE)
      .select(query)
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            options.push(record);
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(options);
          }
        }
      );
  });
};

export const airtableFetchRecord = async (config, id) => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const base = Airtable.base(config.baseName);

  return new Promise((resolve, reject) => {
    base(config.table).find(id, (err, record) => {
      if (err) {
        reject(err);
      } else {
        resolve(config.recordBuilder(record));
      }
    });
  });
};

export const airtableUpdateRecord = async (config, id, data) => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const base = Airtable.base(config.baseName);

  return new Promise((resolve, reject) => {
    base(config.table).update(id, data, (err, record) => {
      if (err) {
        reject(err);
      } else {
        resolve(config.recordBuilder(record));
      }
    });
  });
};

export const loadList = async (filter, fields, fieldsMapping, config) => {
  const fieldsAttributes =
    fields && fields.length
      ? fields.map((field) => fieldsMapping[field])
      : Object.keys(fieldsMapping).map((key) => fieldsMapping[key]);
  return airtableFetchRecords(config, filter, fieldsAttributes);
};
