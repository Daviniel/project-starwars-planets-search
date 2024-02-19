const FetchApi = async (url) => {
    try {
      const promise = await fetch(url);
      
      if (!promise.ok) {
        throw new Error(`Erro na requisição da API: ${promise.status} - ${promise.statusText}`);
      }
  
      const data = await promise.json();
      return data;
    } catch (error) {
      console.log('API REQUEST ERROR:', error);
      throw error; // Rejeita a Promise para que o erro seja propagado
    }
  };
  
  export default FetchApi;