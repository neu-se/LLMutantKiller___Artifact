import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return undefined for an object key without exec method on a string', () => {
    const key = {};
    const data = 'test';
    expect(prop(key)(data)).toBeUndefined();
  });
});