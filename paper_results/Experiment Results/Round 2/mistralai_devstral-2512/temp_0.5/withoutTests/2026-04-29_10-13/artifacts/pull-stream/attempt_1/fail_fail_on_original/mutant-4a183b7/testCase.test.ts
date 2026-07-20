import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should correctly handle read.source when it is a function', () => {
    const source = {
      source: () => 'expected value'
    };
    const result = pull(source);
    expect(result).toBe('expected value');
  });
});