import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const func = () => {};
    const result = pull(func);
    expect(() => result(func, func, func, func, func)).not.toThrowError();
  });
});