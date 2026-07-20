import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(1);
    delta1.insert('world!');

    const delta2 = new Delta();
    delta2.retain(7);
    delta2.insert(' again');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 1 },
      { insert: 'world!' },
      { retain: 7 },
      { insert: ' again' },
    ]);
  });
});