import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object sink', () => {
  it('should correctly handle object sinks in the pipeline', () => {
    const source = {
      source: function(read) {
        read(null, 'data');
        read(true);
      }
    };

    const sink = {
      sink: function(read) {
        let data = [];
        read(null, function end(err, chunk) {
          if (err) throw err;
          if (chunk === null) return;
          data.push(chunk);
        });
        return {
          source: function(read) {
            for (const chunk of data) {
              read(null, chunk);
            }
            read(true);
          }
        };
      }
    };

    const result = pull(source, sink);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('source');
  });
});