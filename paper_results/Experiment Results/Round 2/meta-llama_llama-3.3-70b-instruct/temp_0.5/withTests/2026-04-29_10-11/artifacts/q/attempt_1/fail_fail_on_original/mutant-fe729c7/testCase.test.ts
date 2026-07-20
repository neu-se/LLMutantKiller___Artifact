import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle array reduce with sparse arrays", () => {
        const array = [1, , 3];
        const result = Q(array).then((arr) => arr.reduce((acc, current) => acc + current, 0));
        return result.then((sum) => expect(sum).toBe(4));
    });
});