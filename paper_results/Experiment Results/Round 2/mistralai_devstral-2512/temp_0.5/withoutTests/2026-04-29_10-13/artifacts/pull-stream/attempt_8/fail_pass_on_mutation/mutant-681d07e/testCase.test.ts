import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the args null check when using a function with one parameter', () => {
    const partialSink = function(read: any) {
      return (end: any, data: any) => {};
    };

    const result = pull(partialSink);
    expect(typeof result).toBe('function');
  });
});