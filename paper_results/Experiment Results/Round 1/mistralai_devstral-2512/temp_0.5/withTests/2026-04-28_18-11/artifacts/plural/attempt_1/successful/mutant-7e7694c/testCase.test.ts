// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/plural/attempt_1/pending_category/mutant-7e7694c/testCase.test.ts
import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function with f/fe ending words', () => {
  it('should correctly handle "dwarf" and "roof" as exceptions', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});