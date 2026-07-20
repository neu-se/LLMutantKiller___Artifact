describe("Q", () => {
    it("should pass on original code and fail on mutated code", () => {
        const originalCode = `
            (function (definition) {
                // ...
                if (typeof exports === "object" && typeof module === "object") {
                    module.exports = definition();
                }
                // ...
            })(function () {
                // ...
            });
        `;
        const mutatedCode = `
            (function (definition) {
                // ...
                if (true && typeof module === "object") {
                    module.exports = definition();
                }
                // ...
            })(function () {
                // ...
            });
        `;

        expect(originalCode).not.toContain("if (true && typeof module === \"object\")");
        expect(mutatedCode).toContain("if (true && typeof module === \"object\")");
    });
});