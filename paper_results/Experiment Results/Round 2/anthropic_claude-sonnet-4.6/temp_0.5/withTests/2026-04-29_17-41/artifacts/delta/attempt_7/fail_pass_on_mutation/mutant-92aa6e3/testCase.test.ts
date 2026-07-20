import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() embed handler keepNull parameter', () => {
  it('compose of insert embed with embed retain uses keepNull=false so null attributes are dropped', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        // Simulate what AttributeMap.compose does with keepNull
        const result: Record<string, unknown> = {
          ...(a as Record<string, unknown>),
          ...(b as Record<string, unknown>),
        };
        if (!keepNull) {
          for (const key of Object.keys(result)) {
            if (result[key] === null) {
              delete result[key];
            }
          }
        }
        return result;
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      // Insert an embed, then retain-compose with another embed that nulls a field
      const a = new Delta().insert({ myEmbed: { x: 1, y: 2 } });
      const b = new Delta().retain({ myEmbed: { y: null } });

      const result = a.compose(b);

      // Original: keepNull=false => null values removed => { x: 1 }
      // Mutant:   keepNull=true  => null values kept   => { x: 1, y: null }
      expect(result.ops[0]).toEqual({
        insert: { myEmbed: { x: 1 } },
      });
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});