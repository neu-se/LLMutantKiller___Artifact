// src/utils/DefaultMap.ts

export class DefaultMap<K, V> extends Map<K, V> {
  constructor(private factory: () => V) {
    super();
  }

  override get(key: K): V {
    if (!super.has(key)) {
      super.set(key, this.factory());
    }
    return super.get(key)!;
  }

  /** Allow JSON.stringify to emit a plain object */
  toJSON() {
    return Object.fromEntries(this);
  }
}