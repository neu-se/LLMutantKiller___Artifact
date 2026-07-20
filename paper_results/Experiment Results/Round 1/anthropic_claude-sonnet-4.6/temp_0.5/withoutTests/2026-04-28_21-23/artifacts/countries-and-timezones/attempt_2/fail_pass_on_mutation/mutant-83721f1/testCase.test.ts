import proxyquire from "proxyquire";

describe("getAllTimezones memoization", () => {
  it("should skip re-memoization forEach when totalTimezones equals memoizedTimezones", () => {
    let ownKeysCallCount = 0;
    
    const tzData: Record<string, any> = {
      TZ_A: { countries: [] },
      TZ_B: { countries: [] },
      TZ_C: { countries: [] }
    };
    
    // Proxy to track Object.keys calls on data.timezones
    const proxiedTzData = new Proxy(tzData, {
      ownKeys(target) {
        ownKeysCallCount++;
        return Reflect.ownKeys(target);
      },
      getOwnPropertyDescriptor(target, key) {
        return Reflect.getOwnPropertyDescriptor(target, key);
      }
    });
    
    const mockData = { timezones: proxiedTzData, countries: {} };
    
    // Timezone object with exactly 3 keys = same as number of timezones
    const mockBuildTimezone = (_data: any, name: string) => ({
      name, utcOffset: 0, dstOffset: 0  // exactly 3 keys
    });
    
    const mod = proxyquire("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js", {
      "./data.json": { default: mockData, "@noCallThru": true },
      "./build-timezone": { default: mockBuildTimezone, "@noCallThru": true },
      "./build-country": { default: () => null, "@noCallThru": true }
    });
    
    // First call - memoizes all timezones
    mod.getAllTimezones();
    // After this: memoizedTimezones = Object.keys({name, utcOffset, dstOffset}).length = 3
    // totalTimezones = Object.keys(proxiedTzData).length = 3
    // So totalTimezones === memoizedTimezones
    
    ownKeysCallCount = 0; // Reset counter after first call
    
    // Second call
    mod.getAllTimezones();
    
    // Original: condition (3 !== 3) is false → skip forEach → Object.keys(data.timezones) NOT called → count = 0
    // Mutated: condition (true) → run forEach → Object.keys(data.timezones) called → count = 1
    
    // But wait - Object.keys is also called during module initialization for totalTimezones!
    // const totalTimezones = Object.keys(data.timezones).length;
    // That happens at module load time, before our reset
    
    expect(ownKeysCallCount).toBe(0); // Original passes, mutated fails
  });
});