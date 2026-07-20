import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester function', () => {
  it('should return a function that returns the input when test is not an object with a test method', () => {
    const test = 'not an object';
    const result = tester(test);
    const input = { foo: 'bar' };
    const output = result(input);
    expect(output).toEqual(input);
    expect(Object.keys(output)).toEqual(Object.keys(input));
    expect(Object.values(output)).toEqual(Object.values(input));
  });
});