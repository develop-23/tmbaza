# API Endpoints Comparison: Frontend vs Backend

## ✅ Authentication Routes (`/api/auth/`)

### Frontend calls:
- `POST /auth/login` ✅
- `POST /auth/admin/login` ✅  
- `POST /auth/register` ✅

### Backend provides:
- `POST /auth/register` ✅
- `POST /auth/login` ✅
- `POST /auth/admin/login` ✅

**Status: ✅ MATCH**

---

## ⚠️ User Routes (`/api/users/`)

### Frontend calls:
- `GET /users/me` ✅
- `GET /users` ❌ (admin should use `/admin/users`)
- `PATCH /users/:id/verify` ❌ (admin should use `/admin/users/:id/verify`)
- `PATCH /users/:id/block` ❌ (admin should use `/admin/users/:id/block`)
- `GET /users/:id/ads` ❌ (admin should use `/admin/users/:id/ads`)
- `GET /users/operators` ❌ (should be `/admin/operators`)
- `POST /users/change-password` ✅
- `POST /users/operators` ❌ (should be `/admin/operators`)
- `DELETE /users/operators/:id` ❌ (should be `/admin/operators/:id`)
- `GET /users/me/ads` ❌ (should be `/ads` with user filter)

### Backend provides:
- `GET /users/me` ✅
- `GET /users` ✅ (admin only)
- `PATCH /users/:id/verify` ✅ (admin only)
- `PATCH /users/:id/block` ✅ (admin only)
- `GET /users/:id/ads` ✅ (admin/operator only)
- `GET /users/operators` ✅ (admin only)
- `POST /users/change-password` ✅ (admin/operator only)
- `POST /users/operators` ✅ (admin only)
- `PATCH /users/operators/:id` ✅ (admin only)
- `DELETE /users/operators/:id` ✅ (admin only)

**Status: ⚠️ PARTIAL MISMATCH - Frontend uses wrong paths for admin operations**

---

## ✅ Ad Routes (`/api/ads/`)

### Frontend calls:
- `GET /ads` ✅
- `GET /ads/:id` ✅
- `POST /ads` ✅
- `PUT /ads/:id` ❌ (backend uses `PATCH`)
- `DELETE /ads/:id` ✅
- `POST /ads/:id/moderate` ✅
- `GET /ads/:id/request-vip` ✅

### Backend provides:
- `GET /ads` ✅
- `GET /ads/:id` ✅
- `POST /ads` ✅
- `PATCH /ads/:id` ✅ (frontend uses PUT)
- `DELETE /ads/:id` ✅
- `POST /ads/:id/moderate` ✅
- `GET /ads/:id/request-vip` ✅

**Status: ⚠️ MINOR MISMATCH - Frontend uses PUT, backend expects PATCH**

---

## ✅ Categories Routes (`/api/categories/`)

### Frontend calls:
- `GET /categories` ✅
- `GET /categories/with-counts` ✅
- `POST /categories` ❌ (admin should use `/admin/categories`)
- `PATCH /categories/:id` ❌ (admin should use `/admin/categories/:id`)
- `DELETE /categories/:id` ❌ (admin should use `/admin/categories/:id`)

### Backend provides:
- `GET /categories` ✅
- `GET /categories/with-counts` ✅
- `POST /categories` ✅ (admin only)
- `PUT /categories/:id` ✅ (admin only)
- `DELETE /categories/:id` ✅ (admin only)

**Status: ⚠️ MISMATCH - Admin operations should use `/admin/categories`**

---

## ✅ Admin Routes (`/api/admin/`)

### Frontend calls:
- `GET /admin/stats` ✅
- `GET /admin/ads/recent` ✅
- `GET /admin/users/recent` ✅
- `GET /admin/users` ✅
- `GET /admin/ads` ✅
- `GET /admin/categories` ✅
- `GET /admin/locations` ✅
- `GET /admin/banners` ✅
- `GET /admin/blocks` ✅
- `GET /admin/settings` ✅
- `GET /admin/operators` ✅
- `POST /admin/categories` ✅
- `PUT /admin/categories/:id` ✅
- `POST /admin/banners` ✅
- `PUT /admin/banners/:id` ✅
- `POST /admin/blocks` ✅
- `PUT /admin/blocks/:id` ✅
- `POST /admin/locations` ✅
- `PUT /admin/locations/:id` ✅
- `POST /admin/users` ✅
- `PUT /admin/users/:id` ✅
- `POST /admin/operators` ✅
- `PUT /admin/operators/:id` ✅
- `PUT /admin/settings` ✅

### Backend provides:
- `GET /admin/stats` ✅
- `GET /admin/ads/recent` ✅
- `GET /admin/users/recent` ✅
- `GET /admin/users` ✅
- `GET /admin/ads` ✅
- `GET /admin/categories` ✅
- `GET /admin/locations` ✅
- `GET /admin/banners` ✅
- `GET /admin/blocks` ✅
- `GET /admin/settings` ✅
- `GET /admin/operators` ✅

**Status: ⚠️ MISSING - Backend lacks POST/PUT endpoints for admin operations**

---

## ✅ Other Routes

### Locations (`/api/locations/`):
- Frontend: `GET /locations` ✅
- Backend: `GET /locations` ✅

### Banners (`/api/banners/`):
- Frontend: `GET /banners` ✅, `POST /banners/:id/click` ✅
- Backend: `GET /banners` ✅, `POST /banners/:id/click` ✅

### Blocks (`/api/blocks/`):
- Frontend: `GET /blocks` ✅
- Backend: `GET /blocks` ✅

### Settings (`/api/settings/`):
- Frontend: `GET /settings` ✅
- Backend: `GET /settings` ✅

---

## 🔴 Critical Issues to Fix:

1. **Missing Admin CRUD Operations**: Backend admin routes only have GET endpoints, missing POST/PUT/DELETE
2. **Inconsistent User Management**: Frontend calls admin operations on `/users/` instead of `/admin/users/`
3. **HTTP Method Mismatch**: Frontend uses PUT, backend expects PATCH for ad updates
4. **Missing User Ads Endpoint**: Frontend calls `/users/me/ads` which doesn't exist

## 🟡 Recommendations:

1. **Add missing admin CRUD endpoints** in `adminRoutes.js`
2. **Update frontend** to use consistent admin paths
3. **Standardize HTTP methods** (PUT vs PATCH)
4. **Add user ads endpoint** for current user's ads
