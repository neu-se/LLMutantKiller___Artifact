import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with length in first delta and insert in second delta', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "undefined"');
  });
});