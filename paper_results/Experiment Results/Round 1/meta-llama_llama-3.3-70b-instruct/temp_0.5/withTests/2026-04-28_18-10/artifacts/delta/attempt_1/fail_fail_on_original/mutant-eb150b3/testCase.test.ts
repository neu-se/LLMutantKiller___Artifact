import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import { Op } from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('compose', () => {
  it('should handle embed composition correctly', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});