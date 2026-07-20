import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with an empty string', () => {
    const delta1 = new Delta().insert('');
    const delta2 = new Delta().insert('Hello, world!');
    const composedDelta = delta1.compose(delta2);
    const expectedDelta = new Delta().insert('Hello, world!');
    expect(composedDelta.ops).toEqual(expectedDelta.ops);
  });
});