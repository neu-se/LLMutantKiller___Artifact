import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of array_reduce with the mutated code", () => {
        var array = [1, 2, 3];
        var result = Q.fcall(function() {
            var basis = 0;
            for (var i = 0; i < array.length; i++) {
                if (i in array) {
                    basis += array[i];
                }
            }
            return basis;
        });
        return result.then(function (sum) {
            expect(sum).toBe(6);
        });
    });
});