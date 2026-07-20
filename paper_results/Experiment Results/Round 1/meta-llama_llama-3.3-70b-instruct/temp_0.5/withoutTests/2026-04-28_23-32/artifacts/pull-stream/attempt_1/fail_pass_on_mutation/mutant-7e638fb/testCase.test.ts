import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should throw an error when key is an object without exec function', () => {
    const key = {};
    expect(() => prop(key)({})).toThrowError();
  });
});