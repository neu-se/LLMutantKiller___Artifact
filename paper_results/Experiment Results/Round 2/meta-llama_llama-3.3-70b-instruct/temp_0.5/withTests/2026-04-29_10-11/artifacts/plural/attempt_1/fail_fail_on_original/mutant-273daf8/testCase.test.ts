import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should correctly handle f/fe ending words', () => {
    expect(plural('roof')).toBe('roofs');
  });
});