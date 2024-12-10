import { toast } from 'react-toastify';
import { API_URL } from '@config/config';
import { handleErrors } from '@utils/fetcherErrorsHandler';

export default {
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
};
