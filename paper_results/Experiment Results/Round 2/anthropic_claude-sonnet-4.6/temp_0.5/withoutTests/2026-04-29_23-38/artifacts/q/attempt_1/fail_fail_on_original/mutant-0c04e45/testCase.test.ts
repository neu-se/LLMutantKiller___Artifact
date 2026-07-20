import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator path", () => {
    it("should execute generator[verb](arg) in the SpiderMonkey path", async () => {
        // Set StopIteration to trigger the SpiderMonkey path
        (global as any).StopIteration = {};
        
        try {
            let called = false;
            const gen = Q.async(function* () {
                called = true;
                return 42;
            });
            
            const result = await gen();
            expect(result).toBe(42);
        } finally {
            delete (global as any).StopIteration;
        }
    });
});