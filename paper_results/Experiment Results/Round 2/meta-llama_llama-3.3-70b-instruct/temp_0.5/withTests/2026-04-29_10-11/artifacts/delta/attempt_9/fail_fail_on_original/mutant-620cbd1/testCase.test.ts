import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert', () => {
    const a = new Delta().retain('');
    const b = new Delta().insert('B');
    expect(() => a.compose(b)).toThrowError('no handlers for embed type ""');
  });
});