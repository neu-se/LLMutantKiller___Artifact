import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle non-object arguments correctly', () => {
    const source = {
      source: function (abort: any, cb: any) {
        cb(null, 'data');
      }
    };

    const nonObjectArg = "string argument";

    const result = pull(source, nonObjectArg);
    expect(result).toBeDefined();
  });
});