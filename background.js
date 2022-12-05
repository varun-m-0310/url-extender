const ENV = {
  IN: "https://incrm.cc.capillarytech.com/",
  SG: "https://sgcrm.cc.capillarytech.com/",
  EU: "https://eucrm.cc.capillarytech.com/",
  TATA: "https://tatacrm.cc.capillarytech.com/",
  Nightly: "https://crm-nightly-new.cc.capillarytech.com/",
  Staging: "https://crm-staging-new.cc.capillarytech.com/",
};

const APPS = {
  "Loyalty-New": "loyalty/ui/",
  "Loyalty-Old": "loyaltyProgram/index",
  "Loyalty-Promotions": "loyalty/ui/promotions/list",
  "Loyalty-Bulk-Config": "loyalty/ui/bulk-configurations/list",
  Campaigns: "campaigns/ui/list",
  Coupons: "coupons/ui/",
  Journeys: "journey/ui/",
  "Audience-Manager": "audience-manager/list",
  Creatives: "creatives/ui/v2",
  "Insights+": "analytics/v2/",
  Workbench: "businessProcesses/index",
};

const APP_KEY_LIST = Object.keys(APPS);
const ENV_KEY_LIST = Object.keys(ENV);

const getFilteredList = (list, key) => list.filter(
  (env) => env.toLowerCase().indexOf(key.toLowerCase()) !== -1
);

const getSuggestionsAtom = (env, app) => {
  return {
    content: `${ENV[env]}${APPS[app]}`,
    deletable: true,
    description: `${env}-${app} URL: <url>${ENV[env]}${APPS[app]}</url>`,
  };
};

const getSuggestions = (envText, appText) => {
  const filteredEnv = getFilteredList(ENV_KEY_LIST, envText);
  const filteredApp = getFilteredList(APP_KEY_LIST, appText);
  const isKeyPresent = {};
  const suggestion = [];
  if (filteredEnv.length && filteredApp.length) {
    filteredEnv.forEach((env) => {
      filteredApp.forEach((app) => {
        if (isKeyPresent[`${env}-${app}`]) return;
        isKeyPresent[`${env}-${app}`] = true;
        suggestion.push(getSuggestionsAtom(env, app));
      });
    });
  }
  if (filteredEnv.length) {
    filteredEnv.forEach((env) => {
      APP_KEY_LIST.forEach((app) => {
        if (isKeyPresent[`${env}-${app}`]) return;
        isKeyPresent[`${env}-${app}`] = true;
        suggestion.push(getSuggestionsAtom(env, app));
      });
    });
  }
  if (filteredApp.length) {
    filteredApp.forEach((app) => {
      ENV_KEY_LIST.forEach((env) => {
        if (isKeyPresent[`${env}-${app}`]) return;
        isKeyPresent[`${env}-${app}`] = true;
        suggestion.push(getSuggestionsAtom(env, app));
      });
    });
  }
  return suggestion;
};

chrome.omnibox.setDefaultSuggestion({
  description: "Enter {shortenURL} or {cluster}_{product_url} to open linked crm product",
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  let suggestion = [];
  const splitText = text.split("_");
  switch (splitText.length) {
    case 1: {
      suggestion = getSuggestions(text, text);
      break;
    }
    case 2: {
      const [envText, appText] = splitText;
      suggestion = getSuggestions(envText, appText);
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
chrome.alarms.create({ periodInMinutes: 4.9 })
chrome.alarms.onAlarm.addListener(() => {
  console.log('log for debug')
});