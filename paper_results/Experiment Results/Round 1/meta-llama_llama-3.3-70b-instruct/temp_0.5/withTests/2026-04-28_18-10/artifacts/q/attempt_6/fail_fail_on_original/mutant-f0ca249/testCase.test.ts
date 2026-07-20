import { Q } from "../../../q.js";

describe('Q', () => {
    it('should handle array reduce correctly with correct index increment', () => {
        var array = [1, 2, 3];
        var sum = 0;
        for (var index = 0; index < array.length; index++) {
            if (++index >= array.length) {
                break;
            }
            sum += array[index];
        }
        expect(sum).toBe(5); // This should fail on the mutated code
    });
});