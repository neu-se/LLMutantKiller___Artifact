import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when the first argument is a non-function value in the original code', () => {
    const obj = {};
    expect(() => pull(obj)).toThrowError();
    const str = 'string';
    expect(() => pull(str)).toThrowError();
  });
});