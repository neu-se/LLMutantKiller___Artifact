import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should throw an error when the input array is out of bounds', () => {
        const promiseArray = [Q.delay(10), Q.delay(5)];
        expect(() => {
            for (let i = 0; i <= promiseArray.length; i++) {
                Q.race([promiseArray[i]]);
            }
        }).toThrowError();
    });
});