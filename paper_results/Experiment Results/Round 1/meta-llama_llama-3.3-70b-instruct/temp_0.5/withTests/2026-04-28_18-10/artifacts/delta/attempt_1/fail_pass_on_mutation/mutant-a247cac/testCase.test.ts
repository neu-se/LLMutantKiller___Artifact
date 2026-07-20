import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Delta compose', () => {
  it('should compose correctly with optimization', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('AB');
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('should throw an error when accessing delta.ops[delta.ops.length + 1]', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const delta = a.compose(b);
    expect(() => {
      // Try to access delta.ops[delta.ops.length + 1]
      const _ = delta.ops[delta.ops.length + 1];
    }).toThrowError('Cannot read properties of undefined (reading \'1\'');
  });
});