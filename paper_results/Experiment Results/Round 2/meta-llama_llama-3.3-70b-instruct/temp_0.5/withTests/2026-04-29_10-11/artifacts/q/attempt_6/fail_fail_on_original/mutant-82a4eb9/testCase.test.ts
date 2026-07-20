import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should not export q when exports is an object but module is not an object", () => {
        const originalModule = global.module;
        global.module = undefined;
        const originalExports = global.exports;
        global.exports = {};
        const qModule = require("../../../../../../../../../subject_repositories/q/q.js");
        expect(qModule).toBeUndefined();
        global.module = originalModule;
        global.exports = originalExports;
    });
});