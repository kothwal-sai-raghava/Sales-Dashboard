// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/analytics', // point to backend
});

export const getRevenue = (startDate, endDate) =>
  api.get(`/revenue?startDate=${startDate}&endDate=${endDate}`);

export const getRegionStats = (startDate, endDate) =>
  api.get(`/region-stats?startDate=${startDate}&endDate=${endDate}`);

export const getTopProducts = (startDate, endDate) =>
  api.get(`/top-products?startDate=${startDate}&endDate=${endDate}`);

export const getTopCustomers = (startDate, endDate) =>
  api.get(`/top-customers?startDate=${startDate}&endDate=${endDate}`);
