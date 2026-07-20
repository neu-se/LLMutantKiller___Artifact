import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regexp', () => {
  it('should return null when regexp does not match', () => {
    const regex = /hello (\w+)/;
    const data = "goodbye world";
    const getMatch = prop(regex);
    const result = getMatch(data);
    expect(result).toBeNull();
  });
});