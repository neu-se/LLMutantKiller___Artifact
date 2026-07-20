import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain({ embed: 'test' }, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { delete: 1 },
      { insert: 'Hello, World!', attributes: { bold: false } },
    ]);
  });
});