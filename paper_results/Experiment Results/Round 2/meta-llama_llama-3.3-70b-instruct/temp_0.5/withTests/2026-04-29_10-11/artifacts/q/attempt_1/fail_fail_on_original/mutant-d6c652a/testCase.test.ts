import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
  it("should capture the line number correctly", () => {
    var error: any = new Error();
    var lines = error.stack.split("\n");
    var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
    var fileNameAndLineNumber = Q.getFileNameAndLineNumber(firstLine);
    expect(fileNameAndLineNumber).not.toBeUndefined();
  });
});