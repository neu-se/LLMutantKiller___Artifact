import { Q } from '../../q';

describe("Q.allSettled", () => {
    it("should throw an error when the array_map callback does not return a promise", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        const originalAllSettled = Q.allSettled;
        Q.allSettled = function(promises) {
            return Q.all(promises.map(() => {}));
        };
        await expect(Q.allSettled(promises)).rejects.toThrow();
        Q.allSettled = originalAllSettled;
    });
});