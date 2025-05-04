import emailjs from 'emailjs-com';

export const sendEmail = async ({ name, email, message }) => {
  const templateParams = {
    name,
    email,
    message,
  };

  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    );
    return { success: true, result };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};
