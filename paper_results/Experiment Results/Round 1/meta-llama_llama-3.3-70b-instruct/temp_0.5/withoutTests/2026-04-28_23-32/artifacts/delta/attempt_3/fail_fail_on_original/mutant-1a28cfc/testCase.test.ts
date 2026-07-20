import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when getEmbedTypeAndData is called with invalid b", () => {
    const a = { test: "test" };
    const b = null;
    expect(() => {
      const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(a, b);
    }).toThrowError(`cannot retain a ${typeof b}`);
  });
});