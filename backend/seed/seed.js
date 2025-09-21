const { faker } = require('@faker-js/faker');
const { Customer, Product, Sale, syncDb, Order } = require('../models');

const seed = async () => {
  await syncDb(); // This will drop and re-create tables

  // Seed Customers
  const customers = [];
  for (let i = 0; i < 20; i++) {
    customers.push(await Customer.create({
      name: faker.person.fullName(),
      region: faker.helpers.arrayElement(['North', 'South', 'East', 'West']),
      type: faker.helpers.arrayElement(['Individual', 'Business'])
    }));
  }

  // Seed Products
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push(await Product.create({
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: parseFloat(faker.commerce.price())
    }));
  }

  // Seed Sales (200 records over 2 years)
  for (let i = 0; i < 200; i++) {
    const product = faker.helpers.arrayElement(products);
    const customer = faker.helpers.arrayElement(customers);
    const quantity = faker.number.int({ min: 1, max: 5 });

    await Sale.create({
      ProductId: product.id,
      CustomerId: customer.id,
      quantity,
      totalAmount: quantity * product.price,
      saleDate: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }),
      region: customer.region,
      channel: faker.helpers.arrayElement(['Online', 'Offline']),
    });
  }

  // Seed Orders
  for (let i = 0; i < 200; i++) {
    const product = faker.helpers.arrayElement(products);
    const customer = faker.helpers.arrayElement(customers);
    
    await Order.create({
      productId: product.id,
      customerId: customer.id,
    });
  }

  console.log('Seeded Customers, Products, and Sales');
  process.exit();
};

seed();