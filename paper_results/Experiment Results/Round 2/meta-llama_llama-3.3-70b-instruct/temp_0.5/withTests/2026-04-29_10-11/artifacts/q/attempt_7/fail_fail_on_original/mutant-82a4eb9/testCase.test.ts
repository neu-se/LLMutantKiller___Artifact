describe("q", () => {
    it("should export q when exports is an object and module is an object", () => {
        const originalModule = global.module;
        global.module = {};
        const originalExports = global.exports;
        global.exports = {};
        const qModule = require("../../../../../../../../../subject_repositories/q/q.js");
        expect(qModule).not.toBeUndefined();
        global.module = originalModule;
        global.exports = originalExports;
    });
});