import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";
import { Buffer } from "buffer";

describe("stripBom", () => {
  it("should throw when given a number", () => {
    expect(() => {
      stripBom(123);
    }).toThrow(TypeError);
  });
});