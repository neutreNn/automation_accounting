export const filterData = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (key === "price" && (value[0] === 0 && value[1] === 100000)) {
          return false;
        }
        if (key === "year_of_release" && value[0] === 1950 && value[1] === new Date().getFullYear()) {
          return false;
        }
        if (key === "year_of_input" && value[0] === 1950 && value[1] === new Date().getFullYear()) {
          return false;
        }
        if (key === "year_of_output" && value[0] === 1950 && value[1] === new Date().getFullYear() + 50) {
          return false;
        }
        return value !== "" && value !== undefined;
      })
    );
};