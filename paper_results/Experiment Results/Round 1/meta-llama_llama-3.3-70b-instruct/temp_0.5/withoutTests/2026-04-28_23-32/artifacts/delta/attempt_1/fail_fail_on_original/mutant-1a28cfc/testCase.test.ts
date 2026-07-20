import { Delta } from "./Delta";

describe("Delta", () => {
  it("should throw an error when getEmbedTypeAndData is called with invalid b", () => {
    const a = { test: "test" };
    const b = "string";
    expect(() => {
      const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(a, b);
    }).toThrowError(`cannot retain a ${typeof b}`);
  });
});