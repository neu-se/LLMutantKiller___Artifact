import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("QReturnValue behavior", () => {
    it("should use global ReturnValue if defined", () => {
        // We need to test with a fresh require where ReturnValue is defined
        const customReturnValue = function(v: any) { this.value = v; (this as any).custom = true; };
        (global as any).ReturnValue = customReturnValue;
        
        // Re-require the module
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
        
        let thrown: any;
        try {
            QFresh["return"](42);
        } catch(e) {
            thrown = e;
        }
        
        expect(thrown instanceof customReturnValue).toBe(true);
        
        delete (global as any).ReturnValue;
    });
});