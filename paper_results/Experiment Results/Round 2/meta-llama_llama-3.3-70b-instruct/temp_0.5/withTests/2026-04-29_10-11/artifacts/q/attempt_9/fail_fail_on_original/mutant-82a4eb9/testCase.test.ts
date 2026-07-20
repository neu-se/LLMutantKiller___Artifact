describe("q", () => {
    it("should not throw an error when trying to use q as a CommonJS module and exports is an object but module is not an object", () => {
        const originalModule = global.module;
        global.module = undefined;
        const originalExports = global.exports;
        global.exports = {};
        expect(() => {
            require("../../../../../../../../../subject_repositories/q/q.js");
        }).not.toThrowError();
        global.module = originalModule;
        global.exports = originalExports;
    });
});