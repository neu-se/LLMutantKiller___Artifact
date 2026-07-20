import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() embed handler receives correct otherData', () => {
  it('passes actual embed data not true as second argument to handler.compose', () => {
    const composeCalls: Array<[unknown, unknown, boolean]> = [];

    Delta.registerEmbed('myEmbed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        composeCalls.push([a, b, keepNull]);
        if (typeof b === 'object' && b !== null) {
          return { ...(a as object), ...(b as object) };
        }
        return { corrupted: true };
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      const a = new Delta().insert({ myEmbed: { x: 1 } });
      const b = new Delta().retain({ myEmbed: { y: 2 } });

      const result = a.compose(b);

      // Original: b = { y: 2 } => merged result = { x: 1, y: 2 }
      // Mutant:   b = true => corrupted = true
      expect(result.ops[0]).toEqual({
        insert: { myEmbed: { x: 1, y: 2 } },
      });
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});