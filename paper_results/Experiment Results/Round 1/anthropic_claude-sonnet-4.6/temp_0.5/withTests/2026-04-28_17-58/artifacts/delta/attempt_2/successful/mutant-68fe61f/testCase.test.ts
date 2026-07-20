import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta CommonJS export", () => {
  it("module.exports should be set to Delta so that require returns the Delta constructor directly", () => {
    // In the original code: typeof module === 'object' is true in Node.js,
    // so module.exports = Delta and module.exports.default = Delta are executed.
    // In the mutated code: typeof module === "" is always false,
    // so module.exports is never reassigned, breaking the CommonJS export.
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

    // When module.exports = Delta is set, require() returns Delta directly,
    // and module.exports.default is also set to Delta.
    // So required === required.default should hold in the original.
    expect(required).toBe(required.default);
  });
});