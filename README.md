# Eze-Factory

**A revolutionary architecture for building React applications through composable state and modular logic.**

## Documentation

📖 **[Complete Documentation](./Eze-Factory-Docs.md)** — Everything about Eze-Factory's philosophy, patterns, and usage.

## Quick Start

```bash
npm install eze-factory
```

### Basic State (Hive)

```typescript
import { createHive } from "eze-factory";

const counter = createHive(0);
counter.setHoney(1);
counter.subscribe((value) => console.log(value));
```

### React Connection (Bee)

```tsx
import { Bee } from "eze-factory";

<Bee hive={counter} Component={({ honey, setHoney }) => <button onClick={() => setHoney(honey + 1)}>Count: {honey}</button>} />;
```

### Factory Composition

```typescript
import { createTableFactory } from 'eze-factory';

// Compose slices into a complete feature
const UsersFactory = createTableFactory({
  paginator: { paginator: UsersAPI },
  table: { columns: () => [...] }
}).build();

// Use directly — no useState needed!
UsersFactory.paginator.load();
UsersFactory.table.toggleColumnVisibility('email');
UsersFactory.exporter.download({ type: 'csv' });
```

## Philosophy

- **🐝 Hives** — State lives outside React, accessible anywhere
- **🔌 Slices** — Reusable logic modules that auto-wire together
- **🏭 Factories** — Compose slices into complete features
- **📦 Components** — StatusGuard, StatusIndicator filter by operation

## License

MIT
