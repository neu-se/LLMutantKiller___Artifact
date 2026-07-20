import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only convert Buffer input to string", () => {
    const bufferInput = Buffer.from("test string");
    const stringInput = "test string";
    const bufferResult = stripBom(bufferInput);
    const stringResult = stripBom(stringInput);

    expect(bufferResult).toBe("test string");
    expect(stringResult).toBe("test string");
    expect(stringResult).not.toBeInstanceOf(Buffer);
  });
});