const sessionService = {
  get: key => {
    return localStorage.getItem(key);
  },
  set: (key, val) => {
    localStorage.setItem(key, val);
  },
  del: key => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  }
};

export { sessionService };
