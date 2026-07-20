import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle array reduce with sparse arrays", () => {
        const array = [1, , 3];
        const result = Q(array).then((arr) => arr.reduce((acc: any, current: any) => acc + current, 0));
        return result.then((sum: any) => expect(sum).toBe(4));
    });
});