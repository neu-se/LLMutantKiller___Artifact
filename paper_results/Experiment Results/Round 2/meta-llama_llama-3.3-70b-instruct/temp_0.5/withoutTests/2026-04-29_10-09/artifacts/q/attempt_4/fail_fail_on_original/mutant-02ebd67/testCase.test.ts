import { Q } from "./q.js";

describe("Q.async function", () => {
    it("should throw an error when the verb is empty", () => {
        function* generator() {
            yield Q.resolve(1);
        }
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
        });
        const originalContinuer = asyncFunction.continuer;
        asyncFunction.continuer = function(verb, arg) {
            if (verb === "") {
                throw new Error("verb cannot be empty");
            }
            return originalContinuer(verb, arg);
        };
        const mutatedGenerator = function* () {
            yield Q.resolve(1);
        };
        const mutatedAsyncFunction = Q.async(mutatedGenerator);
        mutatedAsyncFunction.continuer = function(verb, arg) {
            return originalContinuer("", arg);
        };
        expect(() => mutatedAsyncFunction()).toThrowError("verb cannot be empty");
    });
});