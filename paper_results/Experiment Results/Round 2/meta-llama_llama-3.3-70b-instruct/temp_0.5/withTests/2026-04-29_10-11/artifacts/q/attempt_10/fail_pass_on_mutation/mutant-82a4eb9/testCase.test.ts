describe("q", () => {
    it("should throw an error when trying to use q as a CommonJS module and exports is not an object and module is an object", () => {
        const originalModule = global.module;
        global.module = {};
        const originalExports = global.exports;
        global.exports = null;
        expect(() => {
            require("../../../../../../../../../subject_repositories/q/q.js");
        }).toThrowError();
        global.module = originalModule;
        global.exports = originalExports;
    });
});