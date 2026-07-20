import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should throw an error when key is an empty string and has an exec method', () => {
    const key = {
      exec: () => null,
      toString: () => ''
    };
    expect(() => prop(key)({})).toThrowError(TypeError);
  });
});