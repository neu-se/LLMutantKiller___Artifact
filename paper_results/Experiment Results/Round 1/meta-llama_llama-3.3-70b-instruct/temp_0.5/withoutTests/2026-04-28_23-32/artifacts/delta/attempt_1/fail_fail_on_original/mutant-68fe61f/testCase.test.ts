import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should export correctly', () => {
    expect(typeof Delta).toBe('function');
    expect(Delta.prototype.insert).toBeInstanceOf(Function);
    expect(Delta.prototype.delete).toBeInstanceOf(Function);
    expect(Delta.prototype.retain).toBeInstanceOf(Function);
    expect(Delta.prototype.push).toBeInstanceOf(Function);
    expect(Delta.prototype.chop).toBeInstanceOf(Function);
    expect(Delta.prototype.filter).toBeInstanceOf(Function);
    expect(Delta.prototype.forEach).toBeInstanceOf(Function);
    expect(Delta.prototype.map).toBeInstanceOf(Function);
    expect(Delta.prototype.partition).toBeInstanceOf(Function);
    expect(Delta.prototype.reduce).toBeInstanceOf(Function);
    expect(Delta.prototype.changeLength).toBeInstanceOf(Function);
    expect(Delta.prototype.length).toBeInstanceOf(Function);
    expect(Delta.prototype.slice).toBeInstanceOf(Function);
    expect(Delta.prototype.compose).toBeInstanceOf(Function);
    expect(Delta.prototype.concat).toBeInstanceOf(Function);
    expect(Delta.prototype.diff).toBeInstanceOf(Function);
    expect(Delta.prototype.eachLine).toBeInstanceOf(Function);
    expect(Delta.prototype.invert).toBeInstanceOf(Function);
    expect(Delta.prototype.transform).toBeInstanceOf(Function);
    expect(Delta.prototype.transformPosition).toBeInstanceOf(Function);
  });
});