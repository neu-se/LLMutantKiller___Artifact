import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('Hello, ').retain(1, { bold: true });
    const delta2 = new Delta().retain(7).insert('world!').retain(1, { italic: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 1, attributes: { bold: true } },
      { retain: 6 },
      { insert: 'world!' },
      { retain: 1, attributes: { italic: true } },
    ]);
  });
});