import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function for string keys and null for regex keys in the original code but null for regex keys in the mutated code', () => {
    const stringKey = 'test';
    const regexKey = /test/;
    const data = { test: 'test' };

    const stringPropFunction = prop(stringKey);
    expect(stringPropFunction(data)).toBeUndefined();

    const regexPropFunction = prop(regexKey);
    expect(regexPropFunction(data)).toBeNull();
  });
});