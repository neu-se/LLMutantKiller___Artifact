import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should compose deltas correctly', () => {
    const delta1 = new Delta().insert('Hello, ').retain(0, { bold: true });
    const delta2 = new Delta().retain(0, { bold: true }).insert('world!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 0, attributes: { bold: true } },
      { insert: 'world!' },
    ]);
  });
});