const FetchApi = async (url) => {
    try {
      const promise = await fetch(url);
      const data = await promise.json();
      return data;
    } catch (error) {
      console.log('API REQUEST ERROR: ', error);
    }
  };
  
export default FetchApi;