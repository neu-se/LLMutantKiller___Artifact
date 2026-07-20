import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return undefined when the key is a RegExp and it does not match the data', () => {
    const key = /test/;
    const data = 'hello';
    const propFunction = prop(key);
    expect(propFunction(data)).toBeUndefined();
  });
});