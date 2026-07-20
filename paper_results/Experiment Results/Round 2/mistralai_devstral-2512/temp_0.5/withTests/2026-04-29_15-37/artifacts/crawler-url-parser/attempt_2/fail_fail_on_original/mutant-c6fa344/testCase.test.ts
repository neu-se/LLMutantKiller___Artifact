import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol-less URL mutation test", () => {
  it("should correctly handle protocol-less URLs starting with colon", () => {
    const result = parse(":example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://:example.com/path");
  });
});