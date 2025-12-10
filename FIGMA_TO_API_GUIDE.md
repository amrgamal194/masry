# Figma to API Conversion Guide

## 📱 Common App Screens → API Endpoints Mapping

This guide helps you convert Figma designs to REST API endpoints. Below are common screen patterns and their corresponding API structures.

---

## 🎨 Screen Patterns & API Mapping

### 1. Authentication Screens
✅ **Already Implemented**
- Login Screen → `POST /api/v1/auth/login`
- Register Screen → `POST /api/v1/auth/register`
- Forgot Password → `POST /api/v1/auth/forgot-password`
- Reset Password → `POST /api/v1/auth/reset-password`

### 2. User Profile Screens
**Screens**: Profile View, Edit Profile, Settings
**APIs Needed**:
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `PATCH /api/v1/users/avatar` - Upload avatar
- `GET /api/v1/users/settings` - Get settings
- `PUT /api/v1/users/settings` - Update settings

### 3. Dashboard/Home Screen
**Screens**: Dashboard, Home Feed, Statistics
**APIs Needed**:
- `GET /api/v1/dashboard` - Get dashboard data
- `GET /api/v1/dashboard/stats` - Get statistics
- `GET /api/v1/dashboard/activity` - Get recent activity

### 4. List/Feed Screens
**Screens**: Product List, Post Feed, Item Grid
**APIs Needed**:
- `GET /api/v1/products` - List items (with pagination, filters, search)
- `GET /api/v1/products/:id` - Get single item
- `POST /api/v1/products` - Create item
- `PUT /api/v1/products/:id` - Update item
- `DELETE /api/v1/products/:id` - Delete item

### 5. Detail Screens
**Screens**: Product Detail, Post Detail, Item View
**APIs Needed**:
- `GET /api/v1/products/:id` - Get details
- `GET /api/v1/products/:id/reviews` - Get reviews
- `POST /api/v1/products/:id/reviews` - Add review

### 6. Search Screens
**Screens**: Search Bar, Search Results
**APIs Needed**:
- `GET /api/v1/search?q=query` - Search across resources
- `GET /api/v1/search/products?q=query` - Search products
- `GET /api/v1/search/users?q=query` - Search users

### 7. Cart/Checkout Screens
**Screens**: Shopping Cart, Checkout, Payment
**APIs Needed**:
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/:id` - Update cart item
- `DELETE /api/v1/cart/items/:id` - Remove from cart
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/:id` - Get order details

### 8. Notifications Screen
**Screens**: Notifications List, Notification Settings
**APIs Needed**:
- `GET /api/v1/notifications` - Get notifications
- `PUT /api/v1/notifications/:id/read` - Mark as read
- `PUT /api/v1/notifications/read-all` - Mark all as read
- `GET /api/v1/notifications/settings` - Get settings
- `PUT /api/v1/notifications/settings` - Update settings

### 9. Settings Screen
**Screens**: App Settings, Account Settings, Privacy
**APIs Needed**:
- `GET /api/v1/settings` - Get all settings
- `PUT /api/v1/settings` - Update settings
- `GET /api/v1/settings/privacy` - Get privacy settings
- `PUT /api/v1/settings/privacy` - Update privacy

### 10. Upload/Media Screens
**Screens**: Image Upload, File Picker, Media Gallery
**APIs Needed**:
- `POST /api/v1/upload` - Upload file
- `POST /api/v1/upload/image` - Upload image
- `GET /api/v1/media` - List media
- `DELETE /api/v1/media/:id` - Delete media

---

## 📋 How to Use This Guide

1. **Identify Your Screens**: List all screens from your Figma design
2. **Map to Patterns**: Match each screen to the patterns above
3. **Customize APIs**: Adjust endpoints based on your specific needs
4. **Implement**: Use the provided templates to build your APIs

---

## 🚀 Next Steps

1. Share your Figma screens/features list
2. I'll create the specific APIs for your app
3. Or use the templates below to build common features



