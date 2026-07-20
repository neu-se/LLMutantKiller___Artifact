import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    expect(() => new Matcher('/+[/]')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('[/*]')).toThrowError('Path contains malformed wildcards');
  });
});