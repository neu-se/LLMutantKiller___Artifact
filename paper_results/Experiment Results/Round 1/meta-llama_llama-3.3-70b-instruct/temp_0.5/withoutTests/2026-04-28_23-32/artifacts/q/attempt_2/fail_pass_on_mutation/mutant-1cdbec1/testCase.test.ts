describe("Q", () => {
    it.skip("should create a global Q object when executed as a script", () => {
        const script = `
            (function (definition) {
                "use strict";
                var global = typeof window !== "undefined" ? window : self;
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
        const vm = require('vm');
        vm.runInNewContext(script);
        const Q = require('vm').runInNewContext('Q');
        expect(Q).toBeDefined();
        expect(Q.version).toBe('1.0');
    });

    it("should throw an error when executed as a script with mutated code", () => {
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
        expect(() => require('vm').runInNewContext(script)).toThrowError();
    });
});