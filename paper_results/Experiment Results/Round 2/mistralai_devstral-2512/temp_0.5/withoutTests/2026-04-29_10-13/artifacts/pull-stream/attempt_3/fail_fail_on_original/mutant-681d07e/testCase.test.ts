import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should handle partial sink function correctly', () => {
    const results: any[] = [];
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 'data');
    };

    const partialSink = (read: any) => {
      return (end: any, data: any) => {
        if (end) return;
        results.push(data);
      };
    };

    const sink = pull(partialSink, source);
    sink(null, 'test');
    sink(true);

    expect(results).toEqual(['test']);
  });
});