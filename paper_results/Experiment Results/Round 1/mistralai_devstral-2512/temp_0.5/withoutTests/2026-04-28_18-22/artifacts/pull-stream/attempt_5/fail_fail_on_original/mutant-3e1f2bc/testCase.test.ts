import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object sink', () => {
  it('should correctly handle object sinks in the pipeline', () => {
    const source = {
      source: function(read: any) {
        read(null, 'test');
        read(true);
      }
    };

    const sink = {
      sink: function(read: any) {
        let receivedData: any[] = [];
        read(null, function(err: any, data: any) {
          if (err) throw err;
          if (data !== null) receivedData.push(data);
        });
        return {
          source: function(read: any) {
            for (const data of receivedData) {
              read(null, data);
            }
            read(true);
          }
        };
      }
    };

    const result = pull(source, sink);
    expect(result).toBeDefined();
    expect(typeof result.source).toBe('function');
  });
});