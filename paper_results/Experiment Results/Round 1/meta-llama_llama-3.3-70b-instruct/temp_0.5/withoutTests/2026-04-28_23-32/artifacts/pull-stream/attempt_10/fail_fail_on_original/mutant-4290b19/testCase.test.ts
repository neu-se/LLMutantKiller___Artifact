import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const func = () => {};
    const result = pull(func, func);
    result(func);
    expect(() => {
      for (let i = 0; i < 6; i++) {
        result(func);
      }
    }).toThrowError();
  });
});