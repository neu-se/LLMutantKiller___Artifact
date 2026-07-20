import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.finally with invalid callback", () => {
    it("should throw synchronously and not return a promise when callback has no apply method", () => {
        let result: any;
        let threw = false;
        
        try {
            result = (Q as any)["finally"](Q(42), { notAFunction: true });
        } catch(e) {
            threw = true;
        }
        
        // On original: threw=true, result=undefined (exception thrown before tap)
        // On mutated: threw=false, result=promise (tap called despite invalid callback)
        expect(threw).toBe(true);
        expect(result).toBeUndefined();
    });
});