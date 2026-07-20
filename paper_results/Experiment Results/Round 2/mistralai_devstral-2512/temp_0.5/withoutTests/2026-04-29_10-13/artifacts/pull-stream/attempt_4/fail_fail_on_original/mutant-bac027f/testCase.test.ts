import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source stream', () => {
  it('should process source stream correctly', () => {
    const sourceStream = {
      source: function() {
        return { read: () => null };
      }
    };

    const result = pull(sourceStream);
    expect(typeof result.source).toBe('function');
  });
});