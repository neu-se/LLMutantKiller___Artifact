// Jest test file containing exactly one test case
import Delta from "../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with object retain at start', () => {
  it('should correctly compose when other starts with an object embed retain', () => {
    // Register a simple embed handler
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    // this delta: insert text then retain embed
    const base = new Delta().insert('hello').insert({ image: { src: 'a.png' } });
    // other delta: retain embed object (not a number retain)
    const other = new Delta().retain({ image: { alt: 'text' } });

    const result = base.compose(other);
    // The result should retain the insert 'hello' and compose the embed
    expect(result.ops).toEqual([
      { insert: 'hello' },
      { insert: { image: { src: 'a.png', alt: 'text' } } },
    ]);

    Delta.unregisterEmbed('image');
  });
});