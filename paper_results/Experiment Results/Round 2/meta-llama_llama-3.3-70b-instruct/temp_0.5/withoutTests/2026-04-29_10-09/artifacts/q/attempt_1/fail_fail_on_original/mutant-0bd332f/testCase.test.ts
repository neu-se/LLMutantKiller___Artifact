import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw TypeError when array is sparse', () => {
        const sparseArray = [1, , 3]; // Create a sparse array
        expect(() => Q.all(sparseArray)).toThrow(TypeError);
    });
});