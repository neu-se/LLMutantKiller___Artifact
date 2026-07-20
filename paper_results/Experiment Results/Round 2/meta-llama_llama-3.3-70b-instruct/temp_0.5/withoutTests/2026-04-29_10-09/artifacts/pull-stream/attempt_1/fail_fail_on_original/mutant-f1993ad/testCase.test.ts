import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that can handle regex keys', () => {
    const regexKey = /test/;
    const data = 'test string';
    const propFunction = prop(regexKey);
    const result = propFunction(data);
    expect(result).toBe(data);
  });
});