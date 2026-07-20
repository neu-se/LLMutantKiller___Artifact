import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object sink', () => {
  it('should correctly handle object sinks in the pipeline', () => {
    const source = {
      source: function(read: any) {
        return function(end: any, data: any) {
          if (end) return;
          read(end, data);
        };
      }
    };

    const sink = {
      sink: function(read: any) {
        let data: any[] = [];
        const write = read(null, function end(err: any, chunk: any) {
          if (err) throw err;
          if (chunk === null) return;
          data.push(chunk);
        });
        return {
          source: function(read: any) {
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