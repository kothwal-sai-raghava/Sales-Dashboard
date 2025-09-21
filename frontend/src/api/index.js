import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

export const getRevenue = (startDate, endDate) =>
  api.get(`/revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);

export const getRegionStats = (startDate, endDate) =>
  api.get(`/region-stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);

export const getTopProducts = (startDate, endDate) =>
  api.get(`/top-products?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);

export const getTopCustomers = (startDate, endDate) =>
  api.get(`/top-customers?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
