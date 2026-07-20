describe("Q function behavior", () => {
    it("should correctly handle global object creation", () => {
        const globalObject = typeof window!== "undefined"? window : global;
        const q = (function (definition) {
            "use strict";
            if (typeof window!== "undefined" || typeof self!== "undefined") {
                var global = typeof window!== "undefined"? window : self;
                global.Q = definition();
            }
        });
        q(function () { });
        expect(globalObject.Q).toBeDefined();
    });
});