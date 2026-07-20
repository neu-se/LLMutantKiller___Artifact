import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial sink should have correct length property matching number of arguments", () => {
    const through = (read: Function) => read;
    // Create partial pipeline - a.length === 1 so it takes the partial path
    const pipeline = pull(through, through, through);
    // The returned function should accept exactly 1 argument (read)
    expect(typeof pipeline).toBe("function");
    expect(pipeline.length).toBe(1);
  });
});