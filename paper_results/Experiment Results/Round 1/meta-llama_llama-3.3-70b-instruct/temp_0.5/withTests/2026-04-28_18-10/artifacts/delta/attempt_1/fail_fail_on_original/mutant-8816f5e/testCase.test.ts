import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Delta', () => {
  it('transform with embed', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
  });
});