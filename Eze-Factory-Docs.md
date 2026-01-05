# Eze-Factory

**A revolutionary architecture for building React applications through composable state and modular logic.**

---

## Table of Contents

- [What is Eze-Factory?](#what-is-eze-factory)
- [The Philosophy](#the-philosophy)
- [Why Was It Built?](#why-was-it-built)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [1. Hives — Reactive State](#1-hives--reactive-state)
  - [2. Bees — React Connectors](#2-bees--react-connectors)
  - [3. Factories — Logic Composition](#3-factories--logic-composition)
  - [4. Slices — Reusable Logic Modules](#4-slices--reusable-logic-modules)
- [The Power of Composition](#the-power-of-composition)
- [Building Your Own Slices](#building-your-own-slices)
- [Complete Example](#complete-example)
- [Limitations](#limitations)
- [Best Practices](#best-practices)

---

## What is Eze-Factory?

Eze-Factory is an **architectural framework** that changes how you build React applications. Instead of scattering state and logic across components, you build composed **Factories** from reusable **Slices**.

**The Core Idea:**

```
Your App = Factory( Slice + Slice + Slice + ... )
```

Each Slice is a self-contained unit of logic (pagination, status management, table operations, etc.) that automatically wires itself to other Slices through a shared context.

---

## The Philosophy

### "Build Once, Use Everywhere"

Traditional React development forces you to repeatedly implement the same patterns:

- Loading states
- Error handling
- Pagination
- Form validation
- Data tables

**Eze-Factory's approach:** Build these patterns as Slices once, then compose them into any Factory you need. Every page, every feature, every project can reuse the same battle-tested logic.

### "State Lives Outside React"

React's component tree is for **rendering**. Business logic and state should exist independently in **Hives** — observable containers that:

- Persist across component unmounts
- Can be accessed from anywhere
- Auto-clean subscriptions via WeakRef
- Support atomic updates (only affected components re-render)

### "Auto-Wiring Through Context"

When you compose Slices in a Factory, they automatically discover and connect to each other:

```typescript
// LoaderSlice automatically uses StatusSlice if available
const load = async () => {
  if (ctx.status) ctx.status.operation("loader").loading({});
  const data = await api.fetch();
  if (ctx.status) ctx.status.operation("loader").idle();
  return data;
};
```

**No glue code required.** Slices talk to each other through the shared `ctx`.

---

## Why Was It Built?

### Problems Solved

| Problem                   | Traditional React                              | Eze-Factory                                             |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| **Boilerplate**           | Write loading/error states for every feature   | StatusSlice handles all status management automatically |
| **Tight Coupling**        | Logic lives in components, hard to test        | Logic lives in Factories, independent of UI             |
| **Re-render Performance** | Context changes re-render entire trees         | Hives trigger atomic updates                            |
| **Memory Leaks**          | Forgotten unsubscribes                         | WeakRef-based automatic cleanup                         |
| **Inconsistency**         | Each developer implements patterns differently | Shared Slices enforce patterns across team              |

---

## Installation

```bash
npm install eze-factory
```

---

## Core Concepts

### 1. Hives — Reactive State

A **Hive** is a reactive container that exists outside React.

```typescript
import { createHive } from "eze-factory";

// Basic hive
const counter = createHive(0);

counter.honey; // Read: 0
counter.setHoney(5); // Write + notify subscribers
counter.silentSetHoney(10); // Write only (no notifications)
counter.subscribe((v) => log(v)); // Subscribe to changes
counter.reset(); // Reset to initial value

// Persistent hive (auto-saves to localStorage)
const theme = createHive("light", "user-theme");
```

#### Hive Types

| Type                    | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `createHive<T>`         | Single value                                  |
| `createHiveArray<T>`    | Lists with `push`, `pop`, `removeById`, etc.  |
| `createFormHive<T>`     | Forms with validation, errors, dirty tracking |
| `createProxyHive<T>`    | Objects with per-property subscriptions       |
| `createAsyncHive<T>`    | Handles Promises automatically                |
| `createHiveObserver<T>` | Computed/derived values                       |

---

### 2. Bees — React Connectors

**Bees** connect Hives to React components with isolated re-renders.

```tsx
import { Bee } from "eze-factory";

// Only this button re-renders when counter changes
<Bee hive={counter} Component={({ honey, setHoney }) => <button onClick={() => setHoney(honey + 1)}>{honey}</button>} />;
```

#### Bee Types

| Component         | Use Case                          |
| ----------------- | --------------------------------- |
| `<Bee />`         | Single Hive connection            |
| `<ArrayBee />`    | List rendering with index         |
| `<FormBee />`     | Form field with error/validate    |
| `<ProxyBee />`    | Single property from ProxyHive    |
| `<ObserverBee />` | Read-only computed/derived values |

---

### 3. Factories — Logic Composition

A **Factory** composes Slices into a complete feature.

```typescript
import { createFactory } from 'eze-factory';

// Compose your feature
const UsersFactory = createFactory()
  .use(StatusSlice({ statusKit: MyStatusKit }))
  .use(QuerySlice({ filters: { search: { type: 'text' } } }))
  .use(PaginatorSlice({ paginator: UsersAPI }))
  .use(TableSlice({ columns: () => [...] }))
  .use(ExporterSlice())
  .build();

// Use directly — no useState needed!
UsersFactory.paginator.load();
UsersFactory.table.toggleColumnVisibility('email');
UsersFactory.exporter.download({ type: 'csv' });
```

#### Pre-Built Factory Helpers

```typescript
// createListFactory = Status + Query + Paginator
const users = createListFactory({
  paginator: { ... },
  query: { filters: { ... } }
}).build();

// createTableFactory = Status + Query + Paginator + Table + Exporter
const usersTable = createTableFactory({
  paginator: { ... },
  table: { columns: () => [...] }
}).build();
```

---

### 4. Slices — Reusable Logic Modules

Slices are functions that:

1. Receive the current context (`ctx`)
2. Create state and logic
3. Return an API that gets merged into `ctx`

```typescript
// A Slice is just a function
const MySlice = (ctx) => {
  const dataHive = createHive(null);

  const doSomething = () => {
    // Access other slices via ctx
    if (ctx.status) ctx.status.operation("mySlice").loading({});
    // ...
  };

  return {
    myFeature: { dataHive, doSomething },
  };
};
```

#### Built-in Slices

| Slice              | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| **StatusSlice**    | Operations-based status management with priority resolution |
| **PaginatorSlice** | Infinite scroll, pagination, data loading                   |
| **LoaderSlice**    | Single-item data fetching                                   |
| **QuerySlice**     | URL-synced filters and search parameters                    |
| **TableSlice**     | Column visibility, sorting, selection                       |
| **ExporterSlice**  | CSV/Excel export with column awareness                      |

---

## The Power of Composition

### StatusSlice: Operations-Based Status Management

The StatusSlice demonstrates Eze-Factory's power. Instead of simple `isLoading` booleans, it supports:

**First, define your StatusKit** — a map of status types with priorities and components:

```typescript
const MyStatusKit = {
  error: { priority: 0, component: ErrorAlert }, // Highest priority
  loading: { priority: 1, component: Spinner },
  saving: { priority: 2, component: SaveOverlay },
  success: { priority: 998, component: Toast },
  idle: { priority: 999, component: () => null }, // Never shows
};
```

**Then use it in your Factory:**

```typescript
createFactory().use(StatusSlice({ statusKit: MyStatusKit }));
// ...
```

**Key features:**

- **Multiple concurrent operations**: Table loading, header refreshing, file uploading — all tracked separately
- **Priority-based resolution**: Error (0) beats Loading (1) beats Success (998)
- **Scoped components**: Show status only for specific operations

```typescript
// Set status for specific operations
ctx.status.operation("table").loading({ variant: "skeleton" });
ctx.status.operation("upload").loading({ progress: 50 });

// Clear when done
ctx.status.operation("table").idle();
```

```tsx
// Component only reacts to 'table' operations
<StatusIndicator status={status} operations={['table']} />

// Show loading fallback, then content
<StatusGuard status={status} operations={['table']} fallback={<Skeleton />}>
  <TableContent />
</StatusGuard>
```

### Auto-Wiring Example

```typescript
// PaginatorSlice automatically uses StatusSlice
const load = async (q) => {
  ctx.status.operation("table").loading({}); // Auto-set
  try {
    const data = await api.fetch(q);
    ctx.status.operation("table").idle(); // Auto-clear
    return data;
  } catch (err) {
    ctx.status.operation("table").error({ message: err.message });
  }
};

// PaginatorSlice automatically listens to QuerySlice
if (ctx.query) {
  ctx.query.listenToQuery((q) => load(q)); // Auto-reload on filter change
}
```

---

## Building Your Own Slices

Create Slices for your project's specific needs:

```typescript
// Custom analytics slice
export const AnalyticsSlice = (config: { trackingId: string }) => {
  return (ctx) => {
    const track = (event: string, data: any) => {
      analytics.send(config.trackingId, event, data);
    };

    // Auto-track page loads if Paginator exists
    if (ctx.paginator) {
      ctx.paginator.paginatorHive.subscribe(() => {
        track('data_loaded', { count: ctx.paginator.paginatorHive.honey.length });
      });
    }

    return {
      analytics: { track }
    };
  };
};

// Use it
const MyFactory = createFactory()
  .use(StatusSlice({ ... }))
  .use(PaginatorSlice({ ... }))
  .use(AnalyticsSlice({ trackingId: 'UA-XXX' }))  // Auto-tracks loads!
  .build();
```

---

## Complete Example

```typescript
// 1. Define the Factory
const UsersFactory = () =>
  createTableFactory({
    query: {
      filters: {
        search: { type: "text", placeholder: "Search users..." },
        role: { type: "select", options: ["admin", "user", "guest"] },
      },
    },
    paginator: {
      paginator: UsersAPI.paginator,
      format: (response) => response.data,
    },
    table: {
      idKey: "id",
      storeKey: "users-table",
      columns: () => [
        { id: "name", label: "Name" },
        { id: "email", label: "Email" },
        { id: "role", label: "Role" },
      ],
    },
  }).build();

// 2. Use in a Page
function UsersPage() {
  // Stabilize factory instance across re-renders
  const [factory] = useState(() => UsersFactory());

  return (
    <div>
      {/* Status-aware content */}
      <StatusGuard status={factory.status} operations={["table"]} fallback={<Skeleton />}>
        {/* Query filters */}
        <Bee
          hive={factory.query.queryHive}
          Component={({ honey }) => <SearchBar value={honey.search} onChange={(v) => factory.query.updateQuery({ id: "search", value: v })} />}
        />

        {/* Data table */}
        <ArrayBee hive={factory.paginator.paginatorHive} Component={({ honey: user }) => <UserRow user={user} />} />

        {/* Actions */}
        <button onClick={() => factory.paginator.loadMore()}>Load More</button>
        <button onClick={() => factory.exporter.download({ type: "csv" })}>Export</button>
      </StatusGuard>
    </div>
  );
}
```

---

## Limitations

1. **React-Only Connectors**: Hives work anywhere; Bees require React
2. **No Time-Travel Debugging**: Unlike Redux, no built-in state history
3. **Learning Curve**: Factory/Slice pattern requires understanding dependency injection
4. **TypeScript Recommended**: Full benefits require TypeScript for type inference
5. **SSR Requires Per-Request Instances**: Create new Factories per request to avoid state sharing

---

## Best Practices

1. **Stabilize Factory instances in React** — Use `useState` or `useMemo` to prevent recreation on every render:

   ```typescript
   // ✅ Correct - factory persists across re-renders
   const [factory] = useState(() => UsersFactory());
   // OR
   const factory = useMemo(() => UsersFactory(), []);

   // ❌ Wrong - creates new factory every render, losing all state!
   const factory = UsersFactory();
   ```

2. **Order Slices by dependency** — Later Slices can access earlier ones:

   ```typescript
   createFactory()
     .use(StatusSlice()) // First
     .use(PaginatorSlice()) // Can use ctx.status
     .use(TableSlice()); // Can use ctx.paginator
   ```

3. **Use operation names for scoped status** — Components only react to relevant operations:

   ```tsx
   <StatusIndicator status={status} operations={['header']} />
   <StatusIndicator status={status} operations={['table']} />
   ```

4. **Build custom Slices for your domain** — Encapsulate business logic:

   ```typescript
   .use(AuthSlice())         // Your login/logout logic
   .use(PermissionsSlice())  // Your role-based access
   .use(NotificationsSlice()) // Your toast system
   ```

5. **Use storeKey for persistence** — Column visibility, filters, preferences:
   ```typescript
   TableSlice({ storeKey: "users-table" }); // Persists column visibility
   ```

---

## License

MIT
