export const createSnackbarHandler = (enqueueSnackbar) => {
    return (message, variant) => {
      enqueueSnackbar(message, { variant });
    };
};