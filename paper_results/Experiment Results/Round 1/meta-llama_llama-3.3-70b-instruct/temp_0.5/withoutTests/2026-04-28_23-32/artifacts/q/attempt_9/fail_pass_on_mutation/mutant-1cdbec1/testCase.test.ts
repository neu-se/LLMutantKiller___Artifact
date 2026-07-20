describe("Q", () => {
    it("should throw an error when executed as a mutated script with both window and self defined and the condition is '&&'", () => {
        (globalThis as any).window = {};
        (globalThis as any).self = {};
        const script = `
            (function (definition) {
                "use strict";
                var global = typeof window !== "undefined" && typeof self !== "undefined" ? window : self;
                var previousQ = global.Q;
                global.Q = definition();
                global.Q.noConflict = function () {
                    global.Q = previousQ;
                    return this;
                };
            })(function () {
                return {
                    version: "1.0"
                };
            });
        `;
        expect(() => {
            const vm = require('vm');
            vm.runInNewContext(script);
        }).toThrowError();
    });
});