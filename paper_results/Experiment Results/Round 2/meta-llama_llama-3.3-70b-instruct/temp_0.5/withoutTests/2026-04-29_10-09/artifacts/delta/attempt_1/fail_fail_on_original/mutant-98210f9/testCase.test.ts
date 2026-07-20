import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas with retain and insert operations', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(1, { bold: true });

    const delta2 = new Delta();
    delta2.insert('world!');

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 1, attributes: { bold: true } },
      { insert: 'world!' },
    ]);
  });
});