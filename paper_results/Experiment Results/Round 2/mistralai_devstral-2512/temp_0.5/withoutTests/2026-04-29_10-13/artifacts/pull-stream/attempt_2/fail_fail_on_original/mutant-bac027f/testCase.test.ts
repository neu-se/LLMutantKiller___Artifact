import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source stream', () => {
  it('should process streams with source function', () => {
    const source = {
      source: function() {
        return { read: () => null };
      }
    };

    const sink = function(read) {
      return {
        sink: function(source) {
          return { source: source };
        }
      };
    };

    const result = pull(source, sink);
    expect(result).toHaveProperty('source');
  });
});