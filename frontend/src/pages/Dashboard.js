// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Material-UI Imports
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date('2025-01-01'));
    const [revenueData, setRevenueData] = useState(null);
    const [regionStats, setRegionStats] = useState(null);
    const [topProducts, setTopProducts] = useState(null);
    const [topCustomers, setTopCustomers] = useState(null);

    const getChartOptions = (seriesData, title) => {
        return {
            title: { text: title, left: 'center' },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: seriesData.map(d => d.name) },
            yAxis: { type: 'value' },
            series: [{
                name: title,
                type: 'bar',
                data: seriesData.map(d => d.value),
                itemStyle: {
                    color: '#007BFF' // A consistent primary color
                }
            }],
            textStyle: {
                fontFamily: 'Roboto'
            }
        };
    };

    const getPieChartOptions = (seriesData, title) => {
        return {
            title: { text: title, left: 'center' },
            tooltip: { trigger: 'item' },
            series: [{
                name: title,
                type: 'pie',
                radius: '50%',
                data: seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Revenue Overview
                const revenueRes = await axios.get(`http://localhost:5000/analytics/revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                setRevenueData(revenueRes.data);

                // Revenue by Region
                const regionRes = await axios.get(`http://localhost:5000/analytics/region-stats?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                setRegionStats(regionRes.data);

                // Top Products
                const topProductsRes = await axios.get(`http://localhost:5000/analytics/top-products?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                setTopProducts(topProductsRes.data);

                // Top Customers
                const topCustomersRes = await axios.get(`http://localhost:5000/analytics/top-customers?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                setTopCustomers(topCustomersRes.data);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [startDate, endDate]);

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#333' }}>
                Sales Dashboard
            </Typography>

            <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="text.secondary">Start Date:</Typography>
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="text.secondary">End Date:</Typography>
                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Revenue Overview
                            </Typography>
                            <ReactECharts
                                option={getChartOptions(
                                    [
                                        { name: 'Total Revenue', value: revenueData?.totalRevenue || 0 },
                                        { name: 'Avg Order Value', value: revenueData?.avgOrderValue || 0 }
                                    ],
                                    ''
                                )}
                                style={{ height: 350 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Revenue by Region
                            </Typography>
                            <ReactECharts
                                option={getChartOptions(
                                    regionStats ? regionStats.map(d => ({ name: d.region, value: d.totalRevenue })) : [],
                                    ''
                                )}
                                style={{ height: 350 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Top Products by Order Count
                            </Typography>
                            <ReactECharts
                                option={getChartOptions(
                                    topProducts ? topProducts.map(p => ({ name: p.Product.name, value: p.orderCount })) : [],
                                    ''
                                )}
                                style={{ height: 350 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card raised>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Top Customers by Order Count
                            </Typography>
                            <ReactECharts
                                option={getChartOptions(
                                    topCustomers ? topCustomers.map(c => ({ name: c.Customer.name, value: c.orderCount })) : [],
                                    ''
                                )}
                                style={{ height: 350 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;