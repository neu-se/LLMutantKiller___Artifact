import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain in invert method', () => {
    const base = new Delta([
      { insert: 'Hello, ' },
      { retain: { image: 'image1' } },
      { insert: 'world!' },
    ]);

    const delta = new Delta([
      { delete: 7 },
      { retain: null },
      { insert: '!' },
    ]);

    const inverted = delta.invert(base);

    expect(inverted.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: { image: 'image1' } },
      { delete: 1 },
    ]);
  });
});