import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator handling", () => {
    it("should correctly handle generator results in SpiderMonkey-style generators", () => {
        // This test targets the mutation in the async function where
        // the try-catch block was emptied, which would prevent proper
        // handling of generator results in SpiderMonkey-style generators
        return Q.async(function* () {
            const result = yield Q(42);
            return result + 1;
        })().then((value) => {
            expect(value).toBe(43);
        });
    });
});