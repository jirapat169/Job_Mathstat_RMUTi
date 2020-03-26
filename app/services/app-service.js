class AppService {
  constructor() {}

  localStorage() {
    const prefixKey = "mathstat_";
    const _localStorage = new window.SecureLS({
      encodingType: "des",
      isCompression: false,
      encryptionSecret: "mathstat_LocalStorage"
    });

    return {
      get: key => {
        if (window.localStorage.getItem(`${prefixKey}${key}`)) {
          return _localStorage.get(`${prefixKey}${key}`);
        } else {
          return null;
        }
      },
      set: (key, data) => {
        _localStorage.set(`${prefixKey}${key}`, data);
      },
      clear: () => {
        window.localStorage.clear();
      }
    };
  }
}

export default new AppService();
