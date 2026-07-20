import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const func = () => {};
    expect(() => {
      const result = pull(func);
      for (let i = 0; i < 6; i++) {
        result(func);
      }
    }).toThrowError();
  });
});