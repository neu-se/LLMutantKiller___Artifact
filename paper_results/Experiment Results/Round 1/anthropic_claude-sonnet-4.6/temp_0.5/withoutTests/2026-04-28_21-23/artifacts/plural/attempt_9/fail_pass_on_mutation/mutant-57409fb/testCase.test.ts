import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return word unchanged when num is 1, regardless of word matching rules", () => {
    // The word 'geese' has a specific rule mapping it
    // With num=1, should return 'geese' unchanged
    // Testing many words with num=1 to ensure singular behavior
    const words = ["cat", "dog", "church", "goose", "person", "mouse"];
    for (const word of words) {
      expect(plural(word, 1)).toBe(word);
    }
  });
});