import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when getEmbedTypeAndData is called with invalid a and b", () => {
    const a = "string";
    const b = "string";
    expect(() => {
      const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(a, b);
    }).toThrowError(`cannot retain a ${typeof a}`);
  });
});