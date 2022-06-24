import Context from './context';

const MERCHANT_SDK = () => {
  const context = Context();
  const { bnplIntro, bnplBaseUrl, loggable } = context;

  if (loggable) {
    console.log('merchantSdk Context[' + bnplIntro + '|' + bnplBaseUrl + ']');
  }

  const open = (openParams) => {
    if (loggable) {
      console.log(JSON.stringify(openParams));
    }

    return new Promise((resolve, reject) => {
      //validation
      const fields = Object.keys(createInitMessage());
      for (let f of fields) {
        if (!openParams[f]) {
          const fail = createFailMessage('DATA_MISSING', 'required data is misssing');
          reject(fail);
          return;
        }
      }
      const targetUrl = bnplBaseUrl + bnplIntro;
      const bpForm = createForm(openParams.openType, targetUrl);
      const hiddenFields = createBnplHiddenField(openParams, fields);
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
    open: open,
  };

  return publicAPI;
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
  const id = 'bcbnpl_merchant_' + makeRandomNumber();
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

const createBnplHiddenField = (params, fieldArr) => {
  const fields = [];

  for (let f of fieldArr) {
    if (loggable) {
      console.log(f + '::' + params[f]);
    }
    fields.push(createInputHiddenType(f, params[f]));
  }
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
    bnplClientTxId: '',
    bnplClientConsumerId: '',
    bnplClientOrderNo: '',
    merchantName: '',
    productName: '',
    numberOfProduct: '',
    amount: '',
    returnUrl: '',
    ci: '',
    openType: '',
  };
};

const OPEN_TYPE = {
  PAGE: 'PAGE',
  WINDOW: 'WINDOW',
};

const createFailMessage = (code, desc) => {
  return {
    code: code,
    desc: desc,
  };
};

export default MERCHANT_SDK;
