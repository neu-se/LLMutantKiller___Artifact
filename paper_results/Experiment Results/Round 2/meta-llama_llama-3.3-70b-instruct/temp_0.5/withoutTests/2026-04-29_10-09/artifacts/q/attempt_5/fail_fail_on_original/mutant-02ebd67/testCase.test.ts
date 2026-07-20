import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should work correctly with a generator that yields a promise", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        return asyncFunction().then((result: any) => {
            expect(result).toBeUndefined();
        });
    });

    it("should throw an error when the verb is empty in the mutated code", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(generator);
        const originalContinuer = asyncFunction.continuer;
        asyncFunction.continuer = function(verb: string, arg: any) {
            if (verb === "") {
                throw new Error("verb cannot be empty");
            }
            return originalContinuer(verb, arg);
        };
        const mutatedGenerator = function* () {
            yield Q.resolve(1);
        };
        const mutatedAsyncFunction = Q.async(mutatedGenerator);
        mutatedAsyncFunction.continuer = function(verb: string, arg: any) {
            return originalContinuer("", arg);
        };
        expect(() => mutatedAsyncFunction()).toThrowError("verb cannot be empty");
    });
});