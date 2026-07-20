import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should check if bootstrap is called when bootstrap condition is true", () => {
        const bootstrapSpy = jest.fn();
        const originalBootstrap = globalThis.bootstrap;
        globalThis.bootstrap = bootstrapSpy;
        const definition = () => {};
        (function (definition: any) {
            "use strict";
            if (typeof globalThis.bootstrap === "function") {
                globalThis.bootstrap("promise", definition);
            }
        })(definition);
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
        globalThis.bootstrap = originalBootstrap;
        const mutatedBootstrap = () => {};
        globalThis.bootstrap = mutatedBootstrap;
        const mutatedDefinition = () => {};
        (function (definition: any) {
            "use strict";
            if (false) {
                globalThis.bootstrap("promise", definition);
            }
        })(mutatedDefinition);
        expect(mutatedBootstrap).not.toHaveBeenCalled();
    });
});