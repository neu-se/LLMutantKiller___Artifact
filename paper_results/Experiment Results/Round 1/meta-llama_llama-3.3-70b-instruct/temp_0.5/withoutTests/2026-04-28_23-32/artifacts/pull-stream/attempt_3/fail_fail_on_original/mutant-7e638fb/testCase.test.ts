import * as propModule from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function that returns undefined when key is an object without exec function', () => {
    const key = {};
    const result = propModule.prop(key)({});
    expect(result).toBeUndefined();
  });
});