import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should throw an error when the input array has more elements than its length', () => {
        const promiseArray = [Q.delay(10), Q.delay(5)];
        const longArray = new Array(promiseArray.length + 1);
        expect(() => {
            for (let i = 0; i <= promiseArray.length; i++) {
                Q.race(promiseArray);
            }
        }).toThrowError();
    });
});