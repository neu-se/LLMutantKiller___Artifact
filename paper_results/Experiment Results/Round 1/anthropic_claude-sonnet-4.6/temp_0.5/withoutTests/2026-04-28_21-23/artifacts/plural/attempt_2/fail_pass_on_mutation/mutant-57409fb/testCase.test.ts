import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return singular word unchanged when num is 1", () => {
    // num=1: both versions return word unchanged (false condition)
    // num=0: both versions pluralize
    // The mutation changes || num===undefined to || false
    // When num is explicitly undefined: undefined !== 1 is true, so both pluralize
    // The ONLY difference: if there's a path where num===1 AND undefined... impossible
    // Let's verify num=1 returns singular
    expect(plural("cat", 1)).toBe("cat");
  });
});