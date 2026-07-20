import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should throw an error when window and self are both undefined and the condition is &&", function () {
        const windowMock = undefined;
        const selfMock = undefined;

        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        expect(() => {
            (function (global) {
                if (typeof global.window !== "undefined" && typeof global.self !== "undefined") {
                    var globalObject = typeof global.window !== "undefined" ? global.window : global.self;
                    var previousQ = globalObject.Q;
                    globalObject.Q = Q;
                    globalObject.Q.noConflict = function () {
                        globalObject.Q = previousQ;
                        return this;
                    };
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(globalObject);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });

    it("should not throw an error when window is defined and self is undefined and the condition is ||", function () {
        const windowMock = {};
        const selfMock = undefined;

        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        expect(() => {
            (function (global) {
                if (typeof global.window !== "undefined" || typeof global.self !== "undefined") {
                    var globalObject = typeof global.window !== "undefined" ? global.window : global.self;
                    var previousQ = globalObject.Q;
                    globalObject.Q = Q;
                    globalObject.Q.noConflict = function () {
                        globalObject.Q = previousQ;
                        return this;
                    };
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(globalObject);
        }).not.toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});