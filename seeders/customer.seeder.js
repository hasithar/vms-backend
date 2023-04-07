import CustomerModel from "../models/Customer.model.js";
import customerData from "./../data/customer.data.json" assert { type: "json" };

const seedCustomers = () =>
  CustomerModel.insertMany(customerData)
    .then(() => console.info("🌱 Customers seeded successfully!"))
    .catch((err) => console.error(err));

export default seedCustomers;
