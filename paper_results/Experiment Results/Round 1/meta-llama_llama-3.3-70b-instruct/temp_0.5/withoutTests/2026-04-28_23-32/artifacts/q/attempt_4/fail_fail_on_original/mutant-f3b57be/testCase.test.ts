import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly', async () => {
        const array = [1, 2, 3, 4, 5];
        const promises = array.map(Q);
        const result = await Q.all(promises);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should throw an error when reduce is called with no initial value on an empty array', async () => {
        const array = [];
        const promises = array.map(Q);
        const result = await Q.all(promises);
        expect(result).toEqual([]);
    });
});