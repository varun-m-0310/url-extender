import {
  PRODUCT_MAP,
  ENV_PREFIX_MAP,
  APPS,
  URLGenerator,
  SONAR_QUBE,
} from "./config.js";

const APP_KEY_LIST = Object.keys(APPS);
const ENV_KEY_LIST = Object.keys(ENV_PREFIX_MAP);
const PRODUCT_KEY_LIST = Object.keys(PRODUCT_MAP);
const SONAR_QUBE_LIST = Object.keys(SONAR_QUBE);

const getFilteredList = (list, key) =>
  list.filter((env) => env.toLowerCase().indexOf(key.toLowerCase()) !== -1);

const getSuggestionsAtom = (env, product = "", app = "") => {
  let URL = URLGenerator(env, product, app);
  return {
    content: `${URL}`,
    deletable: true,
    description: `${env}${product ? `-${product}` : ""}${app ? `-${app}` : ""} URL: <url>${URL}</url>`,
  };
};

const getSuggestions = (envText, productText, appText) => {
  const filteredProduct = getFilteredList(PRODUCT_KEY_LIST, productText);
  const filteredEnv = getFilteredList(ENV_KEY_LIST, envText);
  const filteredApp = getFilteredList(APP_KEY_LIST, appText);
  const isSonarQube = getFilteredList(SONAR_QUBE_LIST, envText);

  const isKeyPresent = {};
  const suggestion = [];

  if (isSonarQube.length) {
    suggestion.push({
      content: `${SONAR_QUBE.SONAR_QUBE}`,
      deletable: true,
      description: `SonarQube URL: <url>${SONAR_QUBE.SONAR_QUBE}</url>`,
    });
  }

  if (filteredEnv.length && filteredProduct.length) {
    filteredEnv.forEach((env) => {
      filteredProduct.forEach((product) => {
        if (isKeyPresent[`${env}-${product}`]) return;
        isKeyPresent[`${env}-${product}`] = true;
        suggestion.push(getSuggestionsAtom(env, product));
      });
    });
  }

  if (filteredEnv.length && filteredApp.length) {
    filteredEnv.forEach((env) => {
      filteredApp.forEach((app) => {
        if (isKeyPresent[`${env}-${app}`]) return;
        isKeyPresent[`${env}-${app}`] = true;
        suggestion.push(getSuggestionsAtom(env, "", app));
      });
    });
  }

  if (filteredEnv.length && !filteredProduct.length) {
    filteredEnv.forEach((env) => {
      suggestion.push(getSuggestionsAtom(env));
    });
  }

  if (filteredProduct.length) {
    filteredProduct.forEach((product) => {
      ENV_KEY_LIST.forEach((env) => {
        if (isKeyPresent[`${env}-${product}`]) return;
        isKeyPresent[`${env}-${product}`] = true;
        suggestion.push(getSuggestionsAtom(env, product));
      });
    });
  }

  if (filteredEnv.length) {
    filteredEnv.forEach((env) => {
      PRODUCT_KEY_LIST.forEach((product) => {
        if (isKeyPresent[`${env}-${product}`]) return;
        isKeyPresent[`${env}-${product}`] = true;
        suggestion.push(getSuggestionsAtom(env, product));
      });
    });
  }

  if (filteredApp.length) {
    filteredApp.forEach((app) => {
      ENV_KEY_LIST.forEach((env) => {
        if (isKeyPresent[`${env}-${app}`]) return;
        isKeyPresent[`${env}-${app}`] = true;
        suggestion.push(getSuggestionsAtom(env, "", app));
      });
    });
  }

  return suggestion;
};

chrome.omnibox.setDefaultSuggestion({
  description:
    "Enter {shortenURL} or {cluster}_{product_url} to open linked crm product",
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  let suggestion = [];
  const splitText = text.split("_");
  switch (splitText.length) {
    case 1: {
      suggestion = getSuggestions(text, text, text);
      break;
    }
    case 2: {
      const [envText, appOrProductText] = splitText;
      suggestion = getSuggestions(envText, appOrProductText, "");
      suggestion = getSuggestions(envText, "", appOrProductText);
      break;
    }
    case 3: {
      const [envText, productText, appText] = splitText;
      suggestion = getSuggestions(envText, productText, appText);
      break;
    }
  }
  suggest(suggestion);
});

chrome.omnibox.onInputEntered.addListener((text, OnInputEnteredDisposition) => {
  if (text) {
    console.log(text);
    chrome.tabs.update({ url: text });
  }
});

/** SW gets deactivated due to inactivity, Workaround for the issue */
chrome.alarms.create({ periodInMinutes: 4.9 });
chrome.alarms.onAlarm.addListener(() => {
  console.log("log for debug");
});
