import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return a function when key is an object with an exec function', () => {
    const key = { exec: () => ['value'] };
    expect(typeof prop(key)).toBe('function');
    expect(prop(key)({})).toBe('value');
  });
});