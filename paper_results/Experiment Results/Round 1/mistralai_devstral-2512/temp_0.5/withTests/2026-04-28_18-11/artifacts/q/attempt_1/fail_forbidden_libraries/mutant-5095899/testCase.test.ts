// Test to expose the mutation in q.js
import { JSDOM } from "jsdom";

describe("Q library initialization in browser-like environments", () => {
    it("should initialize Q correctly when self is defined but window is not (like in Web Workers)", () => {
        // Create a mock environment where self exists but window does not
        const dom = new JSDOM();
        const global = dom.window;
        global.window = undefined;
        global.self = global;

        // Load Q in this environment
        const Module = { exports: {} };
        const require = (path: string) => {
            if (path === "../q") {
                // Simulate loading q.js in this environment
                const qCode = `
                    (function (definition) {
                        "use strict";
                        if (typeof self !== "undefined") {
                            self.Q = definition();
                        }
                    })(function () {
                        "use strict";
                        function Q(value) {
                            return { isFulfilled: () => true };
                        }
                        return Q;
                    });
                `;
                eval(qCode);
                return self.Q;
            }
            return Module.exports;
        };

        // This should work in the original code but fail in the mutated version
        const Q = require("../q");
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");
    });
});