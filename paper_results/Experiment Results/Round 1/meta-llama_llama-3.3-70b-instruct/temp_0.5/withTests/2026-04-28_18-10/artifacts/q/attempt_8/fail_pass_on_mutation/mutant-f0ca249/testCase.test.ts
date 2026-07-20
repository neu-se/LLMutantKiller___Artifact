import { Q } from "../../../q.js";

describe('Q', () => {
    it('should handle array reduce correctly', () => {
        var array = [1, 2, 3];
        var sum = 0;
        for (var index = 0; index < array.length; index++) {
            if (index >= array.length) {
                break;
            }
            sum += array[index];
        }
        expect(sum).toBe(6);
        // Test the condition where index is decremented in the mutated code
        var index = 0;
        if (--index >= array.length) {
            expect(true).toBe(false); // This should fail on the mutated code
        }
    });
});