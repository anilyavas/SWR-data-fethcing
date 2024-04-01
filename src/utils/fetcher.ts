import request from 'graphql-request';

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const gqlFetcher = (query) =>
  request({
    url: 'https://campigliamarittima.stepzen.net/api/lumpy-mongoose/__graphql',
    document: query,
    requestHeaders: {
      Authorization:
        'Apikey campigliamarittima::stepzen.net+1000::9ac8dfbed83d4c1604c884aacf678494247d1eb24dd19e014127ad37ed7b52d5',
    },
  });
