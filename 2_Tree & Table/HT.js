class HashTable {
  constructor(size = 10) {
    this.dataMap = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i in key)
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    return hash;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.dataMap[index]) this.dataMap[index] = [];
    this.dataMap[index].push({ key: key, value: value });
    return this;
  }

  get(key) {
    const index = this._hash(key);
    if (this.dataMap[index])
      for (let item of this.dataMap[index])
        if (item.key === key) return item.value;
    return undefined;
  }

  keys() {
    let allKeys = [];
    for (let item of this.dataMap)
      if (item) for (let kv of item) allKeys.push(kv.key);
    return allKeys;
  }
}
