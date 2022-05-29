import Context from './context';

const MERCHANT_SDK = () => {
  const context = Context();
  const { bnplIntro, bnplBaseUrl, loggable } = context;

  const initMessage = createInitMessage();

  if (loggable) {
    console.log('merchantSdk Context[' + bnplIntro + '|' + bnplBaseUrl + ']');
  }

  const init = (initParams) => {
    if (loggable) {
      console.log(JSON.stringify(initParams));
    }
    return new Promise((resolve, reject) => {
      if (initParams && initParams.bnplClientId) {
        initMessage.bnplClientId = initParams.bnplClientId;
        console.log('Init!!');
      } else {
        const fail = createFailMessage('DATA_MISSING', 'bnplClientId is misssing');
        reject(fail);
      }
    });
  };

  const open = (openParams) => {
    if (loggable) {
      console.log(JSON.stringify(openParams));
    }

    return new Promise((resolve, reject) => {
      //   if (!openParams || !openParams.paymentProvider || !openParams.openOptions.openType || !openParams.dpaTransactionOptions) {
      //     reject(createFailMessage('DATA_MISSING', 'open function params are missing'));
      //   }

      const targetUrl = resolvePaymentProviderUrl(openParams.paymentProvider);
      console.log('targetUrl:' + targetUrl);
      const bpForm = createForm(openParams.openOptions.openType, targetUrl);
      const hiddenFields = createVeitnamInputHiddenField(initMessage, openParams);
      hiddenFields.map((f) => bpForm.appendChild(f));
      attachToDom(bpForm)
        .then(() => {
          console.log('Attached!');
          bpForm.submit();
        })
        .catch((msg) => {
          console.log('Fail to attach to Dom: ' + JSON.stringify(msg));
          reject(createFailMessage('DOM_IS_NOT_LOADING', 'document is not detecting'));
        });
    });
  };

  const publicAPI = {
    init: init,
    open: open,
  };

  return publicAPI;
};

const resolvePaymentProviderUrl = (provider) => {
  const context = Context();
  return context.bnplBaseUrl + context.bnplIntro;
};

const makeRandomNumber = () => {
  return Math.floor(Math.random() * 100000000);
};

const resolveTarget = (openType) => {
  if (OPEN_TYPE.PAGE === openType) {
    return '_self';
  } else if (OPEN_TYPE.WINDOW === openType) {
    return '_blank';
  } else {
    return '_self';
  }
};

const createForm = (openType, url) => {
  const id = 'bcsrc_merchant_' + makeRandomNumber();
  const target = resolveTarget(openType);

  const bpForm = window.document.createElement('form');
  bpForm.setAttribute('id', id);
  bpForm.setAttribute('accept-charset', 'UTF-8');
  bpForm.setAttribute('enctype', 'application/x-www-form-urlencoded');
  bpForm.setAttribute('action', url);
  bpForm.setAttribute('method', 'post');
  bpForm.setAttribute('target', target);
  return bpForm;
};

const createVeitnamInputHiddenField = (initParams, openParams) => {
  const fields = [];

  fields.push(createInputHiddenType('srcDpaId', initParams.srcDpaId));
  fields.push(createInputHiddenType('productName', openParams.dpaTransactionOptions.productName));
  fields.push(createInputHiddenType('paymentProvider', openParams.paymentProvider));
  fields.push(createInputHiddenType('transactionAmount', openParams.dpaTransactionOptions.transactionAmount));
  fields.push(createInputHiddenType('transactionCurrencyCode', openParams.dpaTransactionOptions.transactionCurrencyCode));
  fields.push(createInputHiddenType('merchantOrderId', openParams.dpaTransactionOptions.merchantOrderId));
  fields.push(createInputHiddenType('merchantName', openParams.dpaTransactionOptions.merchantName));
  fields.push(createInputHiddenType('openType', openParams.openOptions.openType));
  fields.push(createInputHiddenType('returnUrl', openParams.openOptions.returnUrl));
  return fields;
};

const createInputHiddenType = (name, value) => {
  const h = window.document.createElement('input');
  h.setAttribute('type', 'hidden');
  h.setAttribute('id', name);
  h.setAttribute('name', name);
  h.setAttribute('value', value);
  return h;
};

const attachToDom = (element, fn) => {
  return new Promise((resolve, reject) => {
    if (window && window.document && window.document.body) {
      window.document.body.appendChild(element);
      resolve(fn);
    } else {
      reject('DOM_IS_NOT_CONSTITUTED');
    }
  });
};

const createInitMessage = () => {
  return {
    bnplClientId: '',
  };
};

const OPEN_TYPE = {
  PAGE: 'PAGE',
  WINDOW: 'WINDOW',
};

const PAYMENT_PROVIDER = {
  VIETNAM: 'VIETNAM',
};

const createFailMessage = (code, desc) => {
  return {
    code: code,
    desc: desc,
  };
};

export default MERCHANT_SDK;
