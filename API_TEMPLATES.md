# API Templates for Common App Features

This document provides ready-to-use API templates that you can customize based on your Figma designs.

## 📋 Available Templates

### 1. ✅ Profile Management (IMPLEMENTED)
- `GET /api/v1/profile` - Get profile
- `PUT /api/v1/profile` - Update profile
- `PATCH /api/v1/profile/avatar` - Update avatar
- `PATCH /api/v1/profile/preferences` - Update preferences

### 2. Products/Items Management (Template)
- `GET /api/v1/products` - List products
- `GET /api/v1/products/:id` - Get product
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### 3. Orders Management (Template)
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/:id` - Get order
- `POST /api/v1/orders` - Create order
- `PUT /api/v1/orders/:id` - Update order status

### 4. Cart Management (Template)
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/:id` - Update cart item
- `DELETE /api/v1/cart/items/:id` - Remove from cart

### 5. Notifications (Template)
- `GET /api/v1/notifications` - Get notifications
- `PUT /api/v1/notifications/:id/read` - Mark as read
- `PUT /api/v1/notifications/read-all` - Mark all as read

### 6. Search (Template)
- `GET /api/v1/search?q=query` - Global search
- `GET /api/v1/search/products?q=query` - Search products
- `GET /api/v1/search/users?q=query` - Search users

### 7. Dashboard (Template)
- `GET /api/v1/dashboard` - Get dashboard data
- `GET /api/v1/dashboard/stats` - Get statistics
- `GET /api/v1/dashboard/activity` - Get activity feed

### 8. File Upload (Template)
- `POST /api/v1/upload` - Upload file
- `POST /api/v1/upload/image` - Upload image
- `GET /api/v1/media` - List media files

---

## 🎯 How to Request Specific APIs

**Please describe your Figma screens, and I'll create the exact APIs you need:**

1. **List the screens** from your Figma design
2. **Describe the functionality** of each screen
3. **Specify data fields** needed for each feature

**Example:**
- "I have a Products screen with: name, price, description, images"
- "I need a Cart screen that shows items and total"
- "I have a Dashboard with stats and recent orders"

---

## 📝 Current Implementation Status

✅ **Completed:**
- Authentication (Register, Login, Password Reset, etc.)
- User Profile Management
- Health Checks

🔄 **Ready to Implement:**
- Products/Items
- Orders
- Cart
- Notifications
- Search
- Dashboard
- File Upload
- And more...

---

**Tell me which screens/features you need, and I'll create the complete API structure for them!**



