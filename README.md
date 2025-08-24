# FlowerShop API

FlowerShop is an e-commerce backend API built with **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, product management, orders, and shopping cart. Admins can manage users, products, orders, and carts, while normal users can browse products, create orders, and manage their cart.

## Features

**Users:** register, login, view profile; Admins can view all users, get user by ID, delete users.  
**Products:** view all products, view product by ID; Admins can add/update products (quantity increments if exists), delete products.  
**Orders:** users can create orders; Admins can view all orders, get by ID, update status, delete orders.  
**Cart:** users manage their own cart; Admins can view all carts or individual carts.

## Example API Endpoints

**Users**
- POST /api/user/register → Register user  
- POST /api/user/login → Login  
- GET /api/user/profile → View own profile  
- GET /api/user → View all users (Admin)  
- GET /api/user/:id → Get user by ID (Admin)  
- DELETE /api/user/:id → Delete user (Admin)  

**Products**
- GET /api/products → View all products  
- GET /api/products/:id → View product by ID  
- POST /api/products → Add/update product (Admin)  
- PUT /api/products/:id → Update product (Admin)  
- DELETE /api/products/:id → Delete product (Admin)  

**Orders**
- POST /api/orders  → Create order  
- GET /api/orders  → View all orders (Admin)  
- GET /api/orders/:id → View order by ID (Admin)  
- PUT /api/orders/:id → Update order status (Admin)  
- DELETE /api/orders/:id → Delete order (Admin)  

**Cart**
- POST /api/carts → Add cart  
- GET /api/carts → View all carts (Admin)  
- GET /api/carts/:id → View cart by ID (Admin)  
- PUT /api/carts/:id → Update cart  
- DELETE /api/carts/:id → Delete cart  


