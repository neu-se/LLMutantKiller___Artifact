import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should correctly handle non-function arguments in the pipeline', () => {
    const source = {
      source: () => ({
        read: () => null
      }),
      sink: (read) => {
        // This should not be called for non-function arguments
        throw new Error('sink should not be called for non-function arguments');
      }
    };

    const result = pull(source, 'not a function');
    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });
});