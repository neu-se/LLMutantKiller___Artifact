import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the matched string when key is a RegExp', () => {
    const data = 'Hello World';
    const key = /World/;
    const result = prop(key)(data);
    expect(result).toBe('World');
  });
});