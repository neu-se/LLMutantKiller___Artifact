import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source stream', () => {
  it('should handle source stream with source function', () => {
    const sourceStream = {
      source: function() {
        return { read: () => null };
      }
    };

    const result = pull(sourceStream);
    expect(result).toBe(sourceStream.source());
  });
});