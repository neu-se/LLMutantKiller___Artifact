import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should invert a delete operation correctly", () => {
    const base = new Delta().insert("hello");
    const change = new Delta().delete(5);
    // With mutation: after forEach (which pushes base ops), no return
    // Falls into else-if(true) -> getEmbedTypeAndData("hello", ...) throws
    const inverted = change.invert(base);
    expect(inverted.ops).toEqual([{ insert: "hello" }]);
  });
});