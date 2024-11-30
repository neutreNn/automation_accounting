export const transformDataLineChart = (inventory) => {
    const yearsData = {};
  
    inventory.forEach(item => {
      const yearOfInput = item.year_of_input;
      const yearOfOutput = item.year_of_output;
  
      if (yearOfInput) {
        yearsData[yearOfInput] = yearsData[yearOfInput] || { name: yearOfInput, uv: 0, pv: 0 };
        yearsData[yearOfInput].uv += 1;
      }
  
      if (yearOfOutput) {
        yearsData[yearOfOutput] = yearsData[yearOfOutput] || { name: yearOfOutput, uv: 0, pv: 0 };
        yearsData[yearOfOutput].pv += 1;
      }
    });
  
    return Object.values(yearsData).sort((a, b) => a.name - b.name);
};