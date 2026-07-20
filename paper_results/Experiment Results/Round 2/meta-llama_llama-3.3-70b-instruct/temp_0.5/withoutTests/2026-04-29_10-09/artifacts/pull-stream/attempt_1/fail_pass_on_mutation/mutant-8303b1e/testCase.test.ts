import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should throw an error when key is an empty string and has an exec function', () => {
    const key = { exec: () => {} };
    Object.defineProperty(key, 'toString', { value: () => '' });
    expect(() => prop(key)({})).toThrowError();
  });
});