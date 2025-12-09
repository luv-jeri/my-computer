# @repo/mock-data

Offline-first mock data package for the DAM/MAM application.

## Contents

- **assets.json** - Sample assets (images, videos, documents, designs)
- **folders.json** - Hierarchical folder structure
- **users.json** - User profiles with roles and permissions
- **search-index.json** - Searchable keywords and saved searches
- **notifications.json** - Mock notifications
- **settings.json** - Application and user settings

## Usage

```typescript
import assets from "@repo/mock-data/assets";
import folders from "@repo/mock-data/folders";
import users from "@repo/mock-data/users";

// Use with types from @repo/core/types
import type { Asset, Folder, User } from "@repo/core/types";

const assetList: Asset[] = assets as Asset[];
const folderTree: Folder[] = folders as Folder[];
const userList: User[] = users as User[];
```

## With Mock Service

For simulated async calls with latency:

```typescript
import MockDataService from "@repo/core/mock";

// Simulates 300ms delay
const assets = await MockDataService.getAssets();

// Search with 400ms delay
const results = await MockDataService.search("marketing", "global");
```

## Offline First

All data is statically imported - no network calls required. Perfect for:

- Local development
- Offline demos
- E2E testing
- UI development without backend
