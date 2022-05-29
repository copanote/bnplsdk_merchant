const Context = () => {
  const profile = `${PROFILE}`;
  const context = (p) => {
    switch (p) {
      case 'development':
        return {
          bnplIntro: '/bnplview.bp?exec=intro',
          bnplBaseUrl: 'https://isrnd.bccard.com:34443/app/paybooc',
          loggable: true,
        };
      case 'production':
        return {
          bnplIntro: '',
          bnplBaseUrl: '',
          loggable: false,
        };
    }
  };
  return context(profile);
};

export default Context;
