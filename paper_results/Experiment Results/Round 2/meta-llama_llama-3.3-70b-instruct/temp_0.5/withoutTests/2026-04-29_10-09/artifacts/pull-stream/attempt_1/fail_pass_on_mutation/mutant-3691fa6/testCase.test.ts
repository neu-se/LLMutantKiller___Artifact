import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should throw an error when key is not a string or a RegExp object', () => {
    const key = {};
    key.exec = function() {};
    expect(() => prop(key)('data')).toThrowError();
  });
});