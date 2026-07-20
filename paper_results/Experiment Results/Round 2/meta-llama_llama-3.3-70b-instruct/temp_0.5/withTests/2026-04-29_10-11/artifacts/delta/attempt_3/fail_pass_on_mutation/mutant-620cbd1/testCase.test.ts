import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A', { retain: 1 });
    expect(a.compose(b)).toEqual(new Delta().insert('A'));
  });
});