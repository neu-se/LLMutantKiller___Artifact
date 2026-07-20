import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with mutated code', () => {
    const a = new Delta().retain('string');
    const b = new Delta().delete(1);
    expect(() => a.compose(b)).toThrowError('cannot retain a string');
  });
});