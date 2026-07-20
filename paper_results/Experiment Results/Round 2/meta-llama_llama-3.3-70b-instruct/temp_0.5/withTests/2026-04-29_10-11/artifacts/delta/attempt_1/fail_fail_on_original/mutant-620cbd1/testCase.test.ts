import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with incorrect retain type', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain('');
    expect(() => a.compose(b)).toThrowError('embed types not matched:  != ');
  });
});