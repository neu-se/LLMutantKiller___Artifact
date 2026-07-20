import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should correctly handle non-function, non-object arguments', () => {
    const source = {
      source: function (abort, cb) {
        cb(null, 'data');
      }
    };

    const result = pull(source, null as any);
    expect(result).toBeDefined();
  });
});