import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('Delta', () => {
  it('compose with embed', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    expect(() => a.compose(b)).toThrowError('embed types not matched: embed != embed');
  });
});