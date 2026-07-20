import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when trying to use q as a CommonJS module and exports is not an object", () => {
        const originalExports = global.exports;
        global.exports = null;
        expect(() => {
            require("../../../../../../../../../subject_repositories/q/q.js");
        }).toThrowError();
        global.exports = originalExports;
    });
});