import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = () => {};
    const sink = 'string';
    expect(() => pull.default(read, sink)).toThrow();
  });
});