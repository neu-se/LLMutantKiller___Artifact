describe("Q", () => {
    it.skip("should create a global Q object when executed as a script", () => {
        const originalQ = (globalThis as any).Q;
        delete (globalThis as any).Q;
        require("../../../../../../../../../../../subject_repositories/q/q");
        expect((globalThis as any).Q).toBeDefined();
        (globalThis as any).Q = originalQ;
    });

    it("should throw an error when executed as a mutated script", () => {
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