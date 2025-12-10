# Docker Build Fix

## Issue: "tsc: not found"

### Problem
The TypeScript compiler (`tsc`) is not found during Docker build because it's in `devDependencies` and might not be accessible.

### Solution

The Dockerfile has been updated to:
1. Use `npx tsc --version` to verify TypeScript is installed
2. Ensure `npm ci` installs all dependencies (including devDependencies)

### Alternative: Use npx in package.json

If the issue persists, you can modify `package.json` to use `npx`:

```json
{
  "scripts": {
    "build": "npx tsc"
  }
}
```

### Build Command

```bash
# Rebuild without cache
docker compose build --no-cache api

# Or build all services
docker compose build --no-cache
```

### Verify Build

```bash
# Check if TypeScript is in node_modules
docker compose run --rm api sh -c "ls node_modules/.bin/tsc"

# Or check version
docker compose run --rm api sh -c "npx tsc --version"
```



