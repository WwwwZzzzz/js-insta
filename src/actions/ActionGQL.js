const getGQL =
  (url) =>
    async (query, variables = {}) =>
      await (
        await fetch(url, {
          method: "POST",
          // params.headers.Authorization = "Bearer " + localStorage.authToken
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(!localStorage.token ? {} : { Authorization: "Bearer " + localStorage.token })
          },
          body: JSON.stringify({ query, variables }),
        })
      )
        .json()
        .then((payload) => {
          // console.log(payload);
          if (payload.errors) {
            throw new Error(JSON.stringify(payload.errors, null, 4));
          }
          return payload.data[Object.keys(payload.data)[0]];
        });

export let gqlQuery = getGQL("/graphql");