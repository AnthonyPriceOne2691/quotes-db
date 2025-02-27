import { toast } from 'react-toastify';
import { API_URL } from '@config/config';
import { handleErrors } from '@utils/fetcherErrorsHandler';

export default {
  get: async (endpoint, queryParams = {}) => {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const url = queryString
        ? `${API_URL}/${endpoint}?${queryString}`
        : `${API_URL}/${endpoint}`;
      const response = await fetch(url);
      await handleErrors(response);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error during GET request:', error);
      toast.error(error.message);
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
      });
      await handleErrors(response);

      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error('Error during DELETE request:', error);
      toast.error(error.message);
    }
  },

  // post: async (endpoint, payload) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${endpoint}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     await handleErrors(response);
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error during POST request:', error);
  //     throw error;
  //   }
  // },

  // patch: async (endpoint, payload) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${endpoint}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     await handleErrors(response);
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error during PATCH request:', error);
  //     throw error;
  //   }
  // },
};
