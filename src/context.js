const Context = () => {
  const profile = `${PROFILE}`;
  const context = (p) => {
    switch (p) {
      case 'development':
        return {
          bnplIntro: '',
          srcbaseUrl: '',
          loggable: true,
        };
      case 'production':
        return {
          bnplIntro: '',
          srcbaseUrl: '',
          loggable: false,
        };
    }
  };
  return context(profile);
};

export default Context;
