import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle object streams without source function correctly', () => {
    const source = {
      source: function (abort, cb) {
        cb(null, 'data');
      }
    };

    const objStream = { someProperty: 'value' };

    const result = pull(source, objStream);
    expect(result).toBeDefined();
  });
});