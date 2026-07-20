import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta named exports", () => {
  it("Op named export should work correctly", () => {
    expect(Op.length({ insert: "hello" })).toEqual(5);
    expect(Op.length({ delete: 3 })).toEqual(3);
    expect(Op.length({ retain: 4 })).toEqual(4);
  });
});