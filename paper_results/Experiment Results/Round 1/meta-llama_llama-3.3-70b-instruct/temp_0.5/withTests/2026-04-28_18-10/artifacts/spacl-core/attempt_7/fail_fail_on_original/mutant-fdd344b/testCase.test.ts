import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('accepts valid paths with wildcards', () => {
    expect(() => new Matcher('/+[/]')).toThrowError();
    expect(() => new Matcher('/[*+/]')).not.toThrowError();
  });
});