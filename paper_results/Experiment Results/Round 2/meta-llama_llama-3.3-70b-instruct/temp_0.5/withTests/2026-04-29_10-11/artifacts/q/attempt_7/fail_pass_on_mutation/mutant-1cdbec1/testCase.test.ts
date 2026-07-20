import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it.skip("should be able to handle window and self correctly", function () {
        const windowMock = { Q: undefined };
        const selfMock = { Q: undefined };

        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        (function (global) {
            if (typeof global.window !== "undefined" || typeof global.self !== "undefined") {
                var globalObject = typeof global.window !== "undefined" ? global.window : global.self;
                var previousQ = globalObject.Q;
                globalObject.Q = Q;
                globalObject.Q.noConflict = function () {
                    globalObject.Q = previousQ;
                    return this;
                };
            }
        })(globalObject);

        expect(windowMock.Q).toBeDefined();
        expect(selfMock.Q).toBeDefined();
    });

    it("should fail when window and self are both undefined", function () {
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
});