import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should return a promise for an array of states when all promises have settled", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        const result = await Q.allSettled(promises);
        expect(result.length).toBe(3);
        expect(result[0].state).toBe("fulfilled");
        expect(result[0].value).toBe(1);
        expect(result[1].state).toBe("fulfilled");
        expect(result[1].value).toBe(2);
        expect(result[2].state).toBe("rejected");
        expect(result[2].reason).toBe("error");
    });
});